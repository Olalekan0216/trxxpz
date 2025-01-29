let count = 0;
       // Get all <img> elements
        images = document.getElementsByTagName('img')
        // let image = Array.from(images)
        
       // Add event listener to each image
       Array.from(images).forEach(img => {
           img.addEventListener('click', function() {

           
            
               // Toggle background color
               if (this.style.backgroundColor === 'red') {
                   this.style.backgroundColor = 'black';
                   count--;
                   document.getElementById('Cart-items').textContent = count
                   const imagesId = img.dataset.id;
                //    removeFromCart(imagesId)
                selectedShopiTems =  selectedShopiTems.array.forEach(element => {
                    
                });( imagesId != imagesId )
            console.log(selectedShopiTems);
            localStorage.setItem('cart', selectedShopiTems)
                


                   

               } else {
                   this.style.backgroundColor = 'red';
                   document.getElementById('searchbar').style.marginLeft = '30px'
                   const imagesId = img.dataset.id;
                //    console.log(imagesId);
                   addToCart(imagesId);
                //    pushes the images into the array  (selectedShopiTems)
            
                //    selectedShopiTems.push(imagesId)
                //    console.log(selectedShopiTems);
                //  localStorage.setItem('cartItems',  JSON.stringify(selectedShopiTems)) 


   
                   
               

                   count++;
                   document.getElementById('Cart-items').textContent = count
               }
            
               if (count < 10) {
                document.getElementById('Cart-items').style.marginLeft = '18px'

                
               }
               else{
                document.getElementById('Cart-items').style.marginLeft = '13px'
                
               }
               if (count === 0) {
                document.getElementById('Cart-items').style.visibility = 'hidden'

                
               }
               else{
                document.getElementById('Cart-items').style.visibility = 'visible'
                
               }
             
           });
       });

  







       const items = document.querySelectorAll('.item'); // Assuming items are elsewhere on the page
const cartDiv = document.getElementById('cartSection');

function loadCart() {
    let Cart = localStorage.getItem('Cart');

    try {
        Cart = Cart ? JSON.parse(Cart) : []; // Parse if exists, or initialize to empty array
    } catch (e) {
        console.error("Error parsing cart from local storage:", e);
        Cart = []; // Fallback to an empty array if parsing fails
    }

    // Mark items as selected
    Cart.forEach(selectedShopiTemsID => {
       
        const selectedShopiTem = document.querySelector(`.item[data-id="${selectedShopiTemsID}"]`);
      
        if (selectedShopiTem) {
            selectedShopiTem.classList.add('selected');   
        }
    });
    
    // Display cart items
    updateCartDisplay(Cart);
}

function updateCartDisplay(Cart) {
    // cartDiv = document.getElementById('cartSection');
     // Clear existing items

    //  Cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        Cart.forEach(selectedShopiTem => {         
      const cartItem = document.createElement('div');
      
                cartItem.classList.add('cart-item');
              cartDiv.innerHTML=`
                          <img class="item" data-id="1"  src="/images/Screenshot_20240625_014857_Instagram.jpg" alt="${selectedShopiTem}">
              `
            
        });
    }
    // } else {
    //     cartDiv.innerHTML = 'Your cart is empty.'; // Message for empty cart
    // }





items.forEach(item => {
    item.addEventListener('click', () => {
        const selectedShopiTemsID = item.dataset.id;
        let Cart = JSON.parse(localStorage.getItem('Cart')) || [];

        if (Cart.includes(selectedShopiTemsID)) {
            // If already selected, deselect it
            item.classList.remove('selected');
            item.classList.add('deselected');
            Cart = Cart.filter(id => id !== selectedShopiTemsID);
        } else {
            // If not selected, select it
            item.classList.add('selected');
            item.classList.remove('deselected');
            Cart.push(selectedShopiTemsID);
        }

        // Save updated cart to local storage
        localStorage.setItem('Cart', JSON.stringify(Cart));
        updateCartDisplay(Cart); // Update the display with the latest cart
    });
});





// Navigation functions
function NavCreate() {
    document.getElementById('navbar').style.visibility = 'visible';
}

function NavReturn() {
    document.getElementById('navbar').style.visibility = 'hidden';
}

// Cart icon click event
let cartIcons = document.getElementsByClassName('bi-cart');
Array.from(cartIcons).forEach(i => {
    i.addEventListener('click', function () {
        window.location.href = '/pages/cart.html';
    });
});

// Load the cart when the page loads
loadCart();