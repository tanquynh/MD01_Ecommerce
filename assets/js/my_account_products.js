// 1.Nơi lưu trữ các biên queruSelector
const buttonProductsSave = document.querySelector('.btn_save_products');
const nameProductSelector = document.querySelector('.name_products');
const priceProductSelector = document.querySelector('.price_products');
const imageProductSelector = document.querySelector('.image_products');
const imageTwoProductSelector = document.querySelector('.image_two_products');
const descriptionProductSelector = document.querySelector('.description');
const tbodyProductSelector = document.querySelector('.product_table_show');
const categorySelector =document.querySelector('.form_category_select')
const categorySelector1 =document.querySelector('.form_category_select1')
const searchProductMyAcountSelector = document.querySelector('.search_my_acount_product')
const formProducthide = document.querySelector('.form_my_account_product')
const showHideProduct =document.querySelector('.btn_show_hide_product')
const sortNameMyAcountProduct =document.querySelector('.sort_name_my_acount_product')
const searchNameMyAcount = document.querySelector('.nameInputMyAcount');

let list = document.getElementById('list');
let filter = document.querySelector('.filter');
let count = document.getElementById('count');


// 2. Nơi khai báo hàm
function handleAddproduct() {
    // ngăn submit form 
    event.preventDefault();
    let isValiform = true;
    // 1. validate theo yêu cầu
    let valueName = nameProductSelector.value.trim();
    let valuePrice = priceProductSelector.value.trim();
    let valueImage = imageProductSelector.value.trim();
    let valueImageTwo = imageTwoProductSelector.value.trim();
    let valueDescription = descriptionProductSelector.value.trim();

    let divError = nameProductSelector.nextElementSibling;
    //ktra biến name là rỗng thì hiển thị lỗi
    if(valueName === '') {
        nameProductSelector.classList.add('error');
        divError.innerText = 'Tên không được để trống'
        isValiform = false;
    } else {
        nameProductSelector.classList.remove('error')
        divError.innerText = ''
    }
    
    
    // 2. validate giá
    let divErrorPrice = priceProductSelector.nextElementSibling;
    //ktra biến name là rỗng thì hiển thị lỗi


        if(valuePrice === '') {
            priceProductSelector.classList.add('error');
            divErrorPrice.innerText = 'Giá không được để trống'
            isValiform = false;
        } else if(isNaN(valuePrice) || valuePrice < 0){
            priceProductSelector.classList.add('error');
            divErrorPrice.innerText = 'Xin hãy nhập đúng số tiền'
            isValiform = false;
        } else {
            priceProductSelector.classList.remove('error')
            divErrorPrice.innerText = ''
        }

    // 3. validate image
    let divErrorImage = imageProductSelector.nextElementSibling;
    //ktra biến name là rỗng thì hiển thị lỗi
    if(valueImage === '') {
        imageProductSelector.classList.add('error');
        divErrorImage.innerText = 'Ảnh không được để trống'
        isValiform = false;
    } else {
        imageProductSelector.classList.remove('error')
        divErrorImage.innerText = ''
    }
    // 4. validate dicaption
    let divErrorDescription = descriptionProductSelector.nextElementSibling;
    //ktra biến name là rỗng thì hiển thị lỗi
    if(valueDescription === '') {
        descriptionProductSelector.classList.add('error');
        divErrorDescription.innerText = 'mô tả không được để trống'
        isValiform = false;
    } else {
        descriptionProductSelector.classList.remove('error')
        divErrorDescription.innerText = ''
    }
    // Kiêm tra form hợp lệ
    if(isValiform) {
        let clicked =event.target;
        if(clicked.classList.contains('update')) {
            let idUpdate = clicked.getAttribute('data-id')
            handleUpdateForm(idUpdate) 
        } else {
            handleSubmitForm() 
        
        }


    }
    // reset lại form
    document.querySelector('.form_my_account_product').reset();
}
function handleUpdateForm(idUpdate) {
    let products = JSON.parse(localStorage.getItem('products'));
    let indexUpdate = products.findIndex (
        function(item) {
            if(item.id === idUpdate) {
                return true
            } else {
                return false
            }
        }
    )
   
    products[indexUpdate].name = nameProductSelector.value
    products[indexUpdate].Image = imageProductSelector.value;
    products[indexUpdate].price = priceProductSelector.value;
    products[indexUpdate].ImageTwo =imageTwoProductSelector.value
    products[indexUpdate].descriptions = descriptionProductSelector.value;
    products[indexUpdate].category = categorySelector1.value;
    // Lấy value typpe do người dùng chọn
    let valueType = document.querySelector('.type_product:checked').value
    products[indexUpdate].type = valueType;
    localStorage.setItem('products',JSON.stringify(products))
    renderDataProduct() 
    buttonProductsSave.innerText = 'Save'
    buttonProductsSave.classList.remove('update');
    buttonProductsSave.removeAttribute('data-id')
    
}

 // Nếu data hợp lệ thì thực thi hàm này
