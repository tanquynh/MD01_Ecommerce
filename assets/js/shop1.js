let perPage = 8;
const paginationSelector = document.querySelector('.pagination_shop_show_products')
let submitSelector = document.querySelector('.search_my_acount_product');
let list = document.getElementById('list');
let filter = document.querySelector('.filter');
let count = document.getElementById('count');



function loadProducproduct(){
    // 1. Lấy tất cả sản phẩm ở localStorage
    let products = JSON.parse(localStorage.getItem('products'));


    // Lấy 8 object
    let productFilterByTypeLimit = products.slice(0, perPage);

    // 2. Xây dựng html
    let resultHtmlArr = [];
    for(let i = 0; i < productFilterByTypeLimit.length; i++) {
        let productItem = productFilterByTypeLimit[i];
        let htmlItem = `                  
                            <div class="product_item">
                            <div class="product_banner">
                                <a href="detail.html?id=${productItem.id}" class="product_images">
                                    <img src="${productItem.Image}" alt="" class="product_img default">
                                    <img src="${productItem.ImageTwo} " alt="" class="product_img hover">
                                </a>
                                <div class="product_actions">
                                    <a href="" class="action_btn" aria-label="Quick View">
                                        <i class="fi fi-rr-eye"></i>
                                    </a>
                                    <a href="" class="action_btn btn_wishlist" aria-label="Add to Wishlist">
                                        <i class="fi fi-rr-heart"></i>
                                    </a>
                                    <a href="" class="action_btn" aria-label="Compare">
                                        <i class="fi fi-rr-shuffle"></i>
                                    </a>
                                </div>
                                <div class="product_badge light_green">Hot</div>
                            </div>

                            <div class="product_content">
                                <span class="product_category">Clothing</span>
                                <a href="detail.html?id=${productItem.id}">
                                    <h3 class="product_title">${productItem.name}</h3>
                                </a>
                                <div class="product_rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <div class="product_price flex">
                                    <span class="new_price">$${productItem.price}</span> 
                                    <span class="old_price">$145.85</span>
                                </div>
                                    <a href="" class="action_btn cart_btn" data-id = "${productItem.id}" aria-label="Add to cart"><i class="fa-solid fa-cart-shopping"></i></a>
                            </div>
                        </div>
                   
                `;
        // đẩy html của mỗi item vào trong mảng
        resultHtmlArr.push(htmlItem);
    }

    // convert array to html
    let resultHtml = resultHtmlArr.join('');
    // đưa vào nội dung slider
    document.querySelector('.product_item_feattured_shop').innerHTML = resultHtml;
        // 7 Thực hiện hiển thị phân trnag
        // 7.1 Tính toán số lượng trang
        let totalPage = Math.ceil((products.length) / perPage)

            let htmlPagination ='';
            for(let i = 1; i < totalPage + 1; i++) {
             
             htmlPagination = htmlPagination + `<li class="pagination_link ${ i === 1 ? 'active' : ''}">
             <a data-page=${i}  class="pagination_link" href="">${i}</a></li>`

        }
       
        document.querySelector('.pagination_shop_show_products').innerHTML = htmlPagination;

}
function handleClickPageCatrgoryFea(event) {
    event.preventDefault();
    let clicked = event.target;
    if(clicked.classList.contains('pagination_link')) {
        // input : lấy trang đang click
        let page = clicked.getAttribute('data-page')

        let products = JSON.parse(localStorage.getItem('products'));
        let indexStart = (page - 1) * perPage;
        let indexEnd = page * perPage;
        let productFilterPaginationByPage = products.slice(indexStart, indexEnd);

        // tạo html
        let htmlResult=[];
        for(let i = 0 ; i < productFilterPaginationByPage.length ; i++) {
            let productItem = productFilterPaginationByPage[i]

    htmlResult = htmlResult +  `   <div class="product_item">
                                        <div class="product_banner">
                                            <a href="detail.html?id=${productItem.id}" class="product_images">
                                                <img src="${productItem.Image}" alt="" class="product_img default">
                                                <img src="${productItem.ImageTwo} " alt="" class="product_img hover">
                                            </a>
                                            <div class="product_actions">
                                                <a href="" class="action_btn" aria-label="Quick View">
                                                    <i class="fi fi-rr-eye"></i>
                                                </a>
                                                <a href="" class="action_btn btn_wishlist" aria-label="Add to Wishlist">
                                                    <i class="fi fi-rr-heart"></i>
                                                </a>
                                                <a href="" class="action_btn" aria-label="Compare">
                                                    <i class="fi fi-rr-shuffle"></i>
                                                </a>
                                            </div>
                                            <div class="product_badge light_green">Hot</div>
                                        </div>

                                        <div class="product_content">
                                            <span class="product_category">Clothing</span>
                                            <a href="detail.html?id=${productItem.id}">
                                                <h3 class="product_title">${productItem.name}</h3>
                                            </a>
                                            <div class="product_rating">
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                            </div>
                                            <div class="product_price flex">
                                                <span class="new_price">$${productItem.price}</span> 
                                                <span class="old_price">$145.85</span>
                                            </div>
                                                <a href="" class="action_btn cart_btn" data-id = "${productItem.id}" aria-label="Add to cart"><i class="fa-solid fa-cart-shopping"></i></a>
                                        </div>
                                    </div> `
   }  document.querySelector('.product_item_feattured_shop').innerHTML = htmlResult
  
    } document.querySelectorAll('.pagination_shop_show_products .pagination_link').forEach(item => item.classList.remove('active'));
    clicked.closest('.pagination_link').classList.add('active');
}

