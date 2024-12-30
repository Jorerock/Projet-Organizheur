import express,{ Request, Response, Router } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";
import {GetAll,GetSpecific,DeleteSpecific,PatchSpecific} from "../Function/RoutesFactory"
import {Connect,adminConnect} from '../Function/jwt.utils';

const todosRouter = Router();
todosRouter.use(express.json());
todosRouter.use(cookieParser());

export interface Todo {
  List_ID: number;
  Todo_name: string;
  Todo_end: any;
  Todo_Echeance_date?: Date;
}


todosRouter.get('/Bylist/:List_ID',Connect, async (req: Request, res: Response) => {

  const List_ID = parseInt(req.params.List_ID, 10);
  if (isNaN(List_ID) || List_ID <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  return GetSpecific('Todo','List_ID', List_ID)(req, res);
});


todosRouter.patch('/:List_ID',Connect, async (req: Request, res: Response) => {

  const List_ID = parseInt(req.params.List_ID, 10);
  if (isNaN(List_ID) || List_ID <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  return PatchSpecific('Todo','List_ID', List_ID)(req, res);
});


todosRouter.delete('/:Todo_ID',Connect, async (req: Request, res: Response) => {
  const Todo_ID : number = parseInt(req.params.Todo_ID, 10);
  if (isNaN(Todo_ID) || Todo_ID <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  return DeleteSpecific('Todo','List_ID', Todo_ID)(req, res);
//   try {
//     const Todos = await query(' DELETE FROM Todo WHERE Todo_ID= ? ; ',[Todo_ID]);
//     console.log("les todo :",Todos)
//     res.json(Todos);
//   } catch (error) {
//   console.error('Erreur :', error);
//   res.status(500).json({ error: 'Erreur serveur' });
// }
});



// todosRouter.put('/', async (req: Request, res: Response) => {
//   const Todo_ID    :string    = req.body.Todo_ID

// try{
//   console.log("body",req.body)
//   const Todos = await query('UPDATE todo SET Email = ? ,Nom=?,Prenom=?, Admin = ?  WHERE Employe_ID = ?',[Email,Nom,Prenom,Admin,Employe_ID]);
//   res.status(201).json({'Todo': "User : "+Todo_ID+" is update"});
// } catch (error) {
//   console.error('Erreur :', error);
//   res.status(500).json({ error: error });
// }});


export default todosRouter;


 
 

  