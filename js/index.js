



// Navigation functions
function NavCreate() {
    document.getElementById('navbar').style.visibility = 'visible';
}

function NavReturn() {
    document.getElementById('navbar').style.visibility = 'hidden';
}


// Cart icon click event
let cartIcons = document.getElementsByClassName('bi-cart3');
Array.from(cartIcons).forEach(i => {
    i.addEventListener('click', function () {
        window.location.href = '/pages/cart.html';
    });
});


function highlightCartItems() {
    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Loop through each product container on the page
    document.querySelectorAll('.product').forEach(productElement => {
        // Get the product id from the data-id attribute
        const productId = productElement.getAttribute('data-id');

        // Check if this product is in the cart
        const isProductInCart = cart.some(item => item.id === productId);

        // If the product is in the cart, change the image background color to red
        if (isProductInCart) {
            const imgElement = productElement.querySelector('img');
            if (imgElement) {
                imgElement.style.backgroundColor = 'red';
            }
           
        }
    });
}




document.addEventListener('DOMContentLoaded', function() {
    // Get all product elements
    const products = document.querySelectorAll('.product');
    
    // Loop through each product
    products.forEach(function(product) {
        // Get the data attributes
        // const productId = product.getAttribute('data-id');
        const productName = product.getAttribute('data-name');
        const productPrice = product.getAttribute('data-price');
        
        // Create a new div to hold the product information
        
        const imgInfoDiv = product.querySelector('.img_info')
        // Populate the productInfo div with data
        imgInfoDiv.innerHTML = `
          <div class="img_info1">
            <h3 style="font-size:26px; margin-left:0px; text-align:center;"> ${productName}</h3>
              <i onclick="productView(event)" class="bi bi-eye"></i>
              </div>
            <strong style="margin-top:-25px" >${productPrice}</strong> 
        `;
        

        
    });
});