function showCategoryInit1() {
    //1. Lấy tất cả category từ local
    let categorys1 = JSON.parse(localStorage.getItem('categories'));
    // tạo ra các Option
    let resultOptionHtml = '<option value="">Chọn danh mục</option>';
                                for(let i = 0; i < categorys1.length; i++) {
                                    let categoryItem = categorys1[i];
                                    resultOptionHtml += `<option value="${categoryItem.id}">${categoryItem.name}</option>`
                                }
                                document.querySelector('.form_category_select_search_item').innerHTML = resultOptionHtml;
                            
}
filter.addEventListener('submit', function(event){
    event.preventDefault();
    let valueFilter = event.target.elements;
 
    
    productFilter = JSON.parse(localStorage.getItem('products')).filter(item => {
        // check category
        if(valueFilter.category.value != ''){
            if(!item.category.includes(valueFilter.category.value) ){
                return false;
            }
        }
       
     
        // check item
        if(valueFilter.Style.value != ''){
            if(!item.type.includes(valueFilter.Style.value)){
                return false;
            }
        }
        // check name
        if(valueFilter.name.value != ''){
            if(!item.name.includes(valueFilter.name.value)){
                return false;
            }
        }
        // check min price
        if(valueFilter.minPrice.value != ''){
            if(Number(item.price) < valueFilter.minPrice.value){
                return false;
            }
        }
        //  check max price
        if(valueFilter.maxPrice.value != ''){
            if(Number(item.price) > valueFilter.maxPrice.value){
                return false;
            }
        }
        return true;
        
    })
    

    let productFilterByTypeLimit = productFilter.slice(0, perPage);
    let resultHtmlArr = [];
    for(let i = 0; i < productFilterByTypeLimit.length; i++) {
        let productItem = productFilterByTypeLimit[i];
        let htmlItem = `                  
                            <div class="product_item">
                            <div class="product_banner">
                                <a href="detail.html?id=${productItem.id}" class="product_images">
                                    <img src="${productItem.Image}" alt="" class="product_img default">
                                    <img src="${productItem.ImageTwo} " alt="" class="product_img hover">
                                </a>
                                <div class="product_actions">
                                    <a href="" class="action_btn" aria-label="Quick View">
                                        <i class="fi fi-rr-eye"></i>
                                    </a>
                                    <a href="" class="action_btn btn_wishlist" aria-label="Add to Wishlist">
                                        <i class="fi fi-rr-heart"></i>
                                    </a>
                                    <a href="" class="action_btn" aria-label="Compare">
                                        <i class="fi fi-rr-shuffle"></i>
                                    </a>
                                </div>
                                <div class="product_badge light_green">Hot</div>
                            </div>

                            <div class="product_content">
                                <span class="product_category">Clothing</span>
                                <a href="detail.html?id=${productItem.id}">
                                    <h3 class="product_title">${productItem.name}</h3>
                                </a>
                                <div class="product_rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <div class="product_price flex">
                                    <span class="new_price">$${productItem.price}</span> 
                                    <span class="old_price">$145.85</span>
                                </div>
                                    <a href="" class="action_btn cart_btn" data-id = "${productItem.id}" aria-label="Add to cart"><i class="fa-solid fa-cart-shopping"></i></a>
                            </div>
                        </div>
                   
                `;
        // đẩy html của mỗi item vào trong mảng
        resultHtmlArr.push(htmlItem);
    }

    // convert array to html
    let resultHtml = resultHtmlArr.join('');
    // đưa vào nội dung slider
    document.querySelector('.product_item_feattured_shop').innerHTML = resultHtml;
        // 7 Thực hiện hiển thị phân trnag
        // 7.1 Tính toán số lượng trang
        let totalPage = Math.ceil((productFilter.length) / perPage)

            let htmlPagination ='';
            for(let i = 1; i < totalPage + 1; i++) {
             
             htmlPagination = htmlPagination + `<li class="pagination_link ${ i === 1 ? 'active' : ''}">
             <a data-page=${i}  class="pagination_link" href="">${i}</a></li>`

        }
       
        document.querySelector('.pagination_shop_show_products').innerHTML = htmlPagination;

        // function handleClickPageCatrgoryFea() {

      
        // if(clicked.classList.contains('pagination_link')) {
        //     // input : lấy trang đang click
        //     let page = clicked.getAttribute('data-page')
        //         let indexStart = (page - 1) * perPage;
        //         let indexEnd = page * perPage;
        //         let productFilterPaginationByPage = productFilter.slice(indexStart, indexEnd);
        
        //         // tạo html
        //         let htmlResult=[];
        //         for(let i = 0 ; i < productFilterPaginationByPage.length ; i++) {
        //             let productItem = productFilterPaginationByPage[i]
        
        //     htmlResult = htmlResult +  `   <div class="product_item">
        //                                         <div class="product_banner">
        //                                             <a href="detail.html?id=${productItem.id}" class="product_images">
        //                                                 <img src="${productItem.Image}" alt="" class="product_img default">
        //                                                 <img src="${productItem.ImageTwo} " alt="" class="product_img hover">
        //                                             </a>
        //                                             <div class="product_actions">
        //                                                 <a href="" class="action_btn" aria-label="Quick View">
        //                                                     <i class="fi fi-rr-eye"></i>
        //                                                 </a>
        //                                                 <a href="" class="action_btn btn_wishlist" aria-label="Add to Wishlist">
        //                                                     <i class="fi fi-rr-heart"></i>
        //                                                 </a>
        //                                                 <a href="" class="action_btn" aria-label="Compare">
        //                                                     <i class="fi fi-rr-shuffle"></i>
        //                                                 </a>
        //                                             </div>
        //                                             <div class="product_badge light_green">Hot</div>
        //                                         </div>
        
        //                                         <div class="product_content">
        //                                             <span class="product_category">Clothing</span>
        //                                             <a href="detail.html?id=${productItem.id}">
        //                                                 <h3 class="product_title">${productItem.name}</h3>
        //                                             </a>
        //                                             <div class="product_rating">
        //                                                 <i class="fa-solid fa-star"></i>
        //                                                 <i class="fa-solid fa-star"></i>
        //                                                 <i class="fa-solid fa-star"></i>
        //                                                 <i class="fa-solid fa-star"></i>
        //                                                 <i class="fa-solid fa-star"></i>
        //                                             </div>
        //                                             <div class="product_price flex">
        //                                                 <span class="new_price">$${productItem.price}</span> 
        //                                                 <span class="old_price">$145.85</span>
        //                                             </div>
        //                                                 <a href="" class="action_btn cart_btn" data-id = "${productItem.id}" aria-label="Add to cart"><i class="fa-solid fa-cart-shopping"></i></a>
        //                                         </div>
        //                                     </div> `
        //    }  document.querySelector('.product_item_feattured_shop').innerHTML = htmlResult
            
        // }
        //     document.querySelectorAll('.pagination_shop_show_products .pagination_link').forEach(item => item.classList.remove('active'));
        //     clicked.closest('.pagination_link').classList.add('active');
        // }
})







showCategoryInit1()
document.querySelector('.pagination_shop_show_products').addEventListener('click', handleClickPageCatrgoryFea);
// paginationSelector.addEventListener('click', handleClickPageCatrgoryFea)
loadProducproduct()