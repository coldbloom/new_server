const Router = require('express')
const router = new Router
const adminAuthController = require('../controllers/adminAuthController')

router.post('/login', adminAuthController.login)
router.get('/logout', adminAuthController.logout)
router.get('/refresh', adminAuthController.refresh)
router.get('/profile', adminAuthController.profile)

module.exports = router