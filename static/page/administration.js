
import {sendJSON} from "./util.js";

console.log("hey")
let items;
const table = document.querySelector("body > main >" +
                                         " div:nth-child(2) > table")
sendJSON({method:"get", url:'/auction'}, (err,resp) =>{
    if (!err) {
        document.querySelector("body > main >" +
                                   " div:nth-child(2) >" +
                                   " table > tbody >" +
                                   " tr:nth-child(2)").outerHTML="";
        document.querySelector("body > main >" +
                                   " div:nth-child(2) >" +
                                   " table > tbody >" +
                                   " tr:nth-child(2)").outerHTML="";
        document.querySelector("body > main >" +
                                   " div:nth-child(2) >" +
                                   " table > tbody >" +
                                   " tr:nth-child(2)").outerHTML="";

        for(const auction of resp.auctionItems){
            const row = document.createElement("tr");
            const nameCell = document.createElement("td")
            nameCell.innerText = auction.title;
            row.appendChild(nameCell);

            const endCell = document.createElement("td")
            endCell.innerText = auction.auction_end;
            row.appendChild(endCell);



            const removeCell = document.createElement("td");
            const iconCell =  document.createElement("button");
            const modifyCell =  document.createElement("button");
            modifyCell.setAttribute("class", "fa" +
                " fa-pencil");


            iconCell.setAttribute("class", "fa" +
                " fa-trash")
            modifyCell.value = auction.id;

            iconCell.value = auction.id;
            removeCell.append(modifyCell)
            removeCell.append(iconCell);



            iconCell.addEventListener("click", (event) =>{
                console.log(event.target);

                let body ={
                    id:event.target.value
                }
                sendJSON({method:"DELETE", url:"/auction", body}, (err,resp) =>{
                    if(!err){
                        console.log(resp)
                    }else{
                        console.log(err)
                    }
                })
            })
            row.appendChild(removeCell)
            table.appendChild(row)


        }

    } else {

        console.log(err);
    }
})



