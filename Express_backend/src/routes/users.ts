import { Request, Response, Router } from "express";
import { query } from "../db";
import {Connect,adminConnect} from '../Function/jwt.utils';
import {GetAll,GetSpecific,DeleteSpecific,PatchSpecific,UpdateSpecific} from "../Function/RoutesFactory"

const usersRouter = Router();
// Route pour récupérer tous les utilisateurs
usersRouter.get('/', async (req: Request, res: Response) => {
try {
// récupérer tous les utilisateurs du SGBD
const users = await query('SELECT * FROM employe');
res.json(users);

} catch (error) {
console.error('Erreur :', error);
res.status(500).json({ error: 'Erreur serveur' });
}
});



usersRouter.delete('/', async (req: Request, res: Response) => {
    const Utilisateur_ID        = req.body.Utilisateur_ID
    console.log('req.body ',req.body)
  try {
    const Todos = await query(' DELETE FROM Employe WHERE Utilisateur_ID= ? ; ',[Utilisateur_ID]);
    res.status(201).json({
      'Utilisateur_ID': "User : "+Utilisateur_ID+" Deleted"});
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur'});
  }});

  usersRouter.put('/', async (req: Request, res: Response) => {
    const Employe_ID    :string    = req.body.Employe_ID
    const Nom    :string    = req.body.Nom
    const Prenom  :string   = req.body.Prenom
    const Admin  :boolean   = req.body.Admin
    const  Email :string  = req.body.Email;
    const  Password:string = req.body.Password;
  try{
    console.log("body",req.body)
    const Todos = await query('UPDATE Employe SET Email = ? ,Nom=?,Prenom=?, Admin = ?  WHERE Employe_ID = ?',[Email,Nom,Prenom,Admin,Employe_ID]);
    res.status(201).json({'Employe': "User : "+Employe_ID+" is update"});
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ error: error });
  }});


 const updateUser = UpdateSpecific('users', 'id', ['name', 'email']);
 usersRouter.patch('/users/:id', updateUser);

// cree un user
usersRouter.post('/',async (req: Request, res: Response) => { 
    try{
      const Nom    :string    = req.body.Nom
      const Prenom  :string   = req.body.Prenom
      const Admin  :boolean   = req.body.Admin
      const  Email :string  = req.body.Email;
      const  Password:string = req.body.Password;
      console.log('post new user req.body ',req.body)
    
      const NewUser = await query('INSERT INTO Employe (Email, Password,Nom,Prenom,Admin) VALUES (?,?,?,?,?)',[Email,Password,Nom,Prenom,Admin])
      res.status(201).json({'Message': "Compte crée"});
    } catch (error) {
      console.error('Erreur :', error);
      res.status(500).json({ error: error });
    }});

export default usersRouter;