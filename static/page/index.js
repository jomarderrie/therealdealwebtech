// TODO: control index page
import { sendJSON, saveToken, validateInputControl, redirect } from './util.js';

const mainRow = document.querySelector('main row');

sendJSON({ method: 'get', url: '/auction' }, (err, resp) => {
	// if err is undefined, the send operation was a success
	if (!err) {
		resp.auctionItems.map((item) => {
			createSection(item);
			// localStorage.setItem(item.title, item);
		});


	} else {
		window.location.href = 'index.html';
		var tag = document.createElement('div');
		tag.innerHTML = '<p>register succesfull<p>';
		tag.setAttribute('class', 'registerSucces');
		tag.style.background = 'green';
		tag.style.display = 'relative';
		tag.style.width = '100px';
		tag.style.height = '100px';
		var element = document.getElementsByClassName('row')[0];
		element.append(tag);
		console.log(err);
	}
});

function createSection({ title, date, price, description }) {
	console.log(title);
	//create section element
	let section = document.createElement('section');
	section.setAttribute('class', 'auction_box');
	//href to auction?title&rest info
	let a = document.createElement('a');
	a.setAttribute('href', 'auction.html?auction=' + title);

	let link = document.createTextNode(title);
	a.setAttribute('class', 'auction_title');
	a.append(link);
	// a.addEventListener("click", )
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
	span1.innerHTML = price;
	auctionDiv.append(span1);

	let span2 = document.createElement('span');
	span2.setAttribute('class', 'auction_bid_time');
	span2.innerHTML = date;
	auctionDiv.append(span2);

	section.append(auctionDiv);
	//add the section
	var element = document.getElementsByClassName('row')[0];
	element.append(section);
}
//section class = auction_box
//a tag auction_tittle
//p --> description
