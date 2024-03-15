const express = require('express')
const router = express.Router()

router.post('/add', (req, res) => {

    const emailsCollection = req.app.locals.emailsCollection
    emailsCollection
        .insertOne({email: req.body.email})
        .then((result) => {
            if(result.insertedCount == 1) return res.json('Success')
        })
        .catch(() => {
            return res.json('Failure')
        })

})

router.post('/send', (req,res) => {
    
    const mail = require('../email')
    mail.mail(req)
        .then((messageId) => {
            if(messageId) {
                console.log(messageId)
                return res.json('Success')
            }
        })
        .catch(() => {
            return res.json('Failure')
        })

})

module.exports = router