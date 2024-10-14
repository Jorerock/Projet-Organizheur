import { Request, Response, Router } from "express";
import { query } from "../db";

const usersRouter = Router();
// Route pour récupérer tous les utilisateurs
usersRouter.get('/', async (req: Request, res: Response) => {
try {
// récupérer tous les utilisateurs du SGBD
const users = await query('SELECT * FROM utilisateur');
res.json(users);
res.send(users);
} catch (error) {
console.error('Erreur :', error);
res.status(500).json({ error: 'Erreur serveur' });
}
});

export default usersRouter;