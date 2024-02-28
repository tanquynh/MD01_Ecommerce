let buttonAddRegister = document.querySelector('.btn_register');
let nameRegisterSelector = document.querySelector('.name_register');
let emailRegisterSelector = document.querySelector('.email_register');
let passwordRegisterSelector= document.querySelector('.password_register');
let confirmPasswordRegisterSelector= document.querySelector('.confirm_password_register');
const validRegex =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const validRegexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
let tooglePassword = document.querySelector('.toogle_password');
let toogleComfirmPassword = document.querySelector('.toogle_confirm_password');

function showError(input, message) {
    // Thay đổi border input
    input.classList.remove('success');
    input.classList.add('error');
    let mesageInput = input.nextElementSibling;
    // Hiển thị message lỗi
    mesageInput.innerText = message;
    // thêm class form-group_error cho parent
    input.closest('.form_register').classList.add('form-group_error');
}
function showSuccess(input) {
    input.classList.remove('error');
    input.classList.add('success');
    let mesageInput = input.nextElementSibling;
    // Xóa message bị lỗi
    mesageInput.innerText = '';
      // remove class form-group_error cho parent
    input.closest('.form_register').classList.remove('form-group_error');
}

function handleSignUp(event) {
    // Ngăn cản hành động mặc định của supmit form khi ấn button submit
    event.preventDefault();

    // 1. validate name
    let isNameRegistervalid = validateNameRegister();

    // 2.1 Validate email 
    let isEmailRegistervalid = validateEmailRegister()

     // 3.1 Validate password 
    let isPasswordRegistervalid = validatePasswordRegister()

     // 4.1 Validate Confirm password 
     let isConfirmPasswordRegistervalid = validateConfirmPasswordRegister()
     // khi tất cả validate hợp lệ chúng ta lưu trữ data
    if(isNameRegistervalid && isEmailRegistervalid && isPasswordRegistervalid && isConfirmPasswordRegistervalid ) { 
        // 1. Trước khi push vào phải lấy thông tin ra
        let usersBefore;
        // chưa có data trong local Storage
        if(localStorage.getItem('users') === null) {
            usersBefore = [];
        } else {
            // Đã có data ở local Storage
            usersBefore = JSON.parse(localStorage.getItem('users'))
        }

        // 2. Kiểm tra email không trung mới đưa vào local Storade
        let emailUnique = true;
        for( let i = 0; i < usersBefore.length; i++) {
            console.log(usersBefore[i])
            if(usersBefore[i].email === emailRegisterSelector.value){
                emailUnique = false;
                break
            }
        }
        if(emailUnique) {
            let objNewUser = {
                id: crypto.randomUUID(),
                name: nameRegisterSelector.value,
                email: emailRegisterSelector.value,
                password: passwordRegisterSelector.value,
                status: '' ,
                role: 'regular'
            }
        // Thêm users vào mảng đã có sẵn
        usersBefore.push(objNewUser)
        // lưu vào local Storage
        localStorage.setItem('users',JSON.stringify(usersBefore));
        // Chuyển sang trong log in
        window.location.href = "./login.html"
        } else {
            alert("email đã tồn tại trong hệ thống")
        }   
    }
}




function handleTooglePass(event) {
    let typePass = passwordRegisterSelector.getAttribute('type');
    let clicked = event.target;
    if(typePass === 'password') {
         passwordRegisterSelector.setAttribute('type', 'text')
         clicked.classList.remove('fa-eye-slash')
         clicked.classList.add('fa-eye')
    } else {
        passwordRegisterSelector.setAttribute('type', 'password')
        clicked.classList.add('fa-eye-slash')
        clicked.classList.remove('fa-eye')
    }
 }
 
