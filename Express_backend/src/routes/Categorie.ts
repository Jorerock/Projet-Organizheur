import express,{ Request, Response, Router } from "express";
import {GetAll,GetSpecific,DeleteSpecific,PutSpecific,UpdateSpecific} from "../Function/RoutesFactory"

const CategorieRouteur = Router();
CategorieRouteur.use(express.json());



CategorieRouteur.get('/', async (req: Request, res: Response) => {
  return GetAll('categorie')(req, res);
});


CategorieRouteur.delete('/:Categorie_ID', async (req: Request, res: Response) => {
  const Categorie_ID : number = parseInt(req.params.Categorie_ID, 10);
  if (isNaN(Categorie_ID) || Categorie_ID <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  return DeleteSpecific('categorie','Categorie_ID', Categorie_ID)(req, res);
});

// CategorieRouteur.put('/', async (req: Request, res: Response) => {
//   const head :string[][]=[
//     [

//       'Categorie_Name',
//       'Employe_ID'
//     ],
//     [

//       req.body.Categorie_Name,
//       req.body.Employe_ID
//     ],
//   ]
//   return PutSpecific('categorie', head)(req, res);
// });



 const updateUser = UpdateSpecific('categorie', 'Categorie_ID', ['Categorie_ID', 'Categorie_Name','Employe_ID']);
 CategorieRouteur.put('/:id', UpdateSpecific('categorie', 'Categorie_ID', ['Categorie_ID', 'Categorie_Name','Employe_ID']));

export default CategorieRouteur;

