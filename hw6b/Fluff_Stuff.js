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

// clear local storage after the page is closed
function clearLocalStorage() {
    localStorage.clear();
}

window.onload = function() {
    updateProductNumber();
}

window.onbeforeunload = function() {
    clearLocalStorage();
}

// function for handling displaying sidebar
function displaySideBar(event) {
    var actualSideBar = document.getElementById("fluffStuffSideBar");
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
    var actualSideBar = document.getElementById("fluffStuffSideBar");
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

// add event listener for sidebar button
var sideBarElement = document.getElementById("sideBar");
sideBarElement.addEventListener("click", displaySideBar, false);

// add event listener for sidebar cross
var sideBarCross = document.getElementById("sideBarCross");
sideBarCross.addEventListener("click", hideSideBar, false);