let buttonChangeUsers = document.querySelector('.btn_change_users');
let nameUsersChange = document.querySelector('.my_account_name_users');
let emailUsersChange = document.querySelector('.my_account_email_users');
let passwordUsersChange= document.querySelector('.my_account_password_users');
const validRegex =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const validRegexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
let tooglePasswordUsersChange = document.querySelector('.toogle_password_users');
let tbodyUsersChange = document.querySelector('.product_users_change');
let nameInputUsersListMyAcount =document.querySelector('.nameInputUsersListMyAcount');
let emailInputUsersListMyAcount =document.querySelector('.emailInputUsersListMyAcount');
function showError(input, message) {
    // Thay đổi border input
    input.classList.remove('success');
    input.classList.add('error');
    let mesageInput = input.nextElementSibling;
    // Hiển thị message lỗi
    mesageInput.innerText = message;
    // thêm class form-group_error cho parent
    input.closest('.form_my_account_user').classList.add('form-group_error');
}
function showSuccess(input) {
    input.classList.remove('error');
    input.classList.add('success');
    let mesageInput = input.nextElementSibling;
    // Xóa message bị lỗi
    mesageInput.innerText = '';
      // remove class form-group_error cho parent
    input.closest('.form_my_account_user').classList.remove('form-group_error');
}

function renderDataUsers() {
    let users = JSON.parse(localStorage.getItem('users'));
    console.log(users)
    let userFind;
    if(users) {
        userFind = users.filter(
            function(userItem) {
                if(userItem.status === '') {
                    return true;
                } else {
                    return false;
                }
            }
        );
    }
    console.log(userFind)
    if(userFind) {
        let usersHtml = ``;
        for(let i = 0; i < userFind.length; i++) {
            usersHtml += ` <tr>
                                    <td>${userFind[i].name}</td>
                                    <td>${userFind[i].email}</td>
                                    <td>${userFind[i].password}</td>
                                    <td>
                                        <button data-id = "${userFind[i].id}"class ="btn_edit btn_common">Edit</button>
                                        <button data-id = "${userFind[i].id}" class ="btn_delete btn_common">Delete</button>
                                    </td>
                                </tr>`
            
        }
        tbodyUsersChange.innerHTML = usersHtml
    }     
}
 // Nếu data hợp lệ thì thực thi hàm này
 function handleSubmitFormUsers() {
    if(validateEmailUsersChange && validateEmailUsersChange && validatePasswordUsersChange) {
        let clicked =event.target;
        if(clicked.classList.contains('update')) {
            let idUpdate = clicked.getAttribute('data-id')
            handleUpdateFormUsers(idUpdate) 
        } else {
            let valueName = nameUsersChange.value.trim();
            let valuePassword = passwordUsersChange.value.trim();
            let valueEmail = emailUsersChange.value.trim();
        
            // Khi chưa có dữ liệu local Storage chúng ta tạo mảng rỗng
            // Khi có dữ liệu thì chúng ta phải lấy về và đẩy thêm dữ liệu
            let users;
            if(localStorage.getItem('users') === null) {
                users = []
            
            } else {
                users = JSON.parse(localStorage.getItem('users'))
            }
            let newUsers = {
                id: crypto.randomUUID(),
                name: valueName,
                email: valueEmail,
                password: valuePassword,
        
            }
            users.push(newUsers)
            //    lưu data vào local Storage khi load vào trang không mất dữ liệu
            localStorage.setItem('users', JSON.stringify(users));
            // Hiển thị dư liệu ở localStorage ra table
            renderDataUsers() 
        
        }
       
    }
    
}




function handleTooglePassUsersChange(event) {
    let typePass = passwordUsersChange.getAttribute('type');
    let clicked = event.target;
    if(typePass === 'password') {
        passwordUsersChange.setAttribute('type', 'text')
         clicked.classList.remove('fa-eye-slash')
         clicked.classList.add('fa-eye')
    } else {
        passwordUsersChange.setAttribute('type', 'password')
        clicked.classList.add('fa-eye-slash')
        clicked.classList.remove('fa-eye')
    }
 }
 function handleUpdateFormUsers(idUpdate) {
    let users = JSON.parse(localStorage.getItem('users'));
    let indexUpdate = users.findIndex (
        function(item) {
            if(item.id === idUpdate) {
                return true
            } else {
                return false
            }
        }
    )
   

    users[indexUpdate].name = nameUsersChange.value;
    users[indexUpdate].email = emailUsersChange.value;
    users[indexUpdate].password = passwordUsersChange.value;
    localStorage.setItem('users',JSON.stringify(users))
    renderDataUsers() 
    saveButtonCategory.innerText = 'Save'
    saveButtonCategory.classList.remove('update');
    saveButtonCategory.removeAttribute('data-id')
    
}

