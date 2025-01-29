// Store products in localStorage when the product listing page loads
document.addEventListener('DOMContentLoaded', function () {
    const allProducts = document.querySelectorAll('.product'); // Assuming each product has a 'product' class
    const productNames = [];

    allProducts.forEach(product => {
        const productName = product.getAttribute('data-name');
        const productId = product.getAttribute('data-id');
        const productPrice = product.getAttribute('data-price');
        const productImage = product.querySelector('img').getAttribute('src');
        const productDescription = product.getAttribute('data-description');

        productNames.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            description: productDescription
        });
    });

    // Save the product data to localStorage if it's not already saved
    if (!localStorage.getItem('allProducts')) {
        localStorage.setItem('allProducts', JSON.stringify(productNames));
        console.log('Product data saved to localStorage:', productNames);
    } else {
        console.log('Data already exists in localStorage:', JSON.parse(localStorage.getItem('allProducts')));
    }
});

// Function to retrieve related products based on matching names
function getRelatedProducts(productName) {
    const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
    const productNameLower = productName.trim().toLowerCase(); // Normalize the product name

    // Log for debugging
    console.log("Searching for products with name:", productNameLower);

    // Filter products by name
    return allProducts.filter(product =>
        product.name.trim().toLowerCase() === productNameLower
    );
}


// Handling the product view on product detail page
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);

    const productId = urlParams.get('productId');
    const productName = urlParams.get('productName');
    const productPrice = urlParams.get('productPrice');
    const productImage = urlParams.get('productImage');
    const productDescription = urlParams.get('productDesc');

    // Display current product's details
    document.getElementById('productName').textContent = productName;
    document.getElementById('productPrice').textContent = productPrice;
    document.getElementById('productImage').setAttribute('src', productImage);
    document.getElementById('productDescription').textContent = productDescription;

    // Retrieve all products from localStorage
    const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
    console.log("All Products in localStorage:", allProducts); // Debugging: Check all products

    if (!allProducts || allProducts.length === 0) {
        console.error("No products found in localStorage.");
        return;
    }

    // Get related products based on matching names
    const relatedProducts = getRelatedProducts(productName).filter(product =>
        product.name.toLowerCase() !== productName.toLowerCase()
    );
    console.log("Filtered Related Products:", relatedProducts); // Debugging: Check the related products

    // Display related products
    const relatedProductsContainer = document.getElementById('Related-Products');
   const fuu =JSON.parse(localStorage.getItem('relatedProducts')) || []
    console.log(fuu);
    
    if (fuu.length > 0) {
        Array.from(fuu).forEach(item => {
            const productElement = document.createElement('div');
            productElement.classList.add('related-product');
            productElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" />
                <div  class="img_infoa">
                <div class="img_info1">
                    <h3 style="font-size:26px; margin-left:0px; " >${item.name}</h3>
                    <i onclick="viewProduct('${item.id}')" class="bi bi-eye"></i>
                      </div>
                    <strong style="font-size:17px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;" >${item.price}</strong>
                   
                </div>
            `;
             // <button onclick="viewProduct('${item.id}')">View Product</button>
            relatedProductsContainer.appendChild(productElement);
        });
    } else {
        relatedProductsContainer.innerHTML = "<p>No related products found.</p>";
    }
});


// Function to handle the 'View Product' button click (on related products)
function viewProduct(productId) {
    // Redirect to the product page with the selected productId
    window.location.href = `/pages/singleProduct.html?productId=${productId}`;
}

// Function to handle the main product view click
function productView(event) {
    const product = event.target.closest('.product');
    const productId = product.getAttribute('data-id');
    const productName = product.getAttribute('data-name');
    const productPrice = product.getAttribute('data-price');
    const productDesc = product.getAttribute('data-description');
    const productImage = product.querySelector('img').getAttribute('src');

    // Assume you have a function that fetches related products (optional)
    const relatedProducts = getRelatedProducts(productName); // Use matching product names
    
    // Store related products in localStorage for use on the detail page
    localStorage.setItem('relatedProducts', JSON.stringify(relatedProducts));

    // Construct the URL with query parameters and redirect to the product page
    const url = `/pages/singleProduct.html?productId=${productId}&productName=${encodeURIComponent(productName)}&productPrice=${encodeURIComponent(productPrice)}&productImage=${encodeURIComponent(productImage)}&productDesc=${encodeURIComponent(productDesc)}`;
    window.location.href = url;
}

