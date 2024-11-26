let Username = document.querySelector('.input #Username')
let Pass = document.querySelector('.input #password')
let loginBtn = document.querySelector('.loginBtn button')
let wrong = document.querySelector('span#wrong')
console.log(wrong);


let username = /^(?!.*[-_]{2})[a-zA-Z0-9](?:[a-zA-Z0-9_-]{1,14}[a-zA-Z0-9])?$/  //regex for username
let password = 'admin123'

Username.addEventListener('input', (e) => {
    if (!username.test(Username.value)) {
        Username.style.color = 'red';
    } else {

        Username.style.color = 'white';
    }
})

loginBtn.addEventListener('click', e => {
    console.log(Username.value);


    if (Username.value === 'admin' && Pass.value === 'admin123') {

        window.location.href = "./index.html";

    } else {
        wrong.style.display = 'block'
    }

})