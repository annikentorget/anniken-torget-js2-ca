import {┬áretrieveFromStorage } from "./utils/localStorage.js";

const total = document.querySelector(".total");
total.innerText = retrieveFromStorage("subtotal");