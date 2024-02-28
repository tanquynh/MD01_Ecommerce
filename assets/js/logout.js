let logoutSelector = document.querySelector('.logout');

function handleLogout() {
    let users = JSON.parse(localStorage.getItem('users'));
    let count =false
    for(let i = 0; i < users.length; i++) {
        if(users[i].status = 'active') {
           users[i].status =''
            break
        }
       
    }
    localStorage.setItem('users', JSON.stringify(users))
}





logoutSelector.addEventListener('click', handleLogout)