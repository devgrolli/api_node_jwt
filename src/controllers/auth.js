require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.signUp = async (user, password, res) => {
    const checkPassowrd = await bcrypt.compare(password, user.password)
    if(!checkPassowrd){
        return res.status(422).json({ msg: 'Senha inválida' })
    }

    try{
        const secret = process.env.SECRET
        const token = jwt.sign(
        {
            id: user._id,
        },
        secret,
        )
        res.status(200).json({msg: 'Autenticação realizada com sucesso', token })
    } catch(err){
        console.log(err)
        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'})
    }
}

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body
     // Colocando segurança na senha
     const salt = await bcrypt.genSalt(12)
     const passwordHash = await bcrypt.hash(password, salt)
 
     const user = new User({
        name,
        email,
        password: passwordHash
     })
 
     try{
        await user.save()
        res.status(201).json({msg: 'Usuário cadastrado com sucesso' })
     } catch(err){
        console.log(err)
        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'})
     }
}
