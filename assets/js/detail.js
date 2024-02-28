let submitCommentDetailSelector = document.querySelector('.detail_submit_comment');
let messageCommentDetailSelector = document.querySelector('.detail_comment');


function showProductDetail() {
    // 1 lấy ra id sản phẩm
    const queryString = window.location.search;
    // tách chuỗi mãng
    const arrParam = queryString.split('=');
    // lấy ra id
    const idProduct = arrParam[1];
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products.find(item => item.id === idProduct);
    //Thay đổi thông tin theo detail
       // show image
       document.querySelector('.details_group1 img').setAttribute('src', product.Image);
       document.querySelector('.details_group2 .details_title').innerText = product.name;
       document.querySelector('.details_group2 .details_price span').innerText = '$' + product.price;
       document.querySelector('.details_group2 .short_description').innerText = product.descriptions;
}
showProductDetail()


// function showProductRealative() {
//     const queryString = window.location.search;
//     const arrParam = queryString.split('=');
//     const idProduct = arrParam[1];
//     // lấy ra sản phẩm
//     const products = JSON.parse(localStorage.getItem('products'));
//     const product = products.find(item => item.id === idProduct);
//     const categoryId = product.category;

//     const productRelative = products.filter(function (item) {
//         if (item.category === categoryId && item.id !== idProduct) {
//             return true;
//         } else {
//             return false;
//         }
//     });

//     let htmlResult = '';
//     productRelative.forEach(function (productItem) {
//         htmlResult = htmlResult + `<div class="details_group details_group1">
//                                         <img src="${productItem.Image}" alt="" class="details_img">
//                                     </div>

//                                     <div class="details_group details_group2">
//                                         <h3 class="details_title">${productItem.name}</h3>
//                                         <p class="details_brand">Brands: <span>Adidas</span></p>
//                                         <div class="details_price flex">
//                                             <span class="new_price">${productItem.price}</span>
//                                             <span class="old_price">$200.00</span>
//                                             <span class="save_price">25%  Off</span>
//                                         </div>
//                                         <p class="short_description">
//                                         ${productItem.descriptions}
//                                         </p>
//                                         <ul class="product_list">
//                                             <li class="list_item flex">
//                                                 <i class="fa-sharp fa-regular fa-crown"></i> 1 Year Al Jazeera Brand Warranty
//                                             </li>
//                                             <li class="list_item flex">
//                                                 <i class="fa-solid fa-rotate"></i> 30 Day return Policy
//                                             </li>
                                        
//                                             <li class="list_item flex">
//                                                 <i class="fa-regular fa-credit-card"></i> Cash on Delivery available
//                                             </li>
//                                         </ul>

//                                         <div class="details_color flex">
//                                             <span class="details_color_title">Color</span>
//                                             <ul class="color_list">
//                                                 <li><a href="#" class="color_link" style="background-color: hsl(37, 100%, 65%);"></a></li>
//                                                 <li><a href="#" class="color_link" style="background-color: hsl(353, 100%, 65%);"></a></li>
//                                                 <li><a href="#" class="color_link" style="background-color: hsl(49, 100%, 65%);"></a></li>
//                                                 <li><a href="#" class="color_link" style="background-color: hsl(304, 100%, 78%);"></a></li>
//                                                 <li><a href="#" class="color_link" style="background-color: hsl(126, 61%, 52%);"></a></li>
//                                             </ul>
//                                         </div>

//                                         <div class="details_size flex">
//                                             <span class="details_size_title">Size</span>
//                                             <ul class="size_list">
//                                                 <li><a href="#" class="size_link size_active" >M</a></li>
//                                                 <li><a href="#" class="size_link" >L</a></li>
//                                                 <li><a href="#" class="size_link" >XL</a></li>
//                                                 <li><a href="#" class="size_link" >XXL</a></li>

//                                             </ul>
//                                         </div>
//                                         <div class="details_action">
//                                             <input type="number" class="quantity" value = '3'>
//                                             <a href="#" class="btn btn_sm">Add to cart</a>
//                                             <a href="#" class="details_action_btn"><i class="fa-regular fa-heart"></i></a>
//                                         </div>
//                                         <ul class="details_meta">
//                                             <li class="meta_list flex"><span>SKU:</span> FWM15VKT</li>
//                                             <li class="meta_list flex"><span>Tag:</span> Cloth, Women, Dress</li>
//                                             <li class="meta_list flex"><span>Availability</span> 8 Item In Stock</li>
//                                         </ul>
//                                     </div>`;
//     });


//     document.querySelector('.details_container_product').innerHTML = htmlResult;
// }





// function handleSubmitCommentDetail() {
//     const queryString = window.location.search;
//     // tách chuỗi mãng
//     const arrParam = queryString.split('=');
//     // lấy ra id
//     const idProduct = arrParam[1];
//     let commentDetail;
//     let commentDataUeser
//     let valueCommentMessDetail = messageCommentDetailSelector.value.trim();
//     if(localStorage.getItem('commentDetail') === null) {
//         commentDetail = [];
       
//     } else {
//         commentDetail=JSON.parse(localStorage.getItem('commentDetail'))
//     }
//     let users = JSON.parse(localStorage.getItem('users'))
//     let nameActive;
//     let emailActive;
//     for(let i = 0; i < users.length; i++) {
//         if(users[i].status === "active") {
//             nameActive = users[i].name;
//             emailActive = users[i].email;
//             break
//         }
//     }
//     let objNewCommentDetail = {
//         id: crypto.randomUUID(),
//         id_detail: idProduct,
//         name: nameActive,
//         email : emailActive,
//         comment: valueCommentMessDetail
//     }
  
   
//     // Thêm users vào mảng đã có sẵn
//     commentDetail.push(objNewCommentDetail)
//     // lưu vào local Storage
//     localStorage.setItem('commentDetail', JSON.stringify(commentDetail));

//     renderDataProductDetail();
   
// }
// function  renderDataProductDetail() {
//     let commentDetail =JSON.parse(localStorage.getItem('commentDetail'));

//     if(commentDetail !== null) {
//         let commnetResult;
//     for(let i = 0; i < commentDetail.length; i++) {
//                 commnetResult = `  <div>
//                                         <img src="assets/img/avatar-2.jpg" alt="" class="review_img">
//                                         <h4 class="review_title">${commentDetail[i].name}</h4>
//                                     </div>                        
//                                         <p class="review_description">
//                                         ${commentDetail[i].comment}
//                                         </p>
//                                         <span class="review_date">${Date.now()}</span>
//                                     </div>
//                                     ` +   commnetResult
//             document.querySelector('.review_single_cmt_detail').innerHTML = commnetResult
//         }
//     }
// }
// function handleAddComment(event) {
//     event.preventDefault();
//     let valueCommentMess = submitCommentDetailSelector.value.trim();
//     let   isValidForm = false;
//     if(valueCommentMess === '') {
//         let mesageInput = document.querySelector('.error_message');
//        mesageInput.innerText = 'Comment không được để trống!!';
//        document.querySelector('.form_comment').closest('.form_comment').classList.add('form-group_error');
//     } else {
//         isValidForm = true
//         let mesageInput = document.querySelector('.error_message');
//        mesageInput.innerText = '';
//        document.querySelector('.form_comment').closest('.form_comment').classList.remove('form-group_error');
      
//     }
//     if( isValidForm = true) {
       
//         handlesubmitComment() 
//     }
//     messageCommentSelector.value='';
   
// }











// submitCommentDetailSelector.addEventListener('click',handleSubmitCommentDetail)
showProductDetail()