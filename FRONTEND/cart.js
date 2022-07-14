let mainBlock = document.getElementById("main_block");
let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

const get = (url)=> {
  return new Promise((resolve,reject)=>{
    const request = new XMLHttpRequest();
    request.onreadystatechange = function()
    {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
      {
        resolve(JSON.parse(this.responseText));
      }
    }
    request.open("GET",url);
    request.send();
  });
};
get("http://localhost:3000/api/furniture").then((response)=>
{
  displayShoppingcart(response,shoppingCart);
})
let price_wrapper = document.createElement("div");
price_wrapper.classList.add("mb-12","card");
main_block.appendChild(price_wrapper); 
let totalPriceButton = document.createElement("a");
totalPriceButton.classList.add("btn","pink_logo");
price_wrapper.appendChild(totalPriceButton);
totalPriceButton.innerHTML = "TOTAL = " + (0) + "<br>";
const displayShoppingcart = (furnitures,shoppingCart)=>
{
  if (shoppingCart) {
    shoppingCart.forEach(element => 
      {
        furnitures.forEach(furniture => 
          {
            if (element.id == furniture._id) 
            {
              // card main div for each item
              let card_wrapper = document.createElement("div");
              card_wrapper.classList.add("card_img_size","mb-3","card");
              main_block.appendChild(card_wrapper); 
              // card second div for each item
              let card_wrapper_child = document.createElement("div");
              card_wrapper_child.classList.add("row","g-0");
              card_wrapper.appendChild(card_wrapper_child);
              // creating image wrapper
              let image_wrapper = document.createElement("div"); 
              image_wrapper.classList.add("col-md-6");
              card_wrapper_child.appendChild(image_wrapper);
              // creating description wrapper
              let description_wrapper = document.createElement("div"); 
              description_wrapper.classList.add("col-6");
              card_wrapper_child.appendChild(description_wrapper);
              //appending the card image
              let imageCamera = document.createElement("img");
              imageCamera.classList.add("img_size");
              image_wrapper.appendChild(imageCamera);
              imageCamera.src = furniture.imageUrl; 
              //appending the card image
              let cardBody = document.createElement("div");
              cardBody.classList.add("card-body");
              description_wrapper.appendChild(cardBody);
              let itemName = document.createElement("p");
              cardBody.appendChild(itemName);
              itemName.innerHTML += furniture.name;
              let itemPrice = document.createElement("p");
              cardBody.appendChild(itemPrice);
              itemPrice.innerHTML += (furniture.price/100) + "€";
              let itemID = document.createElement("p");
              cardBody.appendChild(itemID);
              itemID.innerHTML += furniture._id;
              let itemDescription = document.createElement("p");
              cardBody.appendChild(itemDescription);
              itemDescription.innerHTML += furniture.description + "<br>";
              //appending the remove button
              let removeButton = document.createElement("a");
              removeButton.classList.add("btn","btn-secondary","pink_logo");
              cardBody.appendChild(removeButton);
              removeButton.innerHTML += "supprimer cet article";
              removeButton.role = "button";
              //calling the function to remove an item on click
              removeButton.addEventListener('click', function() {   
              removeChoosen (shoppingCart,furniture._id);
              localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
              location.reload();
              });
              /*END: remove button section */
              //item quantity
              let itemQuantity = document.createElement("p");
              cardBody.appendChild(itemQuantity);
              itemQuantity.classList.add("quantity");
              itemQuantity.innerHTML += "quantité = " + element.quantity + "<br>";
              //appending the price
              let displayPrice = document.createElement("p");
              cardBody.appendChild(displayPrice);
              displayPrice.classList.add("price");
              displayPrice.innerHTML += "prix = " + (element.quantity *furniture.price/100 ) + "<br>";
              //appending the minus button
              let minusButton = document.createElement("a");
              minusButton.classList.add("btn","btn-secondary","pink_logo","mr-3");
              cardBody.appendChild(minusButton);
              minusButton.innerHTML += "diminuer";
              minusButton.role = "button";
              minusButton.addEventListener('click', function() {   
                element.quantity -=1;
                if (element.quantity == 0){
                  removeChoosen (shoppingCart,furniture._id);
                  location.reload();
                }
                localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
                itemQuantity.innerHTML = "quantité = " + element.quantity + "<br>";
                displayPrice.innerHTML = "prix = " + (element.quantity *furniture.price/100 ) +"€"+ "<br>";
                totalPrice = calculateTotal(furnitures,shoppingCart);
                totalPriceButton.innerHTML = "TOTAL = " + (totalPrice/100 ) +"€"+"<br>";
              });  
              //appending the add button
              let addButton = document.createElement("a");
              addButton.classList.add("btn","btn-secondary","pink_logo");
              cardBody.appendChild(addButton);
              addButton.innerHTML += "ajouter";
              addButton.role = "button";
              addButton.addEventListener('click', function() {   
              element.quantity +=1;
              localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
              itemQuantity.innerHTML = "quantité = " + element.quantity + "<br>";
              displayPrice.innerHTML = "prix = " + (element.quantity *furniture.price/100 ) +"€"+ "<br>";
              totalPrice = calculateTotal(furnitures,shoppingCart);
              totalPriceButton.innerHTML = "TOTAL = " + (totalPrice/100 ) + "<br>";
              });   
              totalPrice = calculateTotal(furnitures,shoppingCart);
              totalPriceButton.innerHTML = "TOTAL = " + (totalPrice/100) +"€"+ "<br>";
            }
          });
      });
  }
}
//function to calculate the price
const calculateTotal = (furnitures,shoppingCart)=>{
  let total = 0;
  if (shoppingCart && furnitures) {
    shoppingCart.forEach(element => {
      furnitures.forEach(furniture => {
          if (element.id == furniture._id)
                total+= furniture.price * element.quantity;
        });
    });
  }
  else{
    total = 10;
  }
  return total;
}
//function to remove item on click
const removeChoosen = (removingArray,itemToRemove)=>{
  let cptRemove = 0;
  removingArray.forEach(index => {
    if (index.id == itemToRemove ){
      if (removingArray === null) {
          removingArray = [];
      }
      removingArray.splice(cptRemove, 1); 
    }
    cptRemove++;
  });
}
/*end of the function to remove item on click*/
//appending the clear button
let clearButton = document.createElement("a");
clearButton.classList.add("btn","btn-secondary","pink_logo","my-3");
main_block.appendChild(clearButton);
clearButton.innerHTML = "vider le panier";
clearButton.role = "button";
//calling the function to clear the cart on click
clearButton.addEventListener('click', function() {   
  clearCart (shoppingCart);
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  location.reload();
});
/*END: clear button section */
//function to clear the cart
const clearCart = (cartToClear)=>{
  while (cartToClear.length > 0){
    if (cartToClear === null) {
        cartToClear = [];
    }
    cartToClear.pop();
  }
}
/*************************** SENDING DATA TO SERVER**************************/
let contact = {};
//calling the function to submit the form on click
  let submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', function(e) {   
  e.preventDefault();
  if (shoppingCart.length == 0) {
    alert("Votre panier est vide");
  }
  else{
    contact = formInputs();
    if(contact == false){
      alert("ERREUR DE SAISIE");
    }
    else{
      products = buildArrayToSend(shoppingCart);
      let orderReturn = postForm({ contact, products });
    }
  }
});
/*END: submit button section */
function formInputs() {
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let address = document.getElementById('inputAddress1').value;
  let city = document.getElementById('inputCity').value;
  let email = document.getElementById('inputEmail').value;
  if (firstName == "" || lastName == "" || address == "" || city == "" || email == "") {
    alert("Tous les champs du formulaire doivent être correctement remplis");
    return false;
  }
  else if ((ValidateEmail(email) == false) ) {
    alert("Invalid email address!");
    return false;
  }
  else{
    return {
      firstName,
      lastName,
      address,
      city,
      email
    };
  }
}
function ValidateEmail(input) {
  let validRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}
function buildArrayToSend(fromThisArray) {
  let ArrayToSend = [];
  fromThisArray.forEach(element => {
    ArrayToSend.push(element.id);
  });
  return ArrayToSend;
}
async function postForm(dataToSend) {
  try {
      let response = await fetch("http://localhost:3000/api/furniture/order", {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(dataToSend) 
      });
      if (response.ok) {
          let data = await response.json();
          clearCart (shoppingCart);
          window.open("orderID.html?id="+data.orderId+"&tot="+totalPrice);
          console.log(shoppingCart);
          localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
      } else {
          console.error('Retour du serveur : ', response.status);
      }
  } catch (e) {
      console.log(e);
  }
}