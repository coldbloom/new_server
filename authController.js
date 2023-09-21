class authController {
    async registration(req, res) {
        try {

        } catch (e) {
            console.log(e);
            res.status(400).json({message: "registration error"})
        }
    }

    async login(req, res) {
        try {

        } catch (e) {
            console.log(e);
            res.status(400).json({message: "login error"})
        }
    }

    async getUsers(req, res) {
        try {
            const userRole = new Role()
            const adminRole = new Role({value: "ADMIN"})
            await userRole.save()
            await adminRole.save()
            res.json("server work")
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "getUsers error"})
        }
    }
}

module.exports = new authController();