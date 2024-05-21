document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const productName = button.previousElementSibling.textContent;
            const productImage = button.previousElementSibling.previousElementSibling.getAttribute('src');
            addToCart(productId, productName, productImage);
        });
    });

    function addToCart(productId, productName, productImage) {
        const cartItemRow = document.createElement('tr');
        cartItemRow.innerHTML = `
            <td><img src="${productImage}" alt="${productName}" width="50"></td>
            <td>${productName}</td>
        `;
        cartItemsContainer.appendChild(cartItemRow);
        saveToDatabase(productId, productName, productImage);
    }

    function saveToDatabase(productId, productName, productImage) {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            // Send request to server to save data in MongoDB
            fetch('/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId, productName, productImage, userEmail })
            })
            .then(response => {
                if (response.ok) {
                    console.log('Product added to cart successfully');
                } else {
                    console.error('Failed to add product to cart');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            console.error('User email not found in localStorage');
        }
    }
});
