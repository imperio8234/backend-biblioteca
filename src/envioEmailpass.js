const recoverPass = require("express").Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const connection = require("./controllers/conexion");

// Variables de entorno
const CLIENT_ID = "368897088868-7hts648rtlje7948evs9hnqmhimtssn7.apps.googleusercontent.com";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//04RXyMPT0b1nQCgYIARAAGAQSNwF-L9IrKMxk-qeU4X8YOqBJiGAT3v_onZAE4dqJ7729yD6cUeVYPsscFOU3kayoJdiwaRhdcrY";

// Envío de formulario
const formu = `
<a style="color: blue; font-size: 18px;" href="http://localhost:3000" > recupera tu contraseña da clic</a>

`;

// Configuración de Google
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Transportador de NodeMailer
const sendMail = async (email) => {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "frutprosalud@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken
    }
  });

  const mailOptions = {
    from: "Página web de biblioteca <frutprosalud@gmail.com>",
    to: email,
    subject: "recupera la contraseña",
    html: formu
  };

  const result = await transporter.sendMail(mailOptions);

  if (result) {
    console.log("Mensaje enviado");
  } else {
    console.log("Mensaje no enviado");
  }
};

recoverPass.post("/", async (req, res) => {
    const { userEmail }= req.body;

    //validar el correo si esta registrado o no 
    connection.query("SELECT * FROM usuarios WHERE email = ?", [userEmail], async (err, result)=>{
        if(err){
            console.log("no se pudo acceder a la informacion")
        }else{
            if (result.length > 0) {
                 try {
    await sendMail(userEmail);
    res.status(200).json({
        success:true,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrió un error al enviar el correo electrónico.");
  }
                
            }else{
                res.status(404).json({
                    message:"no hay ningun usuario con este correo ",
                    success:false
                })
            }
         
            
        }

    })


 
});

module.exports = recoverPass;
