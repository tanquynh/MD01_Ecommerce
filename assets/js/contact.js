
let submitCommentSelector = document.querySelector('.submit_comment');
let messageCommentSelector = document.querySelector('#message_comment');

function handlesubmitComment() {
    let commentContact;
    let valueCommentMess = messageCommentSelector.value.trim();
    if(localStorage.getItem('commentContact') === null) {
         commentContact = [];
       
    } else {
        commentContact=JSON.parse(localStorage.getItem('commentContact'))
    }
    let users = JSON.parse(localStorage.getItem('users'))
    let nameActive;
    let emailActive;
    for(let i = 0; i < users.length; i++) {
        if(users[i].status === "active") {
            nameActive = users[i].name;
            emailActive = users[i].email;
            break
        }
    }
    let objNewComment = {
        id: crypto.randomUUID(),
        name: nameActive,
        email : emailActive,
        comment: valueCommentMess
    }
  
   
    // Thêm users vào mảng đã có sẵn
    commentContact.push(objNewComment)
    // lưu vào local Storage
    localStorage.setItem('commentContact', JSON.stringify(commentContact));

    renderDataProductContact();
   
}

function  renderDataProductContact() {
    let commentContact =JSON.parse(localStorage.getItem('commentContact'));

    if(commentContact !== null) {
        let commnetResult = [];
    for(let i = 0; i < commentContact.length; i++) {
        commnetResult = ` <div comment_contact> 
                                <img src="assets/img/image_contact_cmt.jpg" alt="">
                                <div >
                                    <p class="name_contact">${commentContact[i].name}</p>
                                    <p>${commentContact[i].email}</p>
                                    <p class="comment"> ${commentContact[i].comment}</p>
                                </div>
                            </div>
                            ` +   commnetResult
      document.querySelector('.show_comment').innerHTML = commnetResult
   }
    }
}

function handleAddComment(event) {
    event.preventDefault();
    let valueCommentMess = messageCommentSelector.value.trim();
    let   isValidForm = false;
    if(valueCommentMess === '') {
        let mesageInput = document.querySelector('.error_message');
       mesageInput.innerText = 'Comment không được để trống!!';
       document.querySelector('.form_comment').closest('.form_comment').classList.add('form-group_error');
    } else {
        isValidForm = true
        let mesageInput = document.querySelector('.error_message');
       mesageInput.innerText = '';
       document.querySelector('.form_comment').closest('.form_comment').classList.remove('form-group_error');
      
    }
    if( isValidForm = true) {
       
        handlesubmitComment() 
    }
    messageCommentSelector.value='';
   
}



renderDataProductContact();
submitCommentSelector.addEventListener('click', handleAddComment)