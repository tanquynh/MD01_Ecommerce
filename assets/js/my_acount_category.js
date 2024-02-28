let saveButtonCategory = document.querySelector('.btn_category_save');
let nameCatelogySelector = document.querySelector('.category_name');
let imageCategorySelector = document.querySelector('.category_img')
let tbody = document.querySelector('.category_table');




// 2. Nơi khai báo hàm
function handleAddproductCategory() {
    // ngăn submit form 
    event.preventDefault();
    let isValiform = true;
    // 1. validate theo yêu cầu
    let valueName = nameCatelogySelector.value.trim();
    let divError = nameCatelogySelector.nextElementSibling;
    let valueImage = imageCategorySelector.value.trim();
    let divErrorImage = imageCategorySelector.nextElementSibling;
    //ktra biến name là rỗng thì hiển thị lỗi
    if(valueName === '') {
        nameCatelogySelector.classList.add('error');
        divError.innerText = 'Tên không được để trống'
        isValiform = false;
    } else {
        nameCatelogySelector.classList.remove('error')
        divError.innerText = ''
    }
    if(valueImage === '') {
        imageCategorySelector.classList.add('error');
        divErrorImage.innerText = 'Tên không được để trống'
        isValiform = false;
    } else {
        imageCategorySelector.classList.remove('error')
        divErrorImage.innerText = ''
    }
    

// Kiêm tra form hợp lệ
if(isValiform) {
    let clicked =event.target;
    if(clicked.classList.contains('update')) {
        let idUpdate = clicked.getAttribute('data-id')
        handleUpdateFormCategory(idUpdate) 
    } else {
        handleSubmitFormCategory() 
       
    }


}
 // reset lại form
 nameCatelogySelector.value = ''
 imageCategorySelector.value = ''
}
function handleUpdateFormCategory(idUpdate) {
    let categories = JSON.parse(localStorage.getItem('categories'));
    let indexUpdate = categories.findIndex (
        function(item) {
            if(item.id === idUpdate) {
                return true
            } else {
                return false
            }
        }
    )
   

    categories[indexUpdate].name = nameCatelogySelector.value;
    categories[indexUpdate].image = imageCategorySelector.value;
    localStorage.setItem('categories',JSON.stringify(categories))
    renderDataCategory() 
    saveButtonCategory.innerText = 'Save'
    saveButtonCategory.classList.remove('update');
    saveButtonCategory.removeAttribute('data-id')
    
}

 // Nếu data hợp lệ thì thực thi hàm này
function handleSubmitFormCategory() {
    
let valueName = nameCatelogySelector.value.trim();
let valueImage = imageCategorySelector.value.trim();

// Khi chưa có dữ liệu local Storage chúng ta tạo mảng rỗng
// Khi có dữ liệu thì chúng ta phải lấy về và đẩy thêm dữ liệu
let categories;
if(localStorage.getItem('categories') === null) {
    categories = []
   
} else {
    categories = JSON.parse(localStorage.getItem('categories'))
}
let newCategories = {
    id: crypto.randomUUID(),
    name: valueName,
    image: valueImage
}
categories.push(newCategories)
//    lưu data vào local Storage khi load vào trang không mất dữ liệu
localStorage.setItem('categories', JSON.stringify(categories));

  // Hiển thị dư liệu ở localStorage ra table
  renderDataCategory() 
}

function renderDataCategory() {
    let categories = JSON.parse(localStorage.getItem('categories'));
    if(categories) {
        let categoriesResult = ``
        for(let i = 0; i < categories.length; i++) {
            categoriesResult += ` <tr>
                                    <td>${categories[i].name}</td>
                                    <td>${categories[i].image}</td>
                                    <td>
                                        <button data-id = "${categories[i].id}"class ="btn_edit btn_common">Edit</button>
                                        <button data-id = "${categories[i].id}" class ="btn_delete btn_common">Delete</button>
                                    </td>
                                </tr>`
            
        }
        tbody.innerHTML = categoriesResult
    }
   
}
function handleProcessCategory(event) {
    let clicked = event.target;
    if(clicked.classList.contains('btn_delete')) {  
        let categories = JSON.parse(localStorage.getItem('categories'))
    // Tìm id cần xóa trong object
   
    let id = clicked.getAttribute('data-id')
    // 3 xóa object với id clck ra khoải mảng
    let categoriesRemoveById = categories.filter(
        function(item) {
            return item.id != id;
                
        }
    )
    if( event.target.getAttribute('data-id') === saveButtonCategory.getAttribute('data-id') ) {
        nameCatelogySelector.value = '';
        imageCategorySelector.value = '';
        saveButtonCategory.innerText = 'Save';
        saveButtonCategory.classList.remove('update');
        saveButtonCategory.removeAttribute('data-id');
    }

   // 4. cập nhật lại vào localStorage
   localStorage.setItem('categories',JSON.stringify(categoriesRemoveById))

   // 5. render lại danh sách sản phẩm theo local Storage
   renderDataCategory()
 
    } 
    if(event.target.classList.contains('btn_edit')) {
    let categories = JSON.parse(localStorage.getItem('categories'))
    // Tìm id cần xóa trong object
   
    let id = clicked.getAttribute('data-id')
    // 3 xóa object với id click ra khỏi mảng
    let categoriesEditById = categories.find(
        function(item) {
            if(item.id === id) {
                return true
            } else {
                return false
            }
                
        }
    )

   // đưa giữ liệu object vào input
      nameCatelogySelector.value = categoriesEditById.name;
      imageCategorySelector.value = categoriesEditById.image;


        // Thêm trạng thái vào nut save để biết update hay add
        saveButtonCategory.classList.add('update');
        saveButtonCategory.innerText = 'Update'
        saveButtonCategory.setAttribute('data-id', id)
        
    }
 
}


renderDataCategory();
// 3.1 Nơi lắng nghe các sự kiện
saveButtonCategory.addEventListener('click', handleAddproductCategory)
// Thêm sự kiện cho thêm và xóa sản phẩm
tbody.addEventListener('click', handleProcessCategory)