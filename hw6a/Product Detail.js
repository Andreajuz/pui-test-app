// functions to increment/decrement product quantity
function incrementQuantity() {
    var quantityElement = document.getElementById("number");
    var currentQuantity = parseInt(quantityElement.innerText);
    var newQuantity = currentQuantity + 1;
    quantityElement.innerText = newQuantity.toString();
}

function decrementQuantity() {
    const quantityElement = document.getElementById("number");
    var currentQuantity = parseInt(quantityElement.innerText);
    if(currentQuantity !=0) {
        var newQuantity = currentQuantity - 1;
        quantityElement.innerText = newQuantity.toString();
    }
}

//functions to add/change/remove borders
function addBorder(element) {
    var borderStyle = "solid #535353 thin";
    element.style.border = borderStyle;
}

function removeBorder(element) {
    element.style.border = "none";
}

function changeGreyBorder(element) {
    var borderStyle = "solid lightgrey thin";
    element.style.border = borderStyle;
}

function removeNoneTargetBorder(targetElement, elements) {
    for(var i = 0; i < elements.length; i++) {
        if (elements[i].id != targetElement.id) {
            removeBorder(elements[i]);
        }
    }
}

function changeNoneTargetBorder(targetElement, elements) {
    for(var i = 0; i < elements.length; i++) {
        if (elements[i].id != targetElement.id) {
            changeGreyBorder(elements[i]);
        }
    }
}

// functions to change overall large image with mouse over
function changeLargeImg(event) {
    var currentElement = event.currentTarget;
    addBorder(currentElement, "thin");
    removeNoneTargetBorder(currentElement, smallImageElements);
    var currentImgSrc = currentElement.src;
    document.getElementById("overallLarge").src = currentImgSrc;
}

// functions to change product color
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
    addBorder(currentElement, "thin");
    removeNoneTargetBorder(currentElement, colorElements); 
    changeColorTitle(currentElement);     
}

// functions to change product material
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
    addBorder(currentElement, "thin");
    changeNoneTargetBorder(currentElement, materialButtons);
    changeMaterialTitle(currentElement);
}

// functions to add product to cart
function addToCart(event) {
}

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
}

// Add event listener on choosing material
var materialButtons = document.getElementsByClassName("materialButton");
for (var i = 0; i < materialButtons.length; i++) {
    materialButtons[i].addEventListener("click", changeMaterial);
}

// Add event listener on adding to cart
var addToCardButton = document.getElementById("addToCart");
addToCardButton.addEventListener("click", addToCart);
