const {Router} = require('express')
const bcrypt = require('bcrypt')
const User = require('./../models/User')
const { getToken } = require('./../util')

const router = new Router()
router.post('/signin',  (req, res) => {
    const {email, password} = req.body
    User.findOne({
        email: email
    }).then(signinUser => {
        if (signinUser) {
            bcrypt.compare(password, signinUser.password, function(err, result) {
                if(result){
                    return res.json({
                        token: getToken(signinUser),
                    });
                }
                res.status(401).json({ message: 'Невірні дані для входу.' });
            });

        } else {
            res.status(401).json({ message: 'Невірні дані для входу.' });
        }
    }).catch(err => console.log(err))
});

// router.get('/createadmin',  (req,res)=> {
//     try{
//         bcrypt.hash('123456', 12, function (err, hash) {
//             const user = new User({
//                 email: 'test@gmail.com',
//                 password: hash,
//             })
//             user.save().then(newUser => res.json({token: getToken(newUser)}))
//         })
//
//     } catch (e) {
//         res.send({message: e.message})
//     }
//
// })


module.exports = router
