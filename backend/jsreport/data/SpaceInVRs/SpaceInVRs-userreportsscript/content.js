// Use the "beforeRender" or "afterRender" hook
// to manipulate and control the report generation
const axios = require('axios');
const nodemailer = require('nodemailer')

const options = {
  auth: {
    username: 'myUsername',
    password: 'myPassword'
  }
};

async function beforeRender(req, res) {

console.log('AAAAAAAAAAAAAAAAAAAAAAA ' , req);

    const resUsers = await axios.get('http://localhost:4000/api/users', options)

    req.data.users = { ...req.data,
        ...resUsers.data.map(user=> {
          return {
            ...user
          }
        })
    }

    

}

// async function afterRender(req, res) {

//     const transporter = nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         auth: {
//             user: 'isom26@ethereal.email',
//             pass: 'sQEWpaYJug5tattpkZ'
//         }
//     });




//     await transporter.sendMail({
//         from: 'kvalls.contact@gmail.com',
//         to: "isom26@ethereal.email",
//         subject: 'CRUD report',
//         text: '...',
//         attachments: [{
//             filename: 'Data.pdf',
//             content: Buffer.from(res.content)
//         }],
//     })

// }