const Router = require('express')
const  router = new Router()
const newsController = require('../controllers/news.controller')

router.post('/news', newsController.addNews)
router.get('/news/:schoolsId', newsController.getNews)
router.get('/news/:id',  newsController.getOneNews)
router.put('/news', newsController.updateNews)
router.delete('/news/:id', newsController.deleteNews)

module.exports = router