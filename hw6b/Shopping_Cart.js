// function for updating subtotal
function updateSubtotal(singlePriceElement, inputElement, subTotalElement) {
    var singlePrice = parseFloat(singlePriceElement.innerText.split("$")[1]);
    var quantity = parseInt(inputElement.value);
    var newSubTotal = singlePrice*quantity;
    subTotalElement.innerText = "$" + newSubTotal.toFixed(2).toString();
    return subTotalElement;
}

function updateCartLocalNumber() {
    var productElements = document.getElementsByClassName("product_row");
    var newCartNumber = 0;
    for (var i = 0; i < productElements.length; i++) {
        var inputElement = productElements[i].children[2].children[0];
        newCartNumber = newCartNumber + parseInt(inputElement.value);
    }
    var cartProductNumber = document.getElementById("cartProductNumber");
    cartProductNumber.innerText = newCartNumber.toString();

    if(localStorage.getItem('numberOfItems')){     
        localStorage.setItem('numberOfItems', newCartNumber.toString());
    }
    else{
        cartProductNumber.style.display = "none";
    }
}

function getImageNameFromColor(color) {
    var imageName;
    switch(color) {
        case "Morning Haze":
            imageName = "Images/MH.jpeg";
            break;
        case "After School Special":
            imageName = "Images/AFS.jpeg";
            break;
        case "Cozy Denim":
            imageName = "Images/CD.jpeg";
            break;
        case "Rainy Day":
            imageName = "Images/RD.jpeg";
            break;
        default:
            break;
    }
    return imageName;
}

function handleInitialProduct() {
    var initialProductId = "Morning Haze_Duck Down";

}

function updateCartProducts(){
    var table = document.getElementById("table1");
    for(var i = 0; i < localStorage.length; i++) {
        var id = localStorage.key(i);
        if(id == "numberOfItems"){
            continue;
        }
        var value = localStorage.getItem(id);
        
        // build new row
        var newRow = table.insertRow(-1);
        newRow.id = id;
        newRow.className = "product_row";

        // build cell 1
        var cell1 = newRow.insertCell(0);
        var color = id.split('_')[0];
        var material = id.split('_')[1];
        var imageFileName = getImageNameFromColor(color);
        var cell1HTML = `
            <div class="itemInfo">
                <img src="${imageFileName}" alt="${color}">
                <div>
                    <p><b>Artisan Round Pillow</b></p>
                    <small><b>Color</b> ${color}</small>
                    <br>
                    <small><b>Material</b> ${material}</small>
                    <br>
                    <small><b>Size</b> One Size</small>
                    <br>
                    <a href="">Edit</a>
                </div>
            </div>`;
        cell1.innerHTML = cell1HTML;

        // build cell 2
        var cell2 = newRow.insertCell(1);
        cell2.innerHTML = `Price <b id="${id}__singlePrice">$69.00</b>`;

        // build cell 3
        var cell3 = newRow.insertCell(2);
        cell3.innerHTML = `Quantity <input id="${id}__quantity" class="quantity" type="number" value="0" min="0">`;

        // build cell 4
        var cell4 = newRow.insertCell(3);
        cell4.innerHTML = `Subtotal <b id="${id}__subTotal">$0.00</b>`;

        // build cell 5
        var cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<img id="${id}__cross" class="cross" src="Images/cross.png" alt="delete">`;

    }
}

// function for updating product number notification
function updatePageNumbers() {  
    var totalCost = 0;
    var totalElement = document.getElementById("total");
    
    var productElements = document.getElementsByClassName("product_row");
    for (var i = 0; i < productElements.length; i++) {
        // keep input numbers
        var inputElement = productElements[i].children[2].children[0];
        
        if(localStorage.getItem(productElements[i].id)) {
            inputElement.value = localStorage.getItem(productElements[i].id);
        }
        // update subtotal
        var singlePriceElement = productElements[i].children[1].children[0];
        var subTotalElement = productElements[i].children[3].children[0];
        subTotalElement = updateSubtotal(singlePriceElement, inputElement, subTotalElement);

        // calculate total cost
        totalCost = totalCost + parseFloat(subTotalElement.innerText.split("$")[1]);
    }
    // update total cost
    totalElement.innerText = "$" + totalCost.toFixed(2).toString();

    // update cart logo number
    updateCartLocalNumber();   
}

// function for handling quantity input change
function handleQuantityInput(event){
    // update subtotal
    var currentElement = event.currentTarget;
    var id = currentElement.id.split("__")[0];
    var singlePriceElement = document.getElementById(id + "__singlePrice");
    var subTotalElement = document.getElementById(id + "__subTotal");
    console.log(singlePriceElement);
    updateSubtotal(singlePriceElement, currentElement, subTotalElement);

    // update the number of current product in local storage
    localStorage.setItem(id, currentElement.value); 
    console.log(localStorage);  
}

// function for removing products
function removeProduct(event) {
    var currentElement = event.currentTarget;
    var id = currentElement.id.split("__")[0];
    var currentRowElement = currentElement.parentNode.parentNode;
    currentRowElement.parentNode.removeChild(currentRowElement);
    // remove local storage number for this product
    localStorage.removeItem(currentRowElement.id);
}

function addInputListener(className) {
    var inputElements = document.getElementsByClassName(className);
    for(var i = 0; i < inputElements.length; i++) {
        inputElements[i].addEventListener('input', handleQuantityInput, false);
    }
}

function addCrossListener(className) {
    var crossElements = document.getElementsByClassName("cross");
    for(var i = 0; i < crossElements.length; i++) {
        crossElements[i].addEventListener('click', removeProduct, false)
    }
}

// function for handling displaying sidebar
function displaySideBar(event) {
    var actualSideBar = document.getElementById("shoppingCartSideBar");
    actualSideBar.style.width = "250px";
    var sideBarLinks = document.getElementsByClassName("sideBarLinks");
    for(var i = 0; i < sideBarLinks.length; i++) {
        sideBarLinks[i].style.paddingTop = "37px";
        sideBarLinks[i].style.paddingLeft = "35px";
        sideBarLinks[i].style.display = "block";
    }
    var sideBarCross = document.getElementById("sideBarCross");
    sideBarCross.style.width = "14px";
    var mainParts = document.getElementById("mainParts");
    mainParts.style.marginLeft = "250px";
}

// function for handling hiding sidebar
function hideSideBar(event) {
    var actualSideBar = document.getElementById("shoppingCartSideBar");
    actualSideBar.style.width = "0px";
    var sideBarLinks = document.getElementsByClassName("sideBarLinks");
    for(var i = 0; i < sideBarLinks.length; i++) {
        sideBarLinks[i].style.paddingTop = "0px";
        sideBarLinks[i].style.paddingLeft = "0px";
        sideBarLinks[i].style.display = "none";
    }
    var sideBarCross = document.getElementById("sideBarCross");
    sideBarCross.style.width = "0px";
    var mainParts = document.getElementById("mainParts");
    mainParts.style.marginLeft = "0px";
}

window.onload = function() {
    updateCartProducts();
    updatePageNumbers();
    console.log(localStorage);

    // add event listener for input
    addInputListener("quantity");

    // add event listener for cross
    addCrossListener("cross");

    // add event listener for sidebar button
    var sideBarElement = document.getElementById("sideBar2");
    sideBarElement.addEventListener("click", displaySideBar, false);

    // add event listener for sidebar cross
    var sideBarCross = document.getElementById("sideBarCross");
    sideBarCross.addEventListener("click", hideSideBar, false);

}