document.querySelectorAll('.product img').forEach(img => {
    const product = img.parentElement;
    const productId = product.getAttribute('data-id');

    // Check if the product is already selected in local storage
    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || {};
    if (selectedProducts[productId]) {
        img.classList.add('selected');
        img.classList.remove('deselected');
    } else {
        img.classList.remove('selected');
        img.classList.add('deselected');
    }

    img.addEventListener('click', function() {
        const dataset = {
            id: productId,
            name: product.getAttribute('data-name'),
            price: product.getAttribute('data-price'),
            image: this.src
        };

        // Retrieve existing cart items from local storage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if item is already in the cart
        const existingIndex = cart.findIndex(item => item.id === dataset.id);

        if (existingIndex === -1) {
            // Add item if not in cart
            img.classList.add('selected');
            img.classList.remove('deselected');
            document.getElementById('shopI').style.display = 'none';
            document.getElementById('shopX').style.display = 'none';
            document.getElementById('Cart-itemsNum').style.color = 'green';
            document.getElementById('messageId').style.backgroundColor = 'green';
            document.getElementById('messageId').style.display = 'block';
            document.getElementById('message').textContent = '    Product Added To Cart';

            setTimeout(() => {
                document.getElementById('shopI').style.display = 'block';
                document.getElementById('shopX').style.display = 'block';
                document.getElementById('Cart-itemsNum').style.color = 'black';
                document.getElementById('messageId').style.display = 'none';
                document.getElementById('message').textContent = '';
                updateCartBadge();
                
            }, 4000);

            cart.push(dataset); // Add item to cart
            selectedProducts[dataset.id] = true; // Mark as selected
        } else {
            // Remove item if already in cart
            img.classList.remove('selected');
            img.classList.add('deselected');
            document.getElementById('shopI').style.display = 'none';
            document.getElementById('shopX').style.display = 'none';
            document.getElementById('Cart-itemsNum').style.color = 'rgb(185, 47, 47)';
            document.getElementById('messageId').style.backgroundColor = 'rgb(185, 47, 47)';
            document.getElementById('messageId').style.display = 'block';
            document.getElementById('message').textContent = '    Product Removed From Cart';

            setTimeout(() => {
                document.getElementById('shopI').style.display = 'block';
                document.getElementById('shopX').style.display = 'block';
                document.getElementById('Cart-itemsNum').style.color = 'black';
                document.getElementById('messageId').style.display = 'none';
                document.getElementById('message').textContent = '';
                updateCartBadge();
            }, 4000);

            cart.splice(existingIndex, 1); // Remove item from cart
            delete selectedProducts[dataset.id]; // Mark as deselected
        }

        // Save updated cart and selection state back to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));

        displayCart();
        updateCartBadge(); // Update the cart badge when the cart changes
        highlightCartItems()
    });
});

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBadge = document.getElementById('Cart-itemsNum');
    cartBadge.textContent = cart.length; // Set the cart badge to the number of items in the cart
    if (cart.length == 0) {
        cartBadge.textContent=''
    }
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cartSection');
    cartItemsContainer.innerHTML = ''; // Clear existing items

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-image">
            <p id="item-info">${item.name} - ${item.price}   <i onclick="removeFromCart('${item.id}')" class="bi bi-trash"></i></p>
        `;
        itemDiv.querySelector('.cart-image').addEventListener('click', function() {
            removeFromCart(item.id);
        });
        cartItemsContainer.appendChild(itemDiv);
    });
}

function removeFromCart(id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Update selectedProducts to reflect that the item is no longer in the cart
    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || {};
    delete selectedProducts[id]; // Remove the item from selectedProducts
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));

    // Update the UI
    displayCart();
    updateCartBadge(); // Update the cart badge when item is removed
    updateProductImageStates(); // Call to update the product image states
}

function updateProductImageStates() {
    document.querySelectorAll('.product img').forEach(img => {
        const product = img.parentElement;
        const productId = product.getAttribute('data-id');
        const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || {};

        if (selectedProducts[productId]) {
            img.classList.add('selected');
            img.classList.remove('deselected');
        } else {
            img.classList.remove('selected');
            img.classList.add('deselected');
        }
    });
}

// On page load, update the cart badge to reflect the number of items in the cart
document.addEventListener('DOMContentLoaded', function() {
    
    updateCartBadge(); // Make sure the badge shows the correct number of items after refresh
    
});

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
    // Retrieve the product data from localStorage
    const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];

    // Find the product based on the clicked product ID
    const selectedProduct = allProducts.find(product => product.id === productId);

    if (selectedProduct) {
        // Store related products in localStorage based on the selected product name
        const relatedProducts = getRelatedProducts(selectedProduct.name);

        // Save the related products to localStorage
        localStorage.setItem('relatedProducts', JSON.stringify(relatedProducts));

        // Construct the URL with query parameters and redirect to the product detail page
        const url = `/pages/singleProduct.html?productId=${selectedProduct.id}&productName=${encodeURIComponent(selectedProduct.name)}&productPrice=${encodeURIComponent(selectedProduct.price)}&productImage=${encodeURIComponent(selectedProduct.image)}&productDesc=${encodeURIComponent(selectedProduct.description)}`;
        window.location.href = url; // Redirect to the product detail page
    } else {
        console.error("Product not found in localStorage.");
    }
}

function toCart() {
    // Get parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Retrieve product details from the URL
    const productId = urlParams.get('productId');
    const productName = urlParams.get('productName');
    const productPrice = urlParams.get('productPrice');
    const productImage = urlParams.get('productImage');
    
    // Create a dataset object with the product details
    const dataset = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
    };
    console.log(dataset);

    // Retrieve cart from localStorage or initialize as an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item is already in the cart
    const existingIndex = cart.findIndex(item => item.id === productId);

    // If the item is not already in the cart, push it
    if (existingIndex === -1) {
    
        cart.push(dataset);
        
        document.getElementById('cartBtn').textContent='Item Added to Cart'
        document.getElementById('cartBtn').style.backgroundColor='Green'
        document.getElementById('cartBtn').style.color='white'
        const cartBadge = document.getElementById('Cart-itemsNum');
        cartBadge.textContent = cart.length; // Set the cart badge to the number of items in the cart
       

        if (cart.length == 0) {
            cartBadge.textContent=''
        }

    }
    else{
        
        document.getElementById('cartBtn').textContent='Item Already in Cart'
        document.getElementById('cartBtn').style.color='white'
        document.getElementById('cartBtn').style.backgroundColor='red'
        // updateCartBadge();

    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

highlightCartItems()


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








let cartbg = document.getElementsByClassName('bi-moon');
let isDarkMode = localStorage.getItem('darkMode') === 'true'; // Check saved preference

// Apply saved theme on load
document.getElementById('cart-body').classList.toggle('darkmode', isDarkMode);
document.getElementById('navbar').classList.toggle('change', isDarkMode);
document.getElementById('cartspan').classList.toggle('colorchange', isDarkMode);
document.getElementById('hamburgEdit').classList.toggle('change', isDarkMode);

// Apply dark mode styles to navbar links
Array.from(document.querySelectorAll('nav a')).forEach(link => {
    link.style.color = isDarkMode ? 'red' : 'white'; // Set link color
});

Array.from(cartbg).forEach(icon => {
    icon.className = isDarkMode ? 'bi bi-sun' : 'bi bi-moon'; // Set initial icon

    icon.addEventListener('click', function () {
        // Toggle dark mode class
        isDarkMode = !isDarkMode;
        document.getElementById('cart-body').classList.toggle('darkmode', isDarkMode);
        document.getElementById('navbar').classList.toggle('change', isDarkMode);
        document.getElementById('cartspan').style.color = isDarkMode ? 'white' : 'black';
        document.getElementById('hamburgEdit').classList.toggle('change', isDarkMode);

        // Apply dark mode styles to navbar links
        Array.from(document.querySelectorAll('nav a')).forEach(link => {
            link.style.color = isDarkMode ? 'red' : 'white'; // Set link color
        });

        // Update icon
        icon.className = isDarkMode ? 'bi bi-sun' : 'bi bi-moon'; // Toggle icon class
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDarkMode);
    });
});
// Call displayCart on page load to show existing cart items
displayCart();
updateProductImageStates(); // Ensure product images are updated on load

function ToShop() {
    (window.location.href='/pages/shop.html')
}
function LogoutBtn(){
    document.getElementById('logout-btn').style.visibility='visible';
   call

}

function Reveal() {
    var shippingInfo = document.getElementById("shippingInfo");
    var plus = document.getElementById("plus");
    
    // Toggle the visibility of the shipping info
    if (shippingInfo.style.display === "none") {
        shippingInfo.style.display = "block"; // Show the info
        plus.textContent = "-"; // Change the text to "-" when info is revealed
    } else {
        shippingInfo.style.display = "none"; // Hide the info
        plus.textContent = "+"; // Change the text back to "+" when info is hidden
    }
}
function Reveal2() {
    var promoInfo = document.getElementById("promoInfo");
    var plus2 = document.getElementById("plus2");

    if(promoInfo.style.display === "none"){
        promoInfo.style.display= "block"
        plus2.textContent="-"

    }
    else {
        promoInfo.style.display = "none"; // Hide the info
        plus2.textContent = "+"; // Change the text back to "+" when info is hidden
    }
    

}
// function Search() {    
// const products = document.querySelectorAll('.product');
// products.forEach(product => {
//     productName = product.getAttribute('data-name')
//     console.log(productName);
    
    
// });
// const searchBar = (document.getElementById('searchbar').innerHTML);
// console.log(searchBar);

// if (searchBar.includes (productName)) {
// const superstar = document.querySelector('#shop');

// console.log(products);
// superstar.innerHTML=`hi nwike`

// }

// }

  // Function to handle the search functionality
  function Search() {
    // Get the search query from the search input
    const searchQuery = document.getElementById('searchbar').value.toLowerCase();

    // Get all product elements
    const products = document.querySelectorAll('.product');
 const Nan = document.getElementById('shop')
    // Loop through each product and hide/show based on search query
    products.forEach(product => {
      // Get the product name
      const productName = product.getAttribute('data-name').toLowerCase();
      
      // Check if the product name matches the search query
      if (productName.includes(searchQuery)) {
        product.style.display = 'block'; // Show product
      } else {
        // Nan.innerHTML=`<div class='nan'>Product Not Found✖️</div>`; 
        // // Hide product
        product.style.display = 'none';
      }
    });
  }

  // Optional: Add an event listener to trigger search when user presses Enter key
  document.getElementById('searchbar').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
    //   Search();  // Call the Search function when Enter is pressed
    }
  });



  window.onload = function() {
    highlightCartItems();  // Call function when the page loads
};




