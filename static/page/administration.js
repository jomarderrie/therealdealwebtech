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
            row.id = auction.id;

            const nameCell = document.createElement("td")

            nameCell.innerText = auction.title;
            row.appendChild(nameCell);

            const endCell = document.createElement("td")
            endCell.innerText = auction.auction_end;
            row.appendChild(endCell);


            const removeCell = document.createElement("td");
            const iconCell = document.createElement("button");
            const modifyCell = document.createElement("button");
            const addCell = document.createElement("button");
            addCell.setAttribute("class", "fa fa-plus")
            modifyCell.setAttribute("class", "fa" +
                " fa-pencil");


            iconCell.setAttribute("class", "fa" +
                " fa-trash")
            modifyCell.value = auction.id;
            modifyCell.id = auction.id;
            addCell.value = auction.id;
            iconCell.value = auction.id;
            removeCell.append(modifyCell)
            removeCell.append(iconCell);
            removeCell.append(addCell)


            iconCell.addEventListener("click", (event) => {
                let idItem = event.target.value;
                let selectItem = document.getElementById(idItem);
                selectItem.outerHTML = "";

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

                let selectItem = document.getElementById(idItem);

                let td = selectItem.querySelectorAll("td");

                td[0].contentEditable="true";
                td[1].contentEditable="true";

            })

                addCell.addEventListener("click", (event) =>{
                    let idItem = event.target.value;
                    let selectItem = document.getElementById(idItem);
                    let td = selectItem.querySelectorAll("td");


                    let body = {
                        id:event.target.value,
                        title: td[0].innerText,
                        auction_end: td[1].innerText
                    }

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


