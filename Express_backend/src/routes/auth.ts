import express,{ Request, Response, Router } from "express";
import { query } from "../db";

const authRouter = Router();
authRouter.use(express.json());



authRouter.get('/', async (req: Request, res: Response) => {
try {
const { email, password } = req.body;

const authentification = await query('SELECT * FROM `employe` WHERE email = ?',['utilisateur@mail.net']);
res.json(authentification);

} catch (error) {
console.error('Erreur :', error);
 res.status(500).json({ error: 'Erreur serveur' });
}
});

authRouter.post('/', async (req: Request, res: Response) => {
    console.log('.post/auth')
    const { email } = req.body;
    console.log("Données reçues :", email);
    try {

    const authentification = await query('SELECT * FROM `employe` WHERE email = ?',[email]);
    if(!authentification){
        res.status(401).json({Unauthorized: 'Une authentification est nécessaire pour accéder à la ressource.'});
    }else{
        res.status(200).json('Welcome');
}

    } catch (error) {
    console.error('Erreur :', error);
     res.status(500).json({ error: 'Erreur serveur' + res });
    }
    });

export default authRouter;

