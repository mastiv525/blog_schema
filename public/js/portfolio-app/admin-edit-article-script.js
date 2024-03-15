const saveArticleForm = document.querySelector('#save_article_form')
const saveArticleButton = document.querySelector('#save_article_button')
const messageDiv = document.querySelector('.info')
const editLinks = document.querySelectorAll('.edit-link')
var article_id

editLinks.forEach((el) =>

    el.addEventListener('click', (event) => {

        article_id = event.currentTarget.parentNode.id
        
        fetch('/admin-secret-key/get-article/' + article_id)
            .then((res) => {
                if(res.ok) return res.json() // Transform the data into json
            })
            .then((response) => {
                if(response) {
                    saveArticleForm.elements.namedItem('title').value = response.title
                    saveArticleForm.elements.namedItem('category').value = response.category
                    saveArticleForm.elements.namedItem('category').setAttribute('disabled', 'disabled')
                    saveArticleForm.elements.namedItem('created_at').value = new Date(response.created_at).toISOString().split('T')[0]
                    saveArticleForm.elements.namedItem('image').value = response.image
                    saveArticleForm.elements.namedItem('description').value = response.description
                    saveArticleForm.elements.namedItem('long_description').value = response.long_description
                    document.getElementById(response.category).selected = 'true'
                    saveArticleForm.style.display = 'block'
                } else {
                    messageDiv.textContent = 'There was a problem with getting the article'
                }
            })
            .catch((error) => console.log(error))

        

    })

)

saveArticleButton.addEventListener('click', () => {

    const title_field = saveArticleForm.elements.namedItem('title')
    const image_field = saveArticleForm.elements.namedItem('image')
    const created_at_field = saveArticleForm.elements.namedItem('created_at')
    const category_field = saveArticleForm.elements.namedItem('category')
    const description_field = saveArticleForm.elements.namedItem('description')
    const long_description_field = saveArticleForm.elements.namedItem('long_description')

    if(!title_field.checkValidity()) return
    if(!created_at_field.checkValidity()) return

    fetch('/admin-secret-key/article/' + article_id, {

       method: 'put',
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
       if (res.ok) return res.json()  
    })
    .then((response) => {
        if(response === 'Success') {
            messageDiv.textContent = 'The article was updated'
            setTimeout(() => {

                messageDiv.textContent = ''
                saveArticleForm.style.display = 'none'

            }, 3000)
        } else {
            messageDiv.textContent = 'There was a problem with editing your article'
        }
    })
    .catch((error) => console.log(error))

})