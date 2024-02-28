let currentPasswordChangeSelector = document.querySelector('.current_Password');
let nameChangeSelector =document.querySelector('.input_change_name');
let emailChangeSelector =document.querySelector('.input_change_email');
let newPasswordChangeSelector = document.querySelector('.new_Password');
let confirmPasswordChangeSelector = document.querySelector('.confirm_Password');
let btnChangePasswordSelector =document.querySelector('.btn_change_password');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
let currentTooglepassword = document.querySelector('.toogle_current_password');
let newTooglepassword = document.querySelector('.toogle_new_password');
let conformTooglepasswordr = document.querySelector('.toogle_comfirm_password');



// 2. khai báo hàm
// hàm update thông tin acount
function handleChangeInforDetails(event){
    event.preventDefault();
    let isFormValid = true;

    let valueName = nameChangeSelector.value.trim();
    let valueEmail = emailChangeSelector.value.trim();
    // 1. validate name
    let nextErrName = nameChangeSelector.nextElementSibling;
    let nextErrEmail = emailChangeSelector.nextElementSibling;
    if(valueName === '') {
        nameChangeSelector.classList.add('error');
        nextErrName.innerText = 'Name không được để trống';
        isFormValid = false;
    } else {
        nameChangeSelector.classList.remove('error');
        nextErrName.innerText = '';
    }

    // validate email
    if(valueEmail === '') {
        emailChangeSelector.classList.add('error');
        nextErrEmail.innerText = 'Email không được để trống';
        isFormValid = false;
    } else if(emailRegex.test(valueEmail) === false) {
        isFormValid = false;
        nextErrEmail.innerText = 'Email không đúng định dạng';
    } else {
        emailChangeSelector.classList.remove('error');
        nextErrEmail.innerText = '';
    }
    
   

    // validate pass
    let isPassValid = validatePass(currentPasswordChangeSelector, 'Password');
    // new pasword
    let isvalidateNewPassValid = validatePass(newPasswordChangeSelector, 'New password');
    // confirm pass
    let isPassConfirmValid = validatePassConfirm(confirmPasswordChangeSelector, newPasswordChangeSelector, 'Confirm password');
    // 2. Kiểm tra validate thành công hay chưa? hay form hợp lệ
    if(isFormValid && isPassValid && isvalidateNewPassValid && isPassConfirmValid) {
        handleChangeInforDetailsValid();
    }

}

function validatePassConfirm(inputSelector, inputSelectorCompare, messageFieldHead) {
    let nextError = inputSelector.nextElementSibling;
    let valueCurrPass = inputSelector.value;
    let valueCompare = inputSelectorCompare.value;
    let isFormValid = false;
    if(valueCurrPass === '') {
        inputSelector.classList.add('error');
        nextError.innerText = `${messageFieldHead} không được để trống`;
    } else if(valueCurrPass.length < 8) {
        inputSelector.classList.add('error');
        nextError.innerText = `${messageFieldHead} phải có ít nhất 8 kí tự`;
    } else if(passwordRegex.test(valueCurrPass) === false) {
        inputSelector.classList.add('error');
        nextError.innerText = `${messageFieldHead} phải có ít nhất 1 kí tự hoa, thường, đặc biệt, số`;
    } else if(valueCurrPass !== valueCompare) {
        inputSelector.classList.add('error');
        nextError.innerText = `${messageFieldHead} không trùng pasword`;
    } else {
        isFormValid = true;
        inputSelector.classList.remove('error');
        nextError.innerText = '';
    }
    return isFormValid;
}

