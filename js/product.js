import { retrieveFromStorage, saveToStorage } from "./utils/localStorage.js";
import { createList } from "./components/cart.js";

const vanilla = document.getElementById("vanilla");
const chocolate = document.getElementById("chocolate");
const addToCartButton = document.querySelector(".add-to-cart");
const additions = document.querySelectorAll(".addition");
const products = retrieveFromStorage("products");
const cart = document.querySelector(".cart");
const cartProducts = document.querySelector(".cart__products");
const subtotal = document.querySelector(".subtotal");
const checkout = document.querySelector(".checkout");
const sizeSelect = document.getElementById("size");

let totalSum = 0;

displayCart();

function displayCart() {
    if (products.length > 0) {
        cart.style.display = "block"

        products.forEach(price => {
            totalSum += price.productPrice;
        });

        subtotal.innerHTML = "$" + totalSum;
    }
}

createList(cartProducts);

addToCartButton.addEventListener("click", addToCart);

function addToCart() {
    if (vanilla.checked === false & chocolate.checked === false) {
        alert("Please choose an ice cream flavour");
    } else {
        const categoryIndex = sizeSelect.selectedIndex;
        const options = sizeSelect.options;
        const size = options[categoryIndex].value;

        totalSum = 0;
        let flavour = ""
        let sizePrice = 0;
        let selectedAdditions = [];
        let additionsPrice = 0;
        const id = Math.random();

        if (vanilla.checked) {
            flavour = vanilla.parentElement.querySelector(".form-check-label").innerHTML;
        } else {
            flavour = chocolate.parentElement.querySelector(".form-check-label").innerHTML;
        }

        switch (categoryIndex) {
            case 0:
                sizePrice = 10;
                break;

            case 1:
                sizePrice = 20;
                break;

            case 2:
                sizePrice = 35;
                break;
        }

        additions.forEach(addition => {
            if (addition.checked) {
                selectedAdditions.push(addition.parentElement.querySelector(".form-check-label").innerHTML);
                additionsPrice = 5 * selectedAdditions.length;
            }
        });

        const productPrice = sizePrice + additionsPrice;

        if (selectedAdditions.length === 0) {
            selectedAdditions.push("No additions");
        }

        const productDetails = {flavour: flavour, size: size, additions: selectedAdditions, productPrice: productPrice, id: id }

        products.push(productDetails);

        saveToStorage("products", products);

        createList(cartProducts);

        displayCart();

    }
}

checkout.addEventListener("click", doCheckout);

function doCheckout() {
    const currentSubtotal = subtotal.innerText.slice(1);
    saveToStorage("subtotal", currentSubtotal);
}