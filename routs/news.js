const {Router} = require('express')
const router = Router()
const News = require('../models/news')

router.get('/', async (req, res) => {
    const news = await News.getAll()
    res.render('news', {
        title: "news",
        isNews: true,
        news
    })
})

router.get('/n-:id', async (req, res) => {
    const newsCard = await News.getById(req.params.id)
    // console.log('newsCard: ' + JSON.stringify(newsCard))
    res.render('newsCard', {
        title: newsCard.title,
        newsCard
    })
})

router.get('/add', (req, res) => {
    res.render('addNews', {
        title: "Add news"
    })
})

router.post('/add', async (req, res) => {
    const newsCard = new News(req.body.title, req.body.img, req.body.description)
    await newsCard.save()

    res.redirect('/news')
})

router.get('/:id/edit', async (req, res) => {
    if(!req.query.allow) {
        res.redirect('/')
    }

    const newsCard = await News.getById(req.params.id)
    res.render('news-edit', {
        title: newsCard.title,
        newsCard
    })
})

router.post('/edit', async (req, res) => {
    await News.update(req.body)
    res.redirect('/news')
})

module.exports = router