function validatePass(inputSelector, messageFieldHead) {
    let nextError = inputSelector.nextElementSibling;
    let valueCurrPass = inputSelector.value;
    let isFormValid = false;
    if(valueCurrPass === '') {
        inputSelector.classList.add('error');
        nextError.innerText = `${messageFieldHead} không được để trống`;
    } else if(valueCurrPass.length < 8) {
        inputSelector.classList.add('error');
        nextError.innerText = `${messageFieldHead} phải có ít nhất 8 kí tự`;
    } else if(passwordRegex.test(valueCurrPass) === false) {
        inputSelector.classList.add('error');
        nextError.innerText = `${messageFieldHead} phải có ít nhất 1 kí tự hoa, thường, đặc biệt, số`;
    } else {
        isFormValid = true;
        inputSelector.classList.remove('error');
        nextError.innerText = '';
    }
    return isFormValid;
}
function handleCurrentToolepassword() {
    let typePass = currentPasswordChangeSelector.getAttribute('type');
    let clicked = event.target;
    if(typePass === 'password') {
        currentPasswordChangeSelector.setAttribute('type', 'text')
         clicked.classList.remove('fa-eye-slash')
         clicked.classList.add('fa-eye')
    } else {
        currentPasswordChangeSelector.setAttribute('type', 'password')
        clicked.classList.add('fa-eye-slash')
        clicked.classList.remove('fa-eye')
    }
}
function handleNewToolepassword() {
    let typePass = newPasswordChangeSelector.getAttribute('type');
    let clicked = event.target;
    if(typePass === 'password') {
        newPasswordChangeSelector.setAttribute('type', 'text')
         clicked.classList.remove('fa-eye-slash')
         clicked.classList.add('fa-eye')
    } else {
        newPasswordChangeSelector.setAttribute('type', 'password')
        clicked.classList.add('fa-eye-slash')
        clicked.classList.remove('fa-eye')
    }
}
function handleConfirmToolepassword() {
    let typePass = confirmPasswordChangeSelector.getAttribute('type');
    let clicked = event.target;
    if(typePass === 'password') {
        confirmPasswordChangeSelector.setAttribute('type', 'text')
         clicked.classList.remove('fa-eye-slash')
         clicked.classList.add('fa-eye')
    } else {
        confirmPasswordChangeSelector.setAttribute('type', 'password')
        clicked.classList.add('fa-eye-slash')
        clicked.classList.remove('fa-eye')
    }
}




function handleChangeInforDetailsValid() {
    // 1. Kiểm tra password người dùng nhập có trùng với password user đang login hay không?
    let valueName = nameChangeSelector.value.trim();
    let valueEmail = emailChangeSelector.value.trim();
    let valueCurrPass = currentPasswordChangeSelector.value.trim();
    let valueNewPass = newPasswordChangeSelector.value.trim();

    // dùng find để tìm user object thỏa mãn điều kiện
    let users = JSON.parse(localStorage.getItem('users'));
    let userIsLogin = users.find((item) => item.status === 'active');
    // khi giá trị password nhập vào đúng với user đang login
    
    if(userIsLogin && userIsLogin.password === valueCurrPass) {
        let userUpdateInfor = users.map(
            function(item) {
                if(item.status === 'active') {
                    return {
                        id: item.id,
                        name: valueName,
                        password: valueNewPass,
                        email: valueEmail,
                        status: 'active'
                    }
                } else {
                    return item;
                }
            }
        );

        // set lại thông tin vào localStorge
        localStorage.setItem('users', JSON.stringify(userUpdateInfor));
        alert('Bạn đã thay đổi password thành công')
        nameChangeSelector.value = '';
        emailChangeSelector.value = '';
        currentPasswordChangeSelector.value = '';
        newPasswordChangeSelector.value = '';
        confirmPasswordChangeSelector.value = ''
        
    }   else {
        currentPasswordChangeSelector.nextElementSibling.innerText = 'password không đúng'  
    }
}

btnChangePasswordSelector.addEventListener('click', handleChangeInforDetails);
currentTooglepassword.addEventListener('click', handleCurrentToolepassword);
newTooglepassword.addEventListener('click', handleNewToolepassword);
conformTooglepasswordr.addEventListener('click', handleConfirmToolepassword);