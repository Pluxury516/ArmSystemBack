const Router = require('express')
const  router = new Router()
const schoolController = require('../controllers/school.controller')

router.post('/school', schoolController.addSchool)
router.get('/school', schoolController.getSchool)
router.get('/school/:id',  schoolController.getOneSchool)
router.put('/school', schoolController.updateSchool)
router.delete('/school/:id', schoolController.deleteSchool)

module.exports = router