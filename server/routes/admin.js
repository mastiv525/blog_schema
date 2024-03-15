const express = require("express");
const router = express.Router();
const pages_url = require("../settings");

router.get("/admin", (req, res) => {

    const db = req.app.locals.db

    db.collection('categories')
        .find()
        .toArray()
        .then((result) => {

            res.render(pages_url + "/admin.ejs", {
                page: "admin",
                categories: result
            });
        })
        .catch((error) => console.log(error))


});

router.post('/article', (req, res) => {

    const articlesCollection = req.app.locals.articlesCollection
    const categoriesCollection = req.app.locals.categoriesCollection

    categoriesCollection
        .findOneAndUpdate(
            {name: req.body.category},
            {$inc: {number_of_posts: +1}}
        )
        .catch(() => {
            return res.json('Failure')
        })


    articlesCollection
        .insertOne(req.body)
        // .insertMany(req.body)
        .then((result) => {
            if(result.insertedCount == 1) return res.json('Success')
        })
        .catch(() => {
            return res.json('Failure')
        })

    return res.json('Success')

})

router.post('/portfolio', (req,res) => {

    const portfolioCollection = req.app.locals.portfolioCollection

    portfolioCollection
        // .insertOne(req.body)
        .insertMany(req.body)
        .then((result) => {
            return res.json('Success')
        })
        .catch((error) => console.log(error))

})

router.post('/categories', (req,res) => {

    const categoriesCollection = req.app.locals.categoriesCollection

    categoriesCollection
        // .insertOne(req.body)
        .insertMany(req.body)
        .then((result) => {
            return res.json('Success')
        })
        .catch((error) => console.log(error))

})

router.get('/articles-list', async (req,res) => {

    const db = req.app.locals.db

    const categories = await db.collection('categories')
        .find()
        .toArray()
        .catch((error) => console.log(error))

    db.collection('articles').aggregate([

        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: 'name',
                as: 'category'
            }
        }

    ])
    .toArray()
    .then((results) => {

        res.render(pages_url + '/admin_articles_list.ejs', {
            page: 'admin_articles_list',
            articles: results,
            categories: categories
        })

    })
    .catch((error) => console.log(error))

})

router.get('/get-article/:id', (req,res) => {

    const db = req.app.locals.db
    var id = req.params.id
    const ObjectId = require('mongodb').ObjectID

    db.collection('articles')
        .findOne({_id: ObjectId(id)})
        .then((result) => {
            return res.json(result)
        })
        .catch(() => {
            return res.json('Failure')
        })

})

router.put('/article/:id', (req,res) => {

    const db = req.app.locals.db
    var id = req.params.id
    const ObjectId = require('mongodb').ObjectID

    db.collection('articles')
        .findOneAndUpdate(
            {_id: ObjectId(id)},
            {
                $set: {
                    title: req.body.title,
                    created_at: req.body.created_at,
                    image: req.body.image,
                    category: req.body.category,
                    description: req.body.description,
                    long_description: req.body.long_description,
                }
            }
        )
        .then((result) => {
            return res.json("Success")
        })
        .catch(() => {
            return res.json("Failure")
        })

})

router.delete('/delete-article', (req,res) => {

    const db = req.app.locals.db
    const ObjectId = require('mongodb').ObjectID

    db.collection('categories')
        .findOneAndUpdate(
            {name: req.body.category},
            {$inc: {number_of_posts: -1}}
        )
        .catch((error) => {
            return res.json('Failure')
        })

    db.collection('articles')
        .deleteOne({_id: ObjectId(req.body.id)})
        .then((result) => {
            // console.log(result.deletedCount)
            if(result.deletedCount === 0) {
                return res.json('No article to delete')
            }
            return res.json('Success')
        })
        .catch(() => {
            return res.json('Failure')
        })

})

module.exports = router;