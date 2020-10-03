
import { sendJSON, saveToken, validateInputControl } from './util.js';
//grab data from query params

let ok = new URLSearchParams(document.location.search.substring(1))
let name = ok.get('auction').split("-").join(" ");


sendJSON({ method: 'get', url: '/auction/' + name }, (err, resp) => {
    // if err is undefined, the send operation was a success
    if (!err) {
        injectItem(resp)


    } else {

        console.log(err);
    }
});


function injectItem(item) {
    console.log(item)
}