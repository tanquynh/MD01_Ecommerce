// tbodyShopCart = document.querySelector('.table tbody')


// inputSelector = document.querySelector('.quantity')
// function showCartOfUser() {
//     let userIsLogginning = getUserLogin();
//     let cartOfuser = userIsLogginning.cart;
    


//     let htmlResult = ""
//     for(let i =0; i <cartOfuser.length; i++) {
//         let productCart = cartOfuser[i]
//         htmlResult = htmlResult + ` <tr>
//                                         <td><img src="${productCart.image}" alt="" class="table_img"></td>
//                                         <td><h3 class="table_title"> ${productCart.name}</h3>
//                                             <p class="table_description">
//                                             ${productCart.description}
//                                             </p>
//                                         </td>
//                                         <td><span class="table_price">${productCart.price}</span></td>
//                                         <td><input type="text"  name="quantity"  value ="${productCart.quantity}" title="Qty" class="qty" size="4"></td>
//                                         <td><span class="table_subtotal">${productCart.price * productCart.quantity} </span></td>
//                                         <td><i class="fa-solid fa-square-minus "></i></td>
//                                     </tr>`
//     }
//     tbodyShopCart.innerHTML = htmlResult
// }
// function handleProcessCart(event) {
//     let clicked = event.target
//     let valueInput = +inputSelector.value;
//     if(clicked.classList.contains('plus')) {
//         inputSelector.value = valueInput +1;
//     } else if(clicked.classList.contains('minus')) {
//         if(valueInput === 1) {
//             return;
//         }
//         inputSelector.value = valueInput -1
//     }
// }

// function totalMoneyCart() {
//     let userIsLogginning = getUserLogin() ;
//     let cartOfUser = userIsLogginning.cart;
//     let totalMoney = 0;
//     for(let i= 0; i< cartOfUser.length; i++) {
//         totalMoney = totalMoney + (cartOfUser[i].quantity * cartOfUser[i].price)
//     }
// }



// // Hiển thị table cart users
//  showCartOfUser()
//  tbodyShopCart.addEventListener('click', handleProcessCart)
// // Tính tổng tiền










