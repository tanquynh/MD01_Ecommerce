const mainContentSelextor = document.querySelector('.main_content')


function getgetUserlogin() {

}



function handleAddCart() {
    Event.preventDefault();
    let clicked = event.target;
    let aClicked = clicked.closet('btn_wishlist');
    if(aClicked) {
        let userIsLogginning = getUserLogin() 
        if(!userIsLogginning) {
            window.location.href = './login.html';
        }
    }


}



mainContentSelextor.addEventListener('click', handleAddCart)































// let wishlist = []
// document.querySelectorAll('.btn_wishlist').forEach((wishlist) => {
//     wishlist.addEventListener('click', () => {
//         const productId = carts.dataset.productId;

//         let mathchingItem;
//         cart.forEach((item) => {
//             if(productId === item.productId) {
//                 mathchingItem = item;
//             }
//         });

//         if(mathchingItem) {
//             mathchingItem.quantily += 1;
//         } else {
//             cart.push({
//                 productId: productId,
//                 quantily: 1
//             })
//         }
//         let wishlistQuantily = 0;
//         wishlist.forEach((item) => {
//             wishlistQuantily += item.quantily;
//         document.querySelector('.wishlist').innerHTML = wishlistQuantily
//       });
//       console.log(wishlist)
//     })  
// });
