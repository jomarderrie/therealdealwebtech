
import { sendJSON, saveToken, validateInputControl } from './util.js';
//grab data from query params

const urlSearchParams = new URLSearchParams(document.location.search.substring(1))
const queryParam = urlSearchParams.get('auction').split("-").join(" ");
const amountInput = document.getElementsByClassName("auction_bid_button")[0];
const inputItem = document.getElementsByClassName("auction_bid_amount")[0];
let idAuction;
sendJSON({ method: 'get', url: '/auction/' + queryParam }, (err, resp) => {
    // if err is undefined, the send operation was a success
    if (!err) {
        injectAuctionItem(resp.auctionItems[0]);
    } else {

        console.log(err);
    }
});


function injectAuctionItem({title, description, bids,img, id}) {
    idAuction =  id;

    const titleElement = document.getElementsByClassName("auction_title")[0];
    titleElement.innerHTML =title;

    const descriptionElement = document.getElementsByClassName("auction_description")[0];
    descriptionElement.innerHTML = description;

    const imgElement = document.getElementsByClassName("auction_column")[0];
    imgElement.innerHTML = "<img src="+img+">"

    const auctionDetail = document.getElementsByClassName("auction_detail_bid_list")[0].querySelector("ul");
    auctionDetail.innerText = "";
    for(const bid of bids){

        const liItem = document.createElement("li");
        liItem.setAttribute("class", 'auction_detail_bid')

        const priceElement = document.createElement("span");
        priceElement.setAttribute("class", "auction_detail_bid_price")
        priceElement.innerText = bid.amount;
        const bidElement = document.createElement("span");
        bidElement.setAttribute("class","auction_detail_bid_user" )
        bidElement.innerText = bid.bidder;
        const timeElement = document.createElement("span");
        timeElement.setAttribute("class","auction_detail_bid_time" )
        timeElement.innerHTML = bid.time;

        liItem.appendChild(priceElement);
        liItem.appendChild(bidElement);
        liItem.appendChild(timeElement);

       auctionDetail.appendChild(liItem);
    }
}

amountInput.addEventListener("click", (e) =>{
    e.preventDefault();
    const body = {bid: 100, itemId: 3};
    console.log(body)
    sendJSON({method: 'POST', url:'/bid', body}, (err,response) =>{
        if (!err){
            console.log(response)
        }else{
            console.log(err)
        }
    })
})


