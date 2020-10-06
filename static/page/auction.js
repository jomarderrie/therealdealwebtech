import {
    sendJSON,
    saveToken,
    validateInputControl,
    getRequestText,
    getRequestStatus
} from './util.js';

//grab data from query params

const urlSearchParams = new URLSearchParams(document.location.search.substring(1))
const queryParam = urlSearchParams.get('auction').split("-").join(" ");
const amountInput = document.getElementsByClassName("auction_bid_button")[0];
const inputItem = document.getElementsByClassName("auction_bid_amount")[0];

let idAuction;
let titleAuction;
let notOkGate = false;
sendJSON({
             method: 'get',
             url: '/auction/' + queryParam
         }, (err, resp) => {
    // if err is undefined, the send operation was a success
    if (!err) {
        injectAuctionItem(resp.auctionItems[0]);
    } else {
        console.log(err);
    }
});


function injectAuctionItem({title, description, bids, img, id}) {
    idAuction = id;
    titleAuction = title;
    const titleElement = document.getElementsByClassName("auction_title")[0];
    titleElement.innerHTML = title;

    const descriptionElement = document.getElementsByClassName("auction_description")[0];
    descriptionElement.innerHTML = description;

    const imgElement = document.getElementsByClassName("auction_column")[0];
    imgElement.innerHTML = "<img src=" + img + ">"

    const auctionDetail = document.getElementsByClassName("auction_detail_bid_list")[0].querySelector("ul");
    auctionDetail.innerText = "";
    for (const bid of bids) {

        const liItem = document.createElement("li");
        liItem.setAttribute("class", 'auction_detail_bid')

        const priceElement = document.createElement("span");
        priceElement.setAttribute("class", "auction_detail_bid_price")
        priceElement.innerText = bid.amount;
        const bidElement = document.createElement("span");
        bidElement.setAttribute("class", "auction_detail_bid_user")
        bidElement.innerText = bid.bidder;
        const timeElement = document.createElement("span");
        timeElement.setAttribute("class", "auction_detail_bid_time")
        timeElement.innerHTML = bid.time;

        liItem.appendChild(priceElement);
        liItem.appendChild(bidElement);
        liItem.appendChild(timeElement);

        auctionDetail.appendChild(liItem);
    }
}

amountInput.addEventListener("click", (e) => {
    e.preventDefault();
    const body = {
        bid: parseInt(inputItem.value),
        id: idAuction
    };
    console.log(body)
    sendJSON({
                 method: 'POST',
                 url: '/bid',
                 body
             }, (err, response) => {
        if (!err) {
            window.location.href = 'auction.html?auction=' + titleAuction.split(" ").join("-");
            inputItem.classList.remove("bad");
            console.log(response)
        } else {
            inputItem.classList.add("bad");
            if (getRequestStatus() === 403) {
                if (!notOkGate) {
                    let tag = document.createElement('div');
                    let text = document.createTextNode("you" +
                                                           " need to be logged");
                    tag.setAttribute('class', 'error');
                    tag.style.color = 'red';
                    tag.append(text);
                    tag.style.paddingTop = '15px';

                    let formELement = document.querySelector("main form");
                    formELement.append(tag);
                    notOkGate = true;
                }
            }

        }
    })
})