function handleSubmitForm() {
    
    let valueName = nameProductSelector.value.trim();
    let valuePrice = priceProductSelector.value.trim();
    let valueImage = imageProductSelector.value.trim();
    let valueImageTwo = imageTwoProductSelector.value.trim();
    let valueDescription = descriptionProductSelector.value.trim();

    let valueType = document.querySelector('.type_product:checked').value
    // lấy value select7
    let ValueCategory = categorySelector1.value

    // Khi chưa có dữ liệu local Storage chúng ta tạo mảng rỗng
    // Khi có dữ liệu thì chúng ta phải lấy về và đẩy thêm dữ liệu
    let products;
    if(localStorage.getItem('products') === null) {
    products = []
    
    } else {
    products = JSON.parse(localStorage.getItem('products'))
    }
    let newProduct = {
        id: crypto.randomUUID(),
        name: valueName,
        price: valuePrice,
        Image: valueImage,
        ImageTwo: valueImageTwo,
        descriptions: valueDescription,
        type: valueType,
        category: ValueCategory
    }
    products.push(newProduct)
    //    lưu data vào local Storage khi load vào trang không mất dữ liệu
    localStorage.setItem('products', JSON.stringify(products));
    // Hiển thị dư liệu ở localStorage ra table
    renderDataProduct() 
}

