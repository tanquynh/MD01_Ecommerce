/// Add category trang chu
function showCategory() {
  // 1. lấy hết danh mục từ local Storage
  let catagoties = JSON.parse(localStorage.getItem("categories"));

  // 2. Xây dựng cấu trúc html cho catelogy
  let resultCate = "";
  //   for (let i = 0; i < catagoties.length; i++) {
  //     let catagotiesItem = catagoties[i];
  //     resultCate =
  //       resultCate +
  //       `<a href="shop1.html" class="category_item swiper-slide" data-category_id = "1">
  //                                         <img src="assets/img/category-1.jpg" alt="" class="category_img">
  //                                         <h3 class="category_title">"111"s</h3>
  //                                     </a>`;
  //   }
  resultCate =
    `<a href="shop1.html" class="category_item swiper-slide" data-category_id = "1">
<img src="assets/img/category-1.jpg" alt="" class="category_img">
<h3 class="category_title">"111"s</h3> 
</a>` +
    `<a href="shop1.html" class="category_item swiper-slide" data-category_id = "1">
<img src="assets/img/category-2.jpg" alt="" class="category_img">
<h3 class="category_title">"111"s</h3> 
</a>`;
  document.querySelector(".category_show").innerHTML = resultCate;
}

//3. Gọi hàm + add event
// Load danh mục từ local khi trang load lần đầu
showCategory();
