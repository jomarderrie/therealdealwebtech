
import { sendJSON, saveToken, validateInputControl } from './util.js';
//grab data from query params

let ok = new URLSearchParams(document.location.search.substring(1))
let name = ok.get('auction');




