// function for updating product number notification
function updateProductNumber() {  
    var cartProductNumber = document.getElementById("cartProductNumber");
    cartProductNumber.innerText = localStorage.getItem('numberOfItems');
    console.log(localStorage.getItem('numberOfItems'));
}