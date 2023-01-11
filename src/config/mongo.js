require('dotenv').config()
const mongoose = require('mongoose')
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.0liawge.mongodb.net/?retryWrites=true&w=majority`

module.exports = function(app) {
    mongoose.set('strictQuery', false);
    mongoose.connect(mongoURI, { useNewUrlParser: true })
        .then(() => {
            app.listen(3000)
            console.log('Conectou no banco!')
        }).catch((err) => console.log(err))
}
