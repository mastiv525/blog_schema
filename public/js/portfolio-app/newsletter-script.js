const signUpButton = document.querySelector('.sign-up-to-newsletter')
const subscriptionForm = document.querySelector('#subscription_form')
const messageDiv = document.querySelector('.info')

signUpButton.addEventListener('click', () => {

    const email_field = subscriptionForm.elements.namedItem('EMAIL')

    if(!email_field.checkValidity()) return

    fetch('/email/add', {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: email_field.value
        })
    })
    .then((res) => {
        if(res.ok) return res.json()
    })
    .then((response) => {
        if(response === 'Success') {
            messageDiv.textContent = 'Your email added to the newsletter'
        } else {
            messageDiv.textContent = 'Problem with adding your email to the newsletter'
        }
    })
    .catch((error) => console.log(error))
})