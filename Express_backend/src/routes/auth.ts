import { Request, Response, Router } from "express";
import { query } from "../db";

const authRouter = Router();

authRouter.get('/auth', async (req: Request, res: Response) => {
try {
const { email, password } = req.body;
const authentification = await query('SELECT * FROM `utilisateur` WHERE email = '+email+'');
res.json(authentification);


} catch (error) {
console.error('Erreur :', error);
// res.status(500).json({ error: 'Erreur serveur' });
}
});

export default authRouter;

