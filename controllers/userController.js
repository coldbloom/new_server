const {User} = require('../models/models')

class UserController {
    async registration (req, res, next) {
        try {

        } catch (e) {
            console.log(e)
            res.status(400).json({message: "registration error"})
        }
    }

    async login (req, res, next) {
        try {

        } catch (e) {
            console.log(e)
            res.status(400).json({message: "login error"})
        }
    }

    async check (req, res, next) {
        try {

        } catch (e) {
            console.log(e)
            res.status(400).json({message: "check error"})
        }
    }
}

module.exports = new UserController()