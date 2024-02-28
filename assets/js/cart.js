

function getUserLogin() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userLogin = users.find(item => item.status === 'active');
    return userLogin;
}

// function tính toán tổng cart
function totalCartNumber() {
    // lấy thông tin users đang login
    let userLogin = getUserLogin();
    // lấy cart user
    let cartOfusers = userLogin.cart || [];
    // Tổng số sản phẩm giỏ hàng quantity
    let totalCart = 0;
     for(let i = 0; i < cartOfusers.length; i++) {
        totalCart = totalCart + cartOfusers[i].quantity;

     }
    document.querySelector('.js_cart_quantily').innerText = totalCart;

}


// Show hiể thị totak cart
totalCartNumber() 







