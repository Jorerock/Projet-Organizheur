import { Request, Response, Router } from "express";
import { query } from "../db";

const authRouter = Router();

authRouter.get('/auth', async (req: Request, res: Response) => {
try {
const { email, password } = req.body;
console.log('0')
const authentification = await query('SELECT * FROM `utilisateur` WHERE email = '+email+'');
console.log('1')
res.json(authentification);
console.log('2')
console.log('3')

} catch (error) {
console.error('Erreur :', error);
res.status(500).json({ error: 'Erreur serveur' });
}
});

export default authRouter;

