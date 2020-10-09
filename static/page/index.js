// TODO: control index page
import {sendJSON} from './util.js';


let items;
const rowElement = document.getElementsByClassName('row')[0];
const mainElement = document.querySelector('main');
let paginaDiv = document.createElement('div');
paginaDiv.setAttribute("class", "page_numbers");
paginaDiv.style.textAlign="center";
paginaDiv.style.padding = "30px"
mainElement.appendChild(paginaDiv);
const pageElement = document.getElementsByClassName('page_numbers')[0];
const inputSubmit = document.getElementsByClassName("search-container")[0].querySelector("form");

let current_page =1;
let rows = 5;

sendJSON({ method: 'get', url: '/auction' }, (err, resp) => {
	// if err is undefined, the send operation was a success
	if (!err) {
		items = resp.auctionItems.filter((item) => {
			return (parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, '')) < parseInt(item.auction_end.split('-').join('')))
		});

		displayList(items, rowElement, rows, current_page);
		setupPagination(items, pageElement, rows)
	} else {
		window.location.href = 'index.html';
		let tag = document.createElement('div');
		tag.innerHTML = '<p>register succesfull<p>';
		tag.setAttribute('class', 'registerSucces');
		tag.style.background = 'green';
		tag.style.display = 'relative';
		tag.style.width = '100px';
		tag.style.height = '100px';
		let element = document.getElementsByClassName('row')[0];
		element.append(tag);
		console.log(err);
	}
});

function createSection({ title, auction_end, bids, description}) {

		let section = document.createElement('section');
		section.setAttribute('class', 'auction_box');
		//href to auction?title&rest info
		let a = document.createElement('a');
		a.setAttribute('href', 'auction.html?auction=' + title.split(" ").join("-"));

		let link = document.createTextNode(title);
		a.setAttribute('class', 'auction_title');
		a.append(link);
		section.append(a);

		//description element
		let descriptionElement = document.createElement('p');
		descriptionElement.setAttribute('class', 'auction_description');
		descriptionElement.innerHTML = description;
		section.append(descriptionElement);

		// auction bid div and span
		let auctionDiv = document.createElement('div');
		auctionDiv.setAttribute('class', 'auction_bid');

		let span1 = document.createElement('span');
		span1.setAttribute('class', 'auction_bid_price');
		span1.innerHTML = bids.slice(-1)[0].amount;
		auctionDiv.append(span1);

		let span2 = document.createElement('span');
		span2.setAttribute('class', 'auction_bid_time');
		span2.innerHTML = auction_end;
		auctionDiv.append(span2);

		section.append(auctionDiv);
		//add the section
		let element = document.getElementsByClassName('row')[0];
		element.append(section);

}



function displayList(items,wrapper,rows_per_page, page ){
	wrapper.innerHTML = "";
	page--;

	let loopStart = rows_per_page*page;
	let paginatedItems = items.slice(loopStart, loopStart+rows_per_page);
	for (let i =0; i<paginatedItems.length; i++){
		createSection(paginatedItems[i])

	}
}

 function setupPagination(items, wrapper,rows_per_page){
	wrapper.innerHTML="";
	let page_count = Math.ceil(items.length/ rows_per_page)
	for (let i = 1; i < page_count+1; i++) {
		let btn = paginationButton(i);
		wrapper.appendChild(btn);
	}
}

function paginationButton(page){
	let button = document.createElement("button");
	button.innerText = page;
	button.setAttribute("class", "button_navigation")
	button.style.padding ="10px";
	button.style.marginRight = "25px";
	button.addEventListener('click', () =>{
		current_page = page;
		displayList(items, rowElement, rows, current_page);
	})

	return button
}

inputSubmit.addEventListener("submit", event=>{
	event.preventDefault();
	const rowElement = document.getElementsByClassName('row')[0];
	rowElement.innerHTML="";
	let inputSearchValue = inputSubmit.querySelector("input").value;
	let priceInput = document.querySelector("#range_price").querySelector("input").value;
	let locationInput = document.querySelector("body >" +
												   " nav > div > label:nth-child(6) > select").value;
	let techniqueInput = document.querySelector("body >" +
													" nav" +
													" >" +
													" div > label:nth-child(4) > select").value;
	const parms = new URLSearchParams({
										  search:inputSearchValue,
										  price:priceInput,
										  location:locationInput,
										  technique:techniqueInput
									  });



	sendJSON({method:'GET',
				 url:'/auction?'+parms}, (err,resp) =>{

		if (!err){
			console.log(resp)
			items = resp.auctionItems;
			displayList(items, rowElement, rows,current_page)
			setupPagination(items, pageElement, rows)
		}else{
			let tag = document.createElement('div');
			tag.innerHTML = '<h1>No items</h1>';
			rowElement.append(tag);
			console.log(err)
		}
	})
});