let backButton = document.querySelector('#backButton')

backButton.addEventListener('click', (e) => {
    window.location.href = "../login/login.html"
    localStorage.removeItem('isLoggedIn')
})