function handleProcessUsersChange (event) {
    if(event.target.classList.contains('btn_delete')) {
        let confirmDelete = confirm('Bạn chắc chẵn muốn xóa không?')
        if(confirmDelete) {
           let clicked = event.target
            let users = JSON.parse(localStorage.getItem('users'))
            let id = clicked.getAttribute('data-id')
            // 3 xóa object với id clck ra khoải mảng
            let UsersRemoveById = users.filter(
                function(item) {
                    return item.id != id;
                        
                }
            )
            if( event.target.getAttribute('data-id') === buttonChangeUsers.getAttribute('data-id') ) {
                nameUsersChange.value = '';
                emailUsersChange.value = '';
                passwordUsersChange.value = '';
        
                buttonChangeUsers.innerText = 'Save';
                nameUsersChange.classList.remove('update');
                nameUsersChange.removeAttribute('data-id');
                

            }   
            localStorage.setItem('users',JSON.stringify(UsersRemoveById))
            renderDataUsers();
            }
         
      
    }
    
    else if(event.target.classList.contains('btn_edit')) {
        let indexEdit;
        let idEdit = event.target.getAttribute('data-id');
        let users = JSON.parse(localStorage.getItem('users'))
        for(i = 0; i < users.length; i++) {
            if(users[i].id  === event.target.getAttribute('data-id')) {
                indexEdit = i;
                break
            } 
        }
        nameUsersChange.value = users[indexEdit].name;
        emailUsersChange.value = users[indexEdit].email;
        passwordUsersChange.value = users[indexEdit].password;

        buttonChangeUsers.innerText = 'Update';
        buttonChangeUsers.classList.add('update');
        buttonChangeUsers.setAttribute('data-id', idEdit);
    }
}

// Kiêm tra form hợp lệ

function validateNameUsersChange() {
    let isValidateName = false;
    let valueNameUsersChange = nameUsersChange.value.trim();
    if(valueNameUsersChange === ''){
        showError(nameUsersChange, 'Tên không được để trống!!');
    } else {
        isValidateName = true;
        showSuccess(nameUsersChange);
    }
    // Thông báo name có validate thành công hay không
    return isValidateName;
}
function validateEmailUsersChange() {
    let isvalidateEmail = false;
    let valueEmail = emailUsersChange.value.trim();
    if(valueEmail === '') {
        showError(emailUsersChange, 'Email không được để trống!!');
    } else if(validRegex.test(valueEmail) === false) {
        showError(emailUsersChange, 'Email không đúng định dạng!!');
    }else {
        isvalidateEmail = true;
        showSuccess(emailUsersChange);
    }
    return isvalidateEmail;
}
function validatePasswordUsersChange() {
    let isvalidatePassword = false;
    let valuePassword = passwordUsersChange.value.trim();
    if(valuePassword === '') {
        showError(passwordUsersChange,'Password không được để trống!!');
    }  else  if(valuePassword.length < 8) {
        showError(passwordUsersChange, 'Password tối thiểu tám ký tự');
    } else if(validRegexPassword.test(valuePassword) === false) {
        showError(passwordUsersChange,'Password chứa chữ hoa, chữ thường, ký tự đặc biệt!!');
    }
    else {
        isvalidatePassword = true;
        showSuccess(passwordUsersChange);
    }
    return isvalidatePassword;
}





// 3. Nơi chạy hàm hoặc thêm addEventLisner

renderDataUsers()
buttonChangeUsers.addEventListener('click', handleSubmitFormUsers)
// Khi nhấn vào icon show hide password
tooglePasswordUsersChange.addEventListener('click', handleTooglePassUsersChange)
// Khi nhấn vào icon show hide confirm passwor
tbodyUsersChange.addEventListener('click', handleProcessUsersChange)

// 4.Bắt sự kiện keyup cho ô input name
nameUsersChange.addEventListener('keyup', validateNameUsersChange)
emailUsersChange.addEventListener('keyup', validateEmailUsersChange)
passwordUsersChange.addEventListener('keyup', validatePasswordUsersChange)