function renderDataProduct() {
    let products = JSON.parse(localStorage.getItem('products'));
    if(products) {
        let productResult = ``
        for(let i = 0; i < products.length; i++) {
            productResult += ` <tr>
                                    <td>${products[i].name}</td>
                                    <td>${products[i].price}</td>
                                    <td><img src="${products[i].Image}" alt=""></td>
                                    <td>${products[i].type}</td>
                                    <td>
                                        <button data-id = "${products[i].id}"class ="btn_edit btn_common">Edit</button>
                                        <button data-id = "${products[i].id}" class ="btn_delete btn_common">Delete</button>
                                    </td>
                                </tr>`
            
        }
        tbodyProductSelector.innerHTML = productResult

    }
   
}
function handleProcessMyAcount(event) {
    let clicked = event.target;
    if(clicked.classList.contains('btn_delete')) {
    if(confirm('Bạn chắc chắn muốn xóa sản phẩm?')) {  
        let products = JSON.parse(localStorage.getItem('products'))
    // Tìm id cần xóa trong object
   
    let id = clicked.getAttribute('data-id')
    console.log(id)
    // 3 xóa object với id clck ra khoải mảng
    let productsRemoveById = products.filter(
        function(item) {
            return item.id != id;
                
        }
    )

   // 4. cập nhật lại vào localStorage
   localStorage.setItem('products',JSON.stringify(productsRemoveById))
   if( event.target.getAttribute('data-id') === buttonProductsSave.getAttribute('data-id') ) {
    document.querySelector('form').reset();
    buttonProductsSave.innerText = 'Lưu lại';
    buttonProductsSave.classList.remove('update');
    buttonProductsSave.removeAttribute('data-id');
   localStorage.setItem('products',JSON.stringify(productsRemoveById))

}

   // 5. render lại danh sách sản phẩm theo local Storage
   renderDataProduct()
 
    } }
    if(clicked.classList.contains('btn_edit')) {
    let products = JSON.parse(localStorage.getItem('products'))
    // Tìm id cần xóa trong object
   
    let id = clicked.getAttribute('data-id')
    // 3 xóa object với id click ra khỏi mảng
    let productsEditById = products.find(
        function(item) {
            if(item.id === id) {
                return true
            } else {
                return false
            }
                
        }
    )

   // đưa giữ liệu object vào input
    nameProductSelector.value = productsEditById.name;
    priceProductSelector.value =productsEditById.price;
    imageProductSelector.value = productsEditById.Image;
    imageTwoProductSelector.value = productsEditById.ImageTwo;
    descriptionProductSelector.value = productsEditById.descriptions;
    let valueTypeEditing = productsEditById.type
    
    if (valueTypeEditing) {
        document.querySelector(`input[value=${valueTypeEditing}]`).checked = true;
    } else {
        document.querySelector(`input[value=new_arrival]`).checked = true;
    }
        // Thêm trạng thái vào nut save để biết update hay add
        categorySelector1.value = productsEditById.category
        buttonProductsSave.classList.add('update');
        buttonProductsSave.innerText = 'Update'
        buttonProductsSave.setAttribute('data-id', id)
       
    }
 
}
// function showCategoryInit() {
//     //1. Lấy tất cả category từ local
//     let categorys = JSON.parse(localStorage.getItem('categories'));
//     // tạo ra các Option
//     let resultOptionHtml = '<option value="">Chọn danh mục</option>';
//                                 for(let i = 0; i < categorys.length; i++) {
//                                     let categoryItem = categorys[i];
//                                     resultOptionHtml += `<option value="${categoryItem.id}">${categoryItem.name}</option>`
//                                 }
//                                 categorySelector.innerHTML = resultOptionHtml;
// }
function showCategoryInit1() {
    //1. Lấy tất cả category từ local
    let categorys1 = JSON.parse(localStorage.getItem('categories'));
    // tạo ra các Option
    let resultOptionHtml = '<option value="">Chọn danh mục</option>';
                                for(let i = 0; i < categorys1.length; i++) {
                                    let categoryItem = categorys1[i];
                                    resultOptionHtml += `<option value="${categoryItem.id}">${categoryItem.name}</option>`
                                }
                                categorySelector1.innerHTML = resultOptionHtml;
                                categorySelector.innerHTML = resultOptionHtml;
}


function showHideProductItem(event) {
    let typePass = showHideProduct.getAttribute('type');
    if(typePass === 'text') {
        showHideProduct.setAttribute('type', 'password')
        document.querySelector('.container_search_product').setAttribute('type', 'text')
        document.querySelector('.container_search_product').classList.remove('hide_product_my_acount')
        showHideProduct.innerHTML = "Show Product"
        formProducthide.classList.add('hide_product_my_acount')
       
    } else {
        showHideProduct.setAttribute('type', 'text')
        document.querySelector('.container_search_product').setAttribute('type', 'password')
        showHideProduct.innerHTML = "Hide Product"
        formProducthide.classList.remove('hide_product_my_acount')
        document.querySelector('.container_search_product').classList.add('hide_product_my_acount')
       
    }
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

              let productResult='';
            for(let i = 0; i < productFilter.length; i++) {
            productResult += ` <tr>
                                    <td>${productFilter[i].name}</td>
                                    <td>${productFilter[i].price}</td>
                                    <td><img src="${productFilter[i].Image}" alt=""></td>
                                    <td>${productFilter[i].type}</td>
                                    <td>
                                        <button data-id = "${productFilter[i].id}"class ="btn_edit btn_common">Edit</button>
                                        <button data-id = "${productFilter[i].id}" class ="btn_delete btn_common">Delete</button>
                                    </td>
                                </tr>` 
        }
        tbodyProductSelector.innerHTML = productResult


    })
 
  


// 3.1 Nơi lắng nghe các sự kiện
buttonProductsSave.addEventListener('click', handleAddproduct)
// Thêm sự kiện cho thêm và xóa sản phẩm
tbodyProductSelector.addEventListener('click', handleProcessMyAcount)
// Hàm tạo ra option và đưa vào category.
// showCategoryInit()
showCategoryInit1()

showHideProduct.addEventListener('click', showHideProductItem)
renderDataProduct()
// Thêm sự kiện nhập trong ô input thì cũng chạy hàm này
