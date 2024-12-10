import express,{ Request, response, Response, Router } from "express";
import { query } from "../db";
import {generateTokenForUser} from "../Function/jwt.utils"
// import adminConnect from '../Function/jwt.utils';
import { Employe } from "../models/employe"
const authRouter = Router();
authRouter.use(express.json());
var bodyParser  = require('body-parser');

authRouter.use(bodyParser.urlencoded({ extended: true }));
authRouter.use(bodyParser.json());

//INSERT INTO `utilisateurs` (`Utilisateur_ID`, `Utilisateur_Nom`, `Utilisateur_Prenom`, `Utilisateur_Admin`, `Utilisateur_Password`, `Utilisateur_Email`) VALUES (NULL, 'Doe', 'John', '0', 'Password', 'utilisateur@mail.net');

authRouter.post('/', async (req: Request, res: Response) => {
try {
const  Email  :string = req.body.Email ;
const  Password:string  = req.body.Password;


console.log("mail "+Email+"pass: "+Password)

const authentification = await query('SELECT Employe_ID,Admin FROM Employe WHERE Email  = ?',[Email]);
const user  = JSON.parse(JSON.stringify(authentification))
const User : Employe = user[0]
// console.log("user:"+user)
const token = generateTokenForUser(User)
    res.cookie('token', token, {
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
    });
res.status(201).json({
    'user': user.Employe_ID,
    'admin':User.Admin,
    'token': token
});

} catch (error) {
console.error('Erreur :', error);
 res.status(500).json({ error: 'Erreur serveur' });
}
});

authRouter.post("/logout", (req, res) => {
	res.clearCookie("jwtToken");
  res.json({ response: 'succesfull logout' });
});


export default authRouter;



