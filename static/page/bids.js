
import { sendJSON, saveToken, validateInputControl } from './util.js';
const table = document.querySelector("body > main >" +
                                         " div:nth-child(2) > table")
sendJSON({method:"GET", url: "/auction/won"} , (err,resp) =>{
    if (!err){
        console.log(resp)
        document.querySelector("body > main >" +
                                   " div:nth-child(2) >" +
                                   " table > tbody >" +
                                   " tr:nth-child(2)").outerHTML="";
        document.querySelector("body > main >" +
                                   " div:nth-child(2) >" +
                                   " table > tbody >" +
                                   " tr:nth-child(3)").outerHTML="";
        document.querySelector("body > main >" +
                                   " div:nth-child(2) >" +
                                   " table > tbody >" +
                                   " tr:nth-child(2)").outerHTML="";

        for(const auction of resp.wonAuctionItems){

            const row = document.createElement("tr");
            const nameCell = document.createElement("td")
            nameCell.innerText = auction.title;
            row.appendChild(nameCell);

            const priceCell = document.createElement("td")
            priceCell.innerText = auction.bids[auction.bids.length-1].amount;
            row.appendChild(priceCell);

            const timeCell = document.createElement("td");
            timeCell.innerText = auction.auction_end;
            row.appendChild(timeCell);

            const bidCell = document.createElement("td");
            bidCell.innerText = auction.won;
            row.appendChild(bidCell);

            const removeCell = document.createElement("td");
            const iconCell =  document.createElement("button");
            iconCell.setAttribute("class", "fa" +
                " fa-trash")
            iconCell.value = auction.id;
            iconCell.addEventListener("click", (event) =>{
                console.log("hey")
                let body ={
                    id:event.target.value
                }
                sendJSON({method:"DELETE", url:"/bid", body}, (err,resp) =>{
                    if(!err){
                        console.log(resp)
                    }else{
                        console.log(err)
                    }
                })
            })
            removeCell.append(iconCell);
            row.appendChild(removeCell)
            table.appendChild(row)
        }
    }else{
        table.innerHTML ="<h2>Failed to load data</h2>"
        console.log(err)
    }
})






