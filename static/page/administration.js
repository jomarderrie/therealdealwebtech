import {sendJSON} from "./util.js";

let items;
const table = document.querySelector("body > main >" +
                                         " div:nth-child(2) > table")
sendJSON({method: "get", url: '/auction'}, (err, resp) => {
    if (!err) {
        document.querySelector("body > main >" +
                                   " div:nth-child(2) >" +
                                   " table > tbody >" +
                                   " tr:nth-child(2)").outerHTML = "";
        document.querySelector("body > main >" +
                                   " div:nth-child(2) >" +
                                   " table > tbody >" +
                                   " tr:nth-child(2)").outerHTML = "";
        document.querySelector("body > main >" +
                                   " div:nth-child(2) >" +
                                   " table > tbody >" +
                                   " tr:nth-child(2)").outerHTML = "";

        for (const auction of resp.auctionItems) {
            const row = document.createElement("tr");
            const nameCell = document.createElement("td")
            nameCell.innerText = auction.title;
            row.appendChild(nameCell);

            const endCell = document.createElement("td")
            endCell.innerText = auction.auction_end;
            row.appendChild(endCell);


            const removeCell = document.createElement("td");
            const iconCell = document.createElement("button");
            const modifyCell = document.createElement("button");
            modifyCell.setAttribute("class", "fa" +
                " fa-pencil");


            iconCell.setAttribute("class", "fa" +
                " fa-trash")
            modifyCell.value = auction.id;
            modifyCell.id = auction.id;
            iconCell.value = auction.id;
            removeCell.append(modifyCell)
            removeCell.append(iconCell);


            iconCell.addEventListener("click", (event) => {
                let body = {
                    id: event.target.value
                }
                sendJSON({
                             method: "DELETE",
                             url: "/auction",
                             body
                         }, (err, resp) => {
                    if (!err) {
                        console.log(resp)
                    } else {
                        console.log(err)
                    }
                })
            })
            modifyCell.addEventListener("click", (event) => {
                let idItem = event.target.value;
                let body = {
                    id: idItem
                }
                console.log(idItem)
                let selectItem =   document.getElementById(   idItem);
                console.log(selectItem.outerHTML)
                document.querySelector("body > main > div:nth-child(2) > table > tr:nth-child(7)")

                sendJSON({
                             method: "PUT",
                             url: "/auction",
                             body
                         }, (err, resp) => {
                    if (!err) {
                        console.log(resp)
                    } else {
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


document.querySelector("body > main > div:nth-child(3) >" +
                           " form >" +
                           " input[type=submit]:nth-child(5)").addEventListener("click" , (event) => {
    event.preventDefault()
    let nameValue = document.querySelector("body" +
                                               " > main > div:nth-child(3) > form > input[type=text]:nth-child(2)").value;
    let descriptionValue = document.querySelector("body > main > div:nth-child(3) > form > input[type=text]:nth-child(3)").value;

    let endDate = document.querySelector("body > main >" +
                                             " div:nth-child(3) > form" +
                                             " >" +
                                             " input[type=text]:nth-child(4)").value;

    let body = {
        title: nameValue,
        description:descriptionValue,
        auction_end: endDate
    }

    sendJSON({
                 method: "POST",
                 url: "/auction",
                 body
             }, (err, resp) => {
        if (!err) {
            console.log(resp)
        } else {
            console.log(err)
        }
    })

})


