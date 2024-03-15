const saveArticleButton = document.querySelector('#save_article_button')
const saveArticleForm = document.querySelector('#save_article_form')
const messageDiv = document.querySelector('.info')

saveArticleButton.addEventListener('click', () => {

    const title_field = saveArticleForm.elements.namedItem('title')
    const created_at_field = saveArticleForm.elements.namedItem('created_at')
    const image_field = saveArticleForm.elements.namedItem('image')
    const category_field = saveArticleForm.elements.namedItem('category')
    const description_field = saveArticleForm.elements.namedItem('description')
    const long_description_field = saveArticleForm.elements.namedItem('long_description')

    if(!title_field.checkValidity()) return
    if(!created_at_field.checkValidity()) return

    fetch('/admin-secret-key/article', {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: title_field.value,
            created_at: created_at_field.value,
            image: image_field.value,
            category: category_field.value,
            description: description_field.value,
            long_description: long_description_field.value,
        })
    })
    .then((res) => {
        if(res.ok) return res.json()
    })
    .then((response) => {
        if(response === 'Success') {
            messageDiv.textContent = 'An article was added'
            setTimeout(() => {
                messageDiv.textContent = ''
            }, 3000)
        } else {
            messageDiv.textContent = 'There was a problem with adding your article'
        }
    })
    .catch((error) => console.log(error))

})