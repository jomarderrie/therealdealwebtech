
import {sendJSON} from "./util";

console.log("hey")
let items;
sendJSON({method:"get", url:'/auction'}, (err,resp) =>{
    if (!err) {
        items = resp.auctionItems.filter((item) => {
            return (parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, '')) < parseInt(item.auction_end.split('-').join('')))
        });
        console.log(items)
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
})