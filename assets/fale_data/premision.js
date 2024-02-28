// function createUserAdmin() {
//     // lấy dữ liệu users từ localStorage
//     let users = JSON.parse(localStorage.getItem('users')) || [];
//     // Thực hiện update user cũ và thêm users admin mới
//     let userAdmin = {
//         id:crypto.randomUUID(),
//         name: 'Admin',
//         email: 'admin@gmail.com',
//         password: 'Quynh1234@',
//         status: '',
//         role: 'admin',
       
//     }
//      // Tạo ra mãng mới gồm dữ liệu users cũ + user admin
//      let userAll = [...users, userAdmin]
//      console.log(userAll)
//     //3, Cập nhật role cho user thông thường
//     let usersEndUpdate = userAll.map(
//         function(item) {
//             if(item.role === 'admin') {
//                 return item;
//             } else {
//                 item.role = 'regular'
//                 return item
//             }
//         }
//     )
//     // 4. Cập nhật lại localStorage
//    let userAdminExit = users.find(item => item.role === 'admin')
//    if(!userAdminExit) {
//     localStorage.setItem('users', JSON.stringify(usersEndUpdate))
//    }
   


// }







// // Tạo users Admin
// // role admin -- role: reguler
// createUserAdmin() 



// nếu là user thông thường ẩn  product, category, user order

function hideManagementIfUserRegular() {
    let users = JSON.parse(localStorage.getItem('users'))
    let userLoggin = users.find(item => item.status === 'active')
    if(userLoggin.role !== 'admin') {
        document.querySelector('.dashboard_myacount').remove()
        document.querySelector('.users_myacount').remove()
        document.querySelector('.update_profile_myacount').remove()
       document.querySelector('.table_content_hide_table').remove()
       
    }
    }
   







hideManagementIfUserRegular()