let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    const addToMacbookCartBtn = document.getElementById("add-to-macbook-cart");
    const addToAirpodsCartBtn = document.getElementById("add-to-airpods-cart");
    const cartList = document.getElementById("cart-list");
    const macbookColorSelector = document.getElementById("macbook-color");
    const airpodsColorSelector = document.getElementById("airpods-color");
    const macbookQuantityInput = document.getElementById("macbook-quantity");
    const airpodsQuantityInput = document.getElementById("airpods-quantity");
    const macbookProductImage = document.getElementById("macbook-image");
    const airpodsProductImage = document.getElementById("airpods-image");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const grandTotalElement = document.getElementById("grand-total");

    // Image URLs for different colors
    const macbookImages = {
        silver: "https://www.custommacbd.com/cdn/shop/files/mbp-14-silver-Custom-Mac-BD_300x300.png?v=1730616921",
        "space-gray": "https://www.did.ie/cdn/shop/files/3_daf1e3d6-d6b3-4566-9190-778f0ae1352b_1200x.png?v=1706258540",
        "space-black": "https://www.custommacbd.com/cdn/shop/files/mbp14-space-black-Custom-Mac-BD_540x.png?v=1730616922"
    };

    const airpodsImages = {
        white: "https://www.custommacbd.com/cdn/shop/products/Airpods-3rd-gen-Custom-Mac-BD_540x.jpg?v=1637838493"
    };

    // Function to update the product image dynamically
    function updateProductImage(card) {
        if (card === "macbook") {
            const selectedColor = macbookColorSelector.value;
            macbookProductImage.src = macbookImages[selectedColor];
        } else if (card === "airpods") {
            const selectedColor = airpodsColorSelector.value;
            airpodsProductImage.src = airpodsImages[selectedColor];
        }
    }

    // Event listeners to update product image when color is changed
    macbookColorSelector.addEventListener("change", () => updateProductImage("macbook"));
    airpodsColorSelector.addEventListener("change", () => updateProductImage("airpods"));

    // Function to extract price from the DOM
    function getProductPrice(product) {
        if (product === "macbook") {
            const priceText = document.getElementById("macbook-price").innerText.trim(); // Get price from MacBook
            return parseFloat(priceText.replace('$', ''));
        } else if (product === "airpods") {
            const priceText = document.getElementById("airpods-price").innerText.trim(); // Get price from AirPods
            return parseFloat(priceText.replace('$', ''));
        }
    }

    // Add MacBook to the cart
    addToMacbookCartBtn.addEventListener("click", () => {
        const selectedColor = macbookColorSelector.value;
        const quantity = parseInt(macbookQuantityInput.value);

        if (quantity > 0 && selectedColor) {
            const productPrice = getProductPrice("macbook");
            const item = {
                color: selectedColor,
                quantity: quantity,
                price: productPrice,
                image: macbookImages[selectedColor],
                product: "MacBook"
            };

            cart.push(item);
            updateCart();
        }
    });

    // Add AirPods to the cart
    addToAirpodsCartBtn.addEventListener("click", () => {
        const selectedColor = airpodsColorSelector.value;
        const quantity = parseInt(airpodsQuantityInput.value);

        if (quantity > 0 && selectedColor) {
            const productPrice = getProductPrice("airpods");
            const item = {
                color: selectedColor,
                quantity: quantity,
                price: productPrice,
                image: airpodsImages[selectedColor],
                product: "AirPods"
            };

            cart.push(item);
            updateCart();
        }
    });

    // Remove item from the cart by index
    window.removeItem = function(index) {
        cart.splice(index, 1); 
        updateCart();
    }

    // Update the cart contents and total price
    function updateCart() {
        cartList.innerHTML = '';
        let subtotal = 0;

        cart.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "d-flex", "align-items-center");
            listItem.innerHTML = `
                ${item.quantity} x ${item.product} (${item.color.charAt(0).toUpperCase() + item.color.slice(1)}) 
                <img src="${item.image}" width="50" class="ms-2">
                <button class="btn btn-danger btn-sm ms-auto" onclick="removeItem(${index})">Remove</button>
            `;
            cartList.appendChild(listItem);
            subtotal += item.quantity * item.price;
        });

        const tax = subtotal * 0.1; // Assuming 10% tax
        const grandTotal = subtotal + tax;

        subtotalElement.innerHTML = `$${subtotal.toFixed(2)}`;
        taxElement.innerHTML = `$${tax.toFixed(2)}`;
        grandTotalElement.innerHTML = `$${grandTotal.toFixed(2)}`;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const checkoutButton = document.getElementById("checkout-btn");

    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty! Please add some items to proceed.");
            return;
        }
    
        // Show Thank You Message
        alert("Thank you for your purchase!");
    
        // Clear Cart
        cart = [];
        updateCart();

    });
    
});

