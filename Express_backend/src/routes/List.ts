import express,{ Request, Response, Router } from "express";
import {GetAll,GetSpecific,DeleteSpecific,PutSpecific,PatchSpecific} from "../Function/RoutesFactory"
import {Connect,adminConnect} from '../Function/jwt.utils';
var cookieParser = require('cookie-parser')

const listRouteur = Router();
listRouteur.use(express.json());
listRouteur.use(cookieParser());




listRouteur.get('/', async (req: Request, res: Response) => {
  return GetAll('list')(req, res);
});


listRouteur.get('/:Employe_id',Connect, async (req: Request, res: Response) => {

  const Employe_id = parseInt(req.params.Employe_id, 10);
  if (isNaN(Employe_id) || Employe_id <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  return GetSpecific('list','Employe_id', Employe_id)(req, res);
});




listRouteur.delete('/:Categorie_ID',Connect, async (req: Request, res: Response) => {
  const Categorie_ID = parseInt(req.params.Categorie_ID, 10);
  if (isNaN(Categorie_ID) || Categorie_ID <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  return DeleteSpecific('categorie','Categorie_ID', Categorie_ID)(req, res);
});

listRouteur.put('/',Connect, async (req: Request, res: Response) => {
  const head :string[][]=[
    [
      'Categorie_Name',
      'Employe_ID'
    ],
    [
      req.body.Categorie_Name,
      req.body.Employe_ID
    ],
  ]
  return PutSpecific('categorie', head)(req, res);
});


listRouteur.patch('/:List_ID',Connect, async (req: Request, res: Response) => {

  const List_ID = parseInt(req.params.List_ID, 10);
  if (isNaN(List_ID) || List_ID <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  let elem : string[][] = ['List_End',req.body.List_End];
  console.log(List_ID,elem)

  return PatchSpecific('List','List_ID',List_ID,'List_End',elem)(req, res);
});

export default listRouteur;

