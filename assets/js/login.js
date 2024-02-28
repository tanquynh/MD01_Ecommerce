let buttonAddLogin = document.querySelector('.btn_login');
let emailloginSelector = document.querySelector('.email_login');
let passwordLoginSelector= document.querySelector('.password_login');
let toogleLoginPassword = document.querySelector('.toogle_login_password');
const validRegex =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const validRegexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
let alertLoginSelector = document.querySelector('.alert-danger');

// 2. Nơi khai báo hàm lắng nghe sự kiện hoặc hàm chạy lần đầu load trang
function showError(input, message) {
    // Thay đổi border input
    input.classList.remove('success');
    input.classList.add('error');
    let mesageInput = input.nextElementSibling;
    // Hiển thị message lỗi
    mesageInput.innerText = message;
    // thêm class form-group_error cho parent
    input.closest('.form_login').classList.add('form-group_error');
}

function showSuccess(input) {
    input.classList.remove('error');
    input.classList.add('success');
    let mesageInput = input.nextElementSibling;
    // Xóa message bị lỗi
    mesageInput.innerText = '';
      // remove class form-group_error cho parent
    input.closest('.form_login').classList.remove('form-group_error');
}

function handleLogin(event) {
     // Ngăn cản hành động mặc định của supmit form khi ấn button submit
     event.preventDefault();
     // 1.1 Validate email 
     let isEmailLoginvalid = validateloginEmail()

     // 2.1 Validate password 
    let isPasswordLoginvalid = validateLoginPassword()
    let users = JSON.parse(localStorage.getItem('users'))
    let isLoginExitIndex = -1;

    if( isEmailLoginvalid && isPasswordLoginvalid ) { 
        for(let i = 0; i < users.length; i++) {
            if(users[i].email === emailloginSelector.value && users[i].password === passwordLoginSelector.value) {
                isLoginExitIndex = i;
                break;
              
            } 
        }
        if(isLoginExitIndex !== -1) {
            users.forEach(function(item) {
                item.status = '';
            });
            users[isLoginExitIndex].status = 'active';
            localStorage.setItem('users', JSON.stringify(users));
            window.location.href = "./home_index.html";
            
        } else {
            passwordLoginSelector.classList.remove('success');
            passwordLoginSelector.classList.add('error');
            emailloginSelector.classList.remove('success');
            emailloginSelector.classList.add('error');
            alertLoginSelector.innerText = 'Email hoặc password không đúng';
            alertLoginSelector.classList.remove('hide');
        }
    } 
}

function handleToogleLoginPass(event) {
    let typePass = passwordLoginSelector.getAttribute('type');
    let clicked = event.target;
    if(typePass === 'password') {
         passwordLoginSelector.setAttribute('type', 'text')
         clicked.classList.remove('fa-eye-slash')
         clicked.classList.add('fa-eye')
    } else {
        passwordLoginSelector.setAttribute('type', 'password')
        clicked.classList.add('fa-eye-slash')
        clicked.classList.remove('fa-eye')
    }
}


function validateloginEmail() {
    let isvalidateLoginEmail = false;
    let valueEmail = emailloginSelector.value.trim();
    if(valueEmail === '') {
        showError(emailloginSelector, 'Email không được để trống!!');
    } else if(validRegex.test(valueEmail) === false) {
        showError(emailloginSelector, 'Email không đúng định dạng!!');
    }else {
        isvalidateLoginEmail = true;
        showSuccess(emailloginSelector);
    }
    return isvalidateLoginEmail;
}

function validateLoginPassword() {
    let isvalidateLoginPassword = false;
    let valuePassword = passwordLoginSelector.value.trim();
    if(valuePassword === '') {
        showError(passwordLoginSelector,'Password không được để trống!!');
    }  else  if(valuePassword.length < 8) {
        showError(passwordLoginSelector, 'Password tối thiểu tám ký tự');
    } else if(validRegexPassword.test(valuePassword) === false) {
        showError(passwordLoginSelector,'Password chứa chữ hoa, chữ thường, ký tự đặc biệt!!');
    }
    else {
        isvalidateLoginPassword = true;
        showSuccess(passwordLoginSelector);
    }
    return isvalidateLoginPassword;
}


// 3. Nơi chạy hàm hoặc thêm addEventLisner
// Khi nhấn vào button Register
buttonAddLogin.addEventListener('click', handleLogin);
// Khi nhấn vào icon show hide passwor
toogleLoginPassword.addEventListener('click', handleToogleLoginPass);
// 4.Bắt sự kiện keyup cho ô input name
emailloginSelector.addEventListener('keyup', validateloginEmail);
passwordLoginSelector.addEventListener('keyup', validateLoginPassword);