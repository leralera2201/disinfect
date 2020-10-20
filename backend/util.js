const jwt = require('jsonwebtoken')

const JWT_SECRET = 'SMTH EXTRA Secret'


const getToken = (user) => {
    return jwt.sign( {
            _id: user._id,
            email: user.email,
        }, JWT_SECRET
    )
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization
    if(token) {
        const onlyToken = token.slice(7, token.length)
        jwt.verify(onlyToken, JWT_SECRET, (err, decode) => {
            if(err) {
                res.status(401).send({message: 'Токен не валідний'})
            }
            req.user = decode
            next()
            return
        })
    }else{
        return res.status(401).send({message: 'Токен не підтримується'})
    }
}

module.exports = {getToken, isAuth}

