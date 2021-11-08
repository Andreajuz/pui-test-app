// function for updating product number notification
function updateProductNumber() {  
    var cartProductNumber = document.getElementById("cartProductNumber");
    cartProductNumber.innerText = localStorage.getItem('numberOfItems');
}

// clear local storage after the page is closed
function clearLocalStorage() {
    localStorage.setItem('numberOfItems', '0');
}