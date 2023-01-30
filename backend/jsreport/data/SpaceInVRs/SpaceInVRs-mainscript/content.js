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

    const resSessions = await axios.get('http://localhost:4000/api/sessions', options)
    // console.log(resSessions)

    req.data.sessions = { ...req.data,
        ...resSessions.data.map(session=> {
          return {
            ...session,
            finalscore: session.score - session.bullets_fired
          }
        })
    }

    console.log(req.data.sessions[0].score)
7
    req.data.score = req.data.sessions.score;
    req.data.ships_destroyed = req.data.sessions.ships_destroyed;
    req.data.bullets_fired = req.data.sessions.bullets_fired;
    req.data.powerups = req.data.sessions.powerups;
    req.data.user_id = req.data.sessions.user_id;

    //req.data.finalscore = (req.data.sessions[0].score - req.data.sessions[0].bullets_fired);
    

    console.log("Aquí el score: " + req.data.sessions.score);
    console.log("Aquí las naves destruidas: " + req.data.ships_destroyed);

    const resUsers = await axios.get('http://localhost:4000/api/users', options)
    // console.log(resUsers)
    req.data.users = { ...req.data,
        ...resUsers.data
    }

    req.data.user = req.data.users;
    req.data.username = req.data.users.name;

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