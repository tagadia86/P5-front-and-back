let urlSearch = new URLSearchParams(window.location.search);
let selectedCam = urlSearch.get('id');
let mainBlock = document.getElementById("main_block");
const get = (url)=> {
  return new Promise((resolve,reject)=>{
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        resolve(JSON.parse(this.responseText));
      }
    }
    request.open("GET",url);
    request.send();
  });
};
get("http://localhost:3000/api/furniture").then((response)=>{
  displayChoosen(response);
})
const displayChoosen = (furnitures)=>{
  furnitures.forEach(furniture => {
    if (furniture._id == selectedCam ) {
      // card main div for each item
      let card_wrapper = document.createElement("div");
      card_wrapper.classList.add("container","col-lg-6","my-3");
      main_block.appendChild(card_wrapper);
      // card second div for each item
      let card_wrapper_child = document.createElement("div");
      card_wrapper_child.classList.add("card", "mb-4", "mb-lg-0", "border-light", "shadow-sm");
      card_wrapper.appendChild(card_wrapper_child);
      itemImager(card_wrapper,card_wrapper_child,furniture)
      //creating the button
      let itemButton = document.createElement("a");
      itemButton.classList.add("btn","btn-secondary","my-4","pink_logo");
      card_wrapper_child.appendChild(itemButton);
      itemButton.innerHTML += "Ajouter au panier";
      itemButton.role = "button";
      /*end of the part to create the button*/
      itemButton.addEventListener('click', function() {   
      addFunction(furniture);
      });/*end of the function to add an item in the cart*/ 
    }/*end of the if to find the item with his ID*/
  });/*end of the loop foreach */
}/*end of the function displayChoosen*/
const itemImager = (card_wrapper,card_wrapper_child,furniture) => {
//appending the card image
let imageCamera = document.createElement("img");
imageCamera.classList.add("card-img-top");
card_wrapper_child.appendChild(imageCamera);
imageCamera.src = furniture.imageUrl;
// creating description wrapper
let description_wrapper = document.createElement("div"); 
description_wrapper.classList.add("card-body");
card_wrapper_child.appendChild(description_wrapper);
//appending the card title
let itemName = document.createElement("h5");
itemName.classList.add("card-title");
card_wrapper_child.appendChild(itemName);
itemName.innerHTML += furniture.name;
//appending the card title
let itemPrice = document.createElement("p");
itemPrice.classList.add("card-text");
card_wrapper_child.appendChild(itemPrice);
itemPrice.innerHTML += furniture.price/100 + "€";
//appending the card id
let itemId = document.createElement("p");
itemId.classList.add("card-text");
card_wrapper_child.appendChild(itemId);
itemId.innerHTML += furniture._id;
//appending the card title
let itemDescription = document.createElement("p");
itemDescription.classList.add("card-text");
card_wrapper_child.appendChild(itemDescription);
itemDescription.innerHTML += furniture.description;
//choosing one option
let formContainer = document.createElement("div");
card_wrapper_child.appendChild(formContainer);
let formulaire = document.createElement("form");
formContainer.appendChild(formulaire);
formulaire.innerHTML = "choisissez votre vernis";
let selectElement = document.createElement("select");
selectElement.id = "mySelect";
formulaire.appendChild(selectElement);
//form for varnish options
let choosenVarnish;
furniture.varnish.forEach(eachVarnish => {
  let optionElement = document.createElement("option")
  selectElement.appendChild(optionElement);
  optionElement.value += eachVarnish;
  optionElement.innerHTML += eachVarnish;
  choosenVarnish = optionElement.value;
});
}
const addFunction = (furniture) => {
let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
let matched = false;
if(JSON.parse(localStorage.getItem("shoppingCart"))){
    shoppingCart.forEach(element =>  {
     if (element.id == furniture._id ) {
        matched = true;
        element.quantity++;
     }            
    });
     if (matched == false) {
       shoppingCart.push({
         id : furniture._id,
         quantity : 1
       });
      }
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}
else{
  shoppingCart = [];    
  shoppingCart.push({
    id : furniture._id,
    quantity : 1
  });
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}
}