function handleToogleConfirmPass(event) {
    let typePass = confirmPasswordRegisterSelector.getAttribute('type');
    let clicked = event.target;
    if(typePass === 'password') {
        confirmPasswordRegisterSelector.setAttribute('type', 'text')
         clicked.classList.remove('fa-eye-slash')
         clicked.classList.add('fa-eye')
    } else {
        confirmPasswordRegisterSelector.setAttribute('type', 'password')
         clicked.classList.add('fa-eye-slash')
         clicked.classList.remove('fa-eye')
    }
}
function validateNameRegister() {
    let isValidateName = false;
    let valueNameRegister = nameRegisterSelector.value.trim();
    if(valueNameRegister === ''){
        showError(nameRegisterSelector, 'Tên không được để trống!!');
    } else {
        isValidateName = true;
        showSuccess(nameRegisterSelector);
    }
    // Thông báo name có validate thành công hay không
    return isValidateName;
}
function validateEmailRegister() {
    let isvalidateEmail = false;
    let valueEmail = emailRegisterSelector.value.trim();
    if(valueEmail === '') {
        showError(emailRegisterSelector, 'Email không được để trống!!');
    } else if(validRegex.test(valueEmail) === false) {
        showError(emailRegisterSelector, 'Email không đúng định dạng!!');
    }else {
        isvalidateEmail = true;
        showSuccess(emailRegisterSelector);
    }
    return isvalidateEmail;
}
function validatePasswordRegister() {
    let isvalidatePassword = false;
    let valuePassword = passwordRegisterSelector.value.trim();
    if(valuePassword === '') {
        showError(passwordRegisterSelector,'Password không được để trống!!');
    }  else  if(valuePassword.length < 8) {
        showError(passwordRegisterSelector, 'Password tối thiểu tám ký tự');
    } else if(validRegexPassword.test(valuePassword) === false) {
        showError(passwordRegisterSelector,'Password chứa chữ hoa, chữ thường, ký tự đặc biệt!!');
    }
    else {
        isvalidatePassword = true;
        showSuccess(passwordRegisterSelector);
    }
    return isvalidatePassword;
}
function validateConfirmPasswordRegister() { 
    let isvalidateConfirmPassword = false;
    let valueConfirmRegisterPassword = confirmPasswordRegisterSelector.value.trim();
    let valuePassword = passwordRegisterSelector.value.trim();
    if(valueConfirmRegisterPassword == '') {
        showError(confirmPasswordRegisterSelector, 'Confirm Password không được để trống!!');
    }   else  if(valueConfirmRegisterPassword.length < 8) {
        showError(confirmPasswordRegisterSelector, 'Confirm Password tối thiểu tám ký tự');
    } else if(validRegexPassword.test(valueConfirmRegisterPassword) === false) {
        showError(confirmPasswordRegisterSelector,'Password chứa chữ hoa, chữ thường, ký tự đặc biệt!!');
    }
    else if(valueConfirmRegisterPassword !== valuePassword) {
        showError(confirmPasswordRegisterSelector,'Password không trùng, mời nhập lại Confirm Password!!');
    }
    else {
        isvalidateConfirmPassword = true
        showSuccess(confirmPasswordRegisterSelector);
    }
    return isvalidateConfirmPassword;
}






// 3. Nơi chạy hàm hoặc thêm addEventLisner
// Khi nhấn vào button Register
buttonAddRegister.addEventListener('click', handleSignUp)
// Khi nhấn vào icon show hide password
tooglePassword.addEventListener('click', handleTooglePass)
// Khi nhấn vào icon show hide confirm passwor
toogleComfirmPassword.addEventListener('click', handleToogleConfirmPass)

// 4.Bắt sự kiện keyup cho ô input name
nameRegisterSelector.addEventListener('keyup', validateNameRegister)
emailRegisterSelector.addEventListener('keyup', validateEmailRegister)
passwordRegisterSelector.addEventListener('keyup', validatePasswordRegister)
confirmPasswordRegisterSelector.addEventListener('keyup', validateConfirmPasswordRegister)