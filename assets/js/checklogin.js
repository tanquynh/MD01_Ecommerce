function handleMyAcountLogin() {
    let users = JSON.parse(localStorage.getItem('users'));
    // 2. kiểm tra xem có user active hay không?
    let userFind;
    if(users) {
        userFind = users.find(
            function(userItem) {
                if(userItem.status === 'active') {
                    return true;
                } else {
                    return false;
                }
            }
        );
    }
   

    // đưa tên đăng nhập để hệ thống biết ai đăng nhập
    if(userFind) {
       
        document.querySelector('.my_account_products_login').closest('a').setAttribute('href', '/my_accounts.html');
    } else {
        document.querySelector('.my_account_products_login').closest('a').setAttribute('href', '/login.html');
    }
}

document.querySelector('.my_account_products_login').addEventListener('click', handleMyAcountLogin)
