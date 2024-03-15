const deleteLinks = document.querySelectorAll('.delete-link')

deleteLinks.forEach((el) => 

    el.addEventListener('click', (event) => {

        if(confirm('Are you sure?')) {
            fetch('/admin-secret-key/delete-article', {
                method: 'delete',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: event.currentTarget.parentNode.id,
                    category: event.currentTarget.id
                })
            })
            .then((resp) => {
                if(resp.ok) return resp.json() // Transform the data into json
            })
            .then((response) => {
                if(response == 'Success') {
                    el.parentElement.remove()
                    messageDiv.textContent = 'The article was deleted'
                    setTimeout(() => {
                        messageDiv.textContent = ''
                    }, 3000)
                } else {
                    messageDiv.textContent = 'There was a problem with deleting the article'
                }
            })
            .catch((error) => console.log(error))
        }

    })

)