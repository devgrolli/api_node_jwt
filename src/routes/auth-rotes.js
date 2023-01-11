const User = require('../models/User')
const checkToken = require('../middleware/auth-jwt')
const controllerAuth = require('../controllers/auth')

module.exports = function(app) {
    app.post("/auth/login", async (req, res) =>{
        const { email, password } = req.body

        if(!email){
            return res.status(422).json({ msg: 'O nome é obrigatório' })
        }

        if(!password){
            return res.status(422).json({ msg: 'A senha é obrigatória' })
        }

        const user = await User.findOne({ email: email })
        if(!user){
            return res.status(404).json({ msg: 'Usuário não encontrado' })
        }
        controllerAuth.signUp(user, password, res)
    })

    // Register User
    app.post('/auth/register', async(req, res) => {
        const { name, email, password, confirmpassword } = req.body

        if(!name){
            return res.status(422).json({ msg: 'O nome é obrigatório' })
        }

        if(!email){
            return res.status(422).json({ msg: 'O email é obrigatório' })
        }

        if(!password){
            return res.status(422).json({ msg: 'A senha é obrigatória' })
        }

        if(password !== confirmpassword){
            return res.status(422).json({ msg: 'As senhas não conferem' })
        }

        const userExists = await User.findOne({ email: email })
        if(userExists){
            return res.status(422).json({ msg: 'E-mail já existente' })
        }
        controllerAuth.registerUser(req, res)
    })

    // Private Route
    app.get('/user/:id', checkToken, async(req, res) => {
        const id = req.params.id

        const user = await User.findById(id, '-password')
        if(!user){
            return res.status(404).json({ msg: 'Usuário não encontrado' })
        }

        res.status(200).json({user})
    })
}