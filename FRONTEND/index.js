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
  console.log(response);
  displayItem(response);
})
const displayItem = (furnitures)=>
{
  furnitures.forEach(furniture => {
    // card main div for each item
    let card_wrapper = document.createElement("div");
    //card_wrapper.classList.add("card_img_size","mb-3","card");
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
    imager(image_wrapper,description_wrapper,furniture)
  });
}
const imager = (image_wrapper,description_wrapper,furniture) => {
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
    let itemButton = document.createElement("a");
    itemButton.classList.add("btn","btn-secondary","pink_logo","text-dark");
    cardBody.appendChild(itemButton);
    itemButton.innerHTML += "voir l'article";
    itemButton.href = "item.html?id="+furniture._id;
    itemButton.role = "button";
}

