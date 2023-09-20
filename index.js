require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const authRouter = require('./authRouter')

const Port = process.env.PORT || 3031;
const app = express();

app.use(express.json());
app.use("/auth", authRouter)

app.get("/", (req, res) => {
    res.json("ПРивет, я работаю!")
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(Port, () => console.log(`Server is started on the port ${Port}`));
    } catch (e) {
        console.log(e);
    }
}

start();