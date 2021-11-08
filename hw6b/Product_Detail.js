////////////////////////
// FUNCTION DEFINITIONS
////////////////////////
// functions for handling incrementing/decrementing product quantity
function incrementQuantity() {
    var quantityElement = document.getElementById("number");
    var currentQuantity = parseInt(quantityElement.innerText);
    var newQuantity = currentQuantity + 1;
    quantityElement.innerText = newQuantity.toString();
}

function decrementQuantity() {
    const quantityElement = document.getElementById("number");
    var currentQuantity = parseInt(quantityElement.innerText);
    if(currentQuantity != 0) {
        var newQuantity = currentQuantity - 1;
        quantityElement.innerText = newQuantity.toString();
    }  
}


// function for adding/changing/removing borders
function addBorder(element, borderStyle) {
    element.style.border = borderStyle;
}

function hideBorder(element) {
    element.style.border = "hidden";
}

function changeGreyBorder(element) {
    var borderStyle = "solid lightgrey thin";
    element.style.border = borderStyle;
}

function hideNoneTargetBorder(targetElement, elements) {
    for(var i = 0; i < elements.length; i++) {
        if (elements[i].id != targetElement.id) {
            hideBorder(elements[i]);
        }
    }
}

function changeNoneTargetGreyBorder(targetElement, elements) {
    for(var i = 0; i < elements.length; i++) {
        if (elements[i].id != targetElement.id) {
            changeGreyBorder(elements[i]);
        }
    }
}

// functions for handling changing overall large image with user mouse over
function changeLargeImg(event) {
    var currentElement = event.currentTarget;
    addBorder(currentElement, "solid thin rgb(83, 83, 83)");
    hideNoneTargetBorder(currentElement, smallImageElements);
    var currentImgSrc = currentElement.src;
    document.getElementById("overallLarge").src = currentImgSrc;
}

// function for handling changing product color
function changeColorTitle(currentElement) {
    var colorTitle = document.getElementById("colorTitle");
    var currentColor;
    switch(currentElement.id) {
        case "morningHaze":
            currentColor = "Morning Haze";
            break;
        case "afterSchoolSpecial":
            currentColor = "After School Special";
            break;
        case "cozyDenim":
            currentColor = "Cozy Denim";
            break;
        case "rainyDay":
            currentColor = "Rainy Day";
            break;
        default:
            break;
    }
    colorTitle.innerText = "Color: " + currentColor;
}

function changeColor(event) {
    var currentElement = event.currentTarget;
    addBorder(currentElement, "solid thin rgb(83, 83, 83)");
    hideNoneTargetBorder(currentElement, colorElements); 
    changeColorTitle(currentElement);     
}

/*
function showGreyBorder(event) {
    var currentElement = event.currentTarget;
    if(currentElement.style.borderColor != "rgb(83, 83, 83)"){
        console.log(currentElement.style.border);
        addBorder(currentElement, "solid thin rgb(196, 196, 196)");
    }
    else{
        console.log("this is 838383");
    }
}

function hideGreyBorder(event) {
    var currentElement = event.currentTarget;
    if(currentElement.style.borderColor != "rgb(83, 83, 83)"){
        console.log(currentElement.style.border);
        hideBorder(currentElement);
    }
    else{
        console.log("this is 838383");
    } 
}*/

// function for handling changing product material
function changeMaterialTitle(currentElement) {
    var materialTitle = document.getElementById("materialTitle");
    var currentMaterial;
    switch(currentElement.id) {
        case "duckDown":
            currentMaterial = "Duck Down"; 
            break;
        case "hypoallergenic":
            currentMaterial = "Hypoallergenic Poly-blend";
            break;
        case "memoryFoam":
            currentMaterial = "Memory Foam";
            break;
        default:
            break;
    }
    materialTitle.innerText = "Insert Material: " + currentMaterial;
}

function changeMaterial(event) {
    var currentElement = event.currentTarget;
    addBorder(currentElement, "solid thin rgb(83, 83, 83)");
    changeNoneTargetGreyBorder(currentElement, materialButtons);
    changeMaterialTitle(currentElement);
}

// function for handling adding product to cart
function addToCart(event) {
    var numberOfNewProducts = parseInt(document.getElementById("number").innerText);
    var cartNotificationElement = document.getElementById("cartProductNumber");
    var numberOfCurrentProducts = parseInt(cartNotificationElement.innerText);
    var numberOfTotalProducts = numberOfCurrentProducts + numberOfNewProducts;
    cartNotificationElement.innerText = numberOfTotalProducts.toString();
    cartNotificationElement.style.display = "block";
    localStorage.setItem('numberOfItems', numberOfTotalProducts.toString());

    // update current type of product
    var colorTitle = document.getElementById("colorTitle");
    var materialTitle = document.getElementById("materialTitle");
    var product_name = colorTitle.innerText.split(":")[1].trim() + "_" + materialTitle.innerText.split(":")[1].trim();
    console.log(product_name);
    if(localStorage.getItem(product_name)){
        var currentNumber = parseInt(localStorage.getItem(product_name));
        var newNumber = numberOfNewProducts + currentNumber;
        localStorage.setItem(product_name, newNumber.toString());
    }
    else{
        localStorage.setItem(product_name, numberOfNewProducts.toString());
    }
    console.log(localStorage)

}

// function for updating product number notification
function updateProductNumber() {
    var cartProductNumber = document.getElementById("cartProductNumber");
    if(localStorage.getItem('numberOfItems')){     
        cartProductNumber.innerText = localStorage.getItem('numberOfItems');
    }
    else{
        cartProductNumber.style.display = "none";
    }  
}


////////
// MAIN
////////
// Add event listener on incrementing and drecrementing product quantity
var incrementButton = document.getElementById("plus");
incrementButton.addEventListener("click", incrementQuantity, false);

var decrementButton = document.getElementById("minus");
decrementButton.addEventListener("click", decrementQuantity, false);

// Add event listener on changing overall large image with mouse hover
var smallImageElements = document.getElementsByClassName("imgRow");
for (var i = 0; i < smallImageElements.length; i++) {
    smallImageElements[i].addEventListener("mouseover", changeLargeImg);
}

// Add event listener on choosing color
var colorElements = document.getElementsByClassName("colorSquare");
for (var i = 0; i < colorElements.length; i++) {
    colorElements[i].addEventListener("click", changeColor);
    //colorElements[i].addEventListener("mouseover", showGreyBorder);
    //colorElements[i].addEventListener("mouseout", hideGreyBorder);
}

// Add event listener on choosing material
var materialButtons = document.getElementsByClassName("materialButton");
for (var i = 0; i < materialButtons.length; i++) {
    materialButtons[i].addEventListener("click", changeMaterial);
}

// Add event listener on adding to cart
var addToCardButton = document.getElementById("addToCart");
addToCardButton.addEventListener("click", addToCart);

// function for handling displaying sidebar
function displaySideBar(event) {
    var actualSideBar = document.getElementById("productDetailSideBar");
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
    var actualSideBar = document.getElementById("productDetailSideBar");
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

//window.onload = updateProductNumber;
window.onload = function() {
    updateProductNumber();

    // add event listener for sidebar button
    var sideBarElement = document.getElementById("sideBar2");
    sideBarElement.addEventListener("click", displaySideBar, false);

    // add event listener for sidebar cross
    var sideBarCross = document.getElementById("sideBarCross");
    sideBarCross.addEventListener("click", hideSideBar, false);
}