const sendMessageButton = document.querySelector('#send_message_button')
const messageDiv = document.querySelector('.info')
const contactForm = document.querySelector('#contactForm')

sendMessageButton.addEventListener('click', () => {

    const email_field = contactForm.elements.namedItem('email')
    const name_field = contactForm.elements.namedItem('name')
    const subject_field = contactForm.elements.namedItem('subject')
    const message_field = contactForm.elements.namedItem('message')
    
    if(!email_field.checkValidity()) return

    messageDiv.textContent = 'Sending a message. Please wait ...'

    // new Promise((resolve) => {

    //     setTimeout(() => {

    //         resolve()
        
    //     }, 3000)

    // }).then(() => {

    //     messageDiv.textContent = 'Message has been sent'
    // })

    
    fetch('/email/send', {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: email_field.value,
            message: message_field.value,
            name: name_field.value,
            subject: subject_field.value,
        })
    })
    .then((res) => {
        if(res.ok) return res.json()
    })
    .then((response) => {
        // console.log(response)
        if(response === 'Success') {
            messageDiv.textContent = 'Message has been sent'
            ;(async () => {
                await new Promise((resolve) => setTimeout(resolve, 3000))
                messageDiv.textContent = ''
            })()
        } else {
            messageDiv.textContent = 'There was a problem with sending your message'
        }
    })
    .catch((error) => console.log(error))

    

})