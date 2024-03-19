// const Admin = require('./models/admin')

// const Admin = require('..api/models/Admin')
// const jwt = require('jsonwebtoken')


// module.exports.loginAdmin = async (req, res) => {

//     const { userName, password } = req.body
//     const userExists = await Admin.findOne({ userName: userName })
//     if (userExists) {
//         if (userExists.password !== password) {
//             return res.send({ code: 400, message: 'Username or Password wrong.', })
//         }
//         const _token = await jwt.sign({ ...userExists }, 'PRIV_123')

//         return res.send({
//             code: 200,
//             message: 'login success',
//             token: _token,
//             type: userExists.type
//         })
//     } else {
//         return res.send({ code: 500, message: 'Service error' })
//     }
// }