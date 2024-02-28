


// SỐ lượng sản phẩm trên 1 trang
const perPage = 8;
const paginationSelector = document.querySelector('.pagination_shop_show_products')
const paginationSelector1 = document.querySelector('.pagination_shop_show_products1')


function loadProductFeature(){
    // 1. Lấy tất cả sản phẩm ở localStorage
    let products = JSON.parse(localStorage.getItem('products'));
    let productFilterByType = products.filter((item) => item.type === 'Fearured');

    // Lấy 8 object
    let productFilterByTypeLimit = productFilterByType.slice(0, perPage);

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
        let totalPage = Math.ceil((productFilterByType.length) / perPage)

            let htmlPagination ='';
            for(let i = 1; i < totalPage + 1; i++) {
             
             htmlPagination = htmlPagination + `<li class="pagination_link ${ i === 1 ? 'active' : ''}">
             <a data-page=${i} data-category_id= "feattured" class="pagination_link" href="">${i}</a></li>`

        }
       
        paginationSelector.innerHTML = htmlPagination;

}


function handleClickPageCatrgoryFea(event) {
    event.preventDefault();
    let clicked =event.target;
   
    if(clicked.classList.contains('pagination_link')) {
        // input : lấy trang đang click
        let page = clicked.getAttribute('data-page')

        let products = JSON.parse(localStorage.getItem('products'));
        let productFilterByType = products.filter((item) => item.type === 'Fearured');
        let indexStart = (page - 1) * perPage;

        let indexEnd = page * perPage;
        let productFilterPaginationByPage = productFilterByType.slice(indexStart, indexEnd);

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
function loadProductPopular(){
    // 1. Lấy tất cả sản phẩm ở localStorage
    let products = JSON.parse(localStorage.getItem('products'));
    let productFilterByType = products.filter((item) => item.type === 'popular');

    // Lấy 8 object
    let productFilterByTypeLimit = productFilterByType.slice(0, perPage);

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
    document.querySelector('.product_item_popular_shop').innerHTML = resultHtml;
        // 7 Thực hiện hiển thị phân trnag
        // 7.1 Tính toán số lượng trang
        let totalPage = Math.ceil((productFilterByType.length) / perPage)

            let htmlPagination ='';
            for(let i = 1; i < totalPage + 1; i++) {
             
             htmlPagination = htmlPagination + `<li class="pagination_link ${ i === 1 ? 'active' : ''}">
             <a data-page=${i} data-category_id= "popular" class="pagination_link" href="">${i}</a></li>`

        }
       
        paginationSelector1.innerHTML = htmlPagination;

}


function handleClickPageCatrgoryPopular(event) {
    event.preventDefault();
    let clicked =event.target;
   
    if(clicked.classList.contains('pagination_link')) {
        // input : lấy trang đang click
        let page = clicked.getAttribute('data-page')

        let products = JSON.parse(localStorage.getItem('products'));
        let productFilterByType = products.filter((item) => item.type === 'popular');
        let indexStart = (page - 1) * perPage;

        let indexEnd = page * perPage;
        let productFilterPaginationByPage = productFilterByType.slice(indexStart, indexEnd);

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
   }  document.querySelector('.product_item_popular_shop').innerHTML = htmlResult
  
    } document.querySelectorAll('.pagination_shop_show_products1 .pagination_link').forEach(item => item.classList.remove('active'));
    clicked.closest('.pagination_link').classList.add('active');
}







function loadProductPopalar(){
    // 1. Lấy tất cả sản phẩm ở localStorage
    let products = JSON.parse(localStorage.getItem('products'));
    let productFilterByType = products.filter((item) => item.type === 'Popular');

    // Lấy 12 object
    let productFilterByTypeLimit = productFilterByType.slice(0, 8);

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
                                    <a href="" class="action_btn cart_btn" data-id = "0b5fca34-0818-4860-8607-a1cfb45c03a2" aria-label="Add to cart"><i class="fa-solid fa-cart-shopping"></i></a>
                            </div>
                        </div>
                   
                `;
        // đẩy html của mỗi item vào trong mảng
        resultHtmlArr.push(htmlItem);
    }

    // convert array to html
    let resultHtml = resultHtmlArr.join('');
    // đưa vào nội dung slider
    document.querySelector('.product_item_popular_shop').innerHTML = resultHtml;

}
function loadProductNewAdded(){
    // 1. Lấy tất cả sản phẩm ở localStorage
    let products = JSON.parse(localStorage.getItem('products'));
    let productFilterByType = products.filter((item) => item.type === 'new_added');

    // Lấy 8 object
    let productFilterByTypeLimit = productFilterByType.slice(0, 8);

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
                                    <a href="" class="action_btn cart_btn" data-id = "0b5fca34-0818-4860-8607-a1cfb45c03a2" aria-label="Add to cart"><i class="fa-solid fa-cart-shopping"></i></a>
                            </div>
                        </div>
                   
                `;
        // đẩy html của mỗi item vào trong mảng
        resultHtmlArr.push(htmlItem);
    }

    // convert array to html
    let resultHtml = resultHtmlArr.join('');
    // đưa vào nội dung slider
    document.querySelector('.product_item_new_added_shop').innerHTML = resultHtml;

}
function loadProductNewArrival(){
    // 1. Lấy tất cả sản phẩm ở localStorage
    let products = JSON.parse(localStorage.getItem('products'));
    let productFilterByType = products.filter((item) => item.type === 'new_arrival');

    // Lấy 12 object
    let productFilterByTypeLimit = productFilterByType.slice(0);

    // 2. Xây dựng html
    let resultHtmlArr = [];
    for(let i = 0; i < productFilterByTypeLimit.length; i++) {
        let productItem = productFilterByTypeLimit[i];
        let htmlItem = `  
                            <div class="product_item swiper-slide">
                            <div class="product_banner">
                            <a href="detail.html?id=${productItem.id}" class="product_images">
                                <img src="${productItem.Image}" alt="" class="product_img default">
                                <img src="${productItem.ImageTwo}" alt="" class="product_img hover">
                            </a>
                            <div class="product_actions">
                                <a href="" class="action_btn" aria-label="Quick View">
                                    <i class="fi fi-rr-eye"></i>
                                </a>
                                <a href="" class="action_btn" aria-label="Add to Wishlist">
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
                            <span class="new_price">${productItem.price}</span> 
                            <span class="old_price">$245.85</span>
                        </div>
                            <a href="#" class="action_btn cart_btn" aria-label="Add to cart"><i class="fa-solid fa-cart-shopping"></i></a>
                        </div>
                        </div>
                   
                `;
        // đẩy html của mỗi item vào trong mảng
        resultHtmlArr.push(htmlItem);
    }

    // convert array to html
    let resultHtml = resultHtmlArr.join('');
    // đưa vào nội dung slider
    document.querySelector('.product_item_new_arrival_shop').innerHTML = resultHtml;

}

// // 3. add event
// // hàm show dữ liệu sản phẩm nổi bật
loadProductFeature();
loadProductPopalar();
loadProductNewAdded();
loadProductNewArrival()
paginationSelector.addEventListener('click', handleClickPageCatrgoryFea)
document.querySelector('.pagination_shop_show_products').addEventListener('click', handleClickPageCatrgoryFea)
