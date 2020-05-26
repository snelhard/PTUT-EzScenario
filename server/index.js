const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Module pour l'envoi de mails avec Node.JS
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/form', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
        <h3>Informations</h3>
        <ul>
            <li><b>Nom :</b> ${req.body.name}</li>
            <li><b>Email :</b> ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: { // À modifier : Stocker les infos dans un fichier config
                user: 'ez.scenario@gmail.com',
                pass: 'izisenariau123'
            }
        });
        
        let mailOptions = {
            to: 'ez.scenario@gmail.com',
            subject: req.body.objet,
            text: req.body.message,
            html: htmlEmail,
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err);
            }
            

            // Débug
            console.log("Message envoyé !");

            /*console.log("Message envoyé : %s", info.message);
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));*/
        });
    });
});

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Serveur lancé, et en écoute sur le port ${PORT}`);
});