import express,{ Request, Response, Router } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";

const todosRouter = Router();
todosRouter.use(express.json());
todosRouter.use(cookieParser());

// const monTableau:any[] = [];
export interface Todo {
  List_ID: number;
  Todo_name: string;
  Todo_end: boolean;
  Todo_Echeance_date?: Date;
}

 const monTableau: Todo[] = [
  { List_ID: 1, Todo_name: "apprendre Vue Js", Todo_end: false, Todo_Echeance_date: new Date("2024-12-31") },
  { List_ID: 2, Todo_name: "apprendre à faire des boucles", Todo_end: false },
  { List_ID: 3, Todo_name: "apprendre à griller des saucisses", Todo_end: true, Todo_Echeance_date: new Date("2024-12-31") },
];

todosRouter.get("/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const todo = monTableau.find((t) => t.List_ID === id);
    if (todo) {
      res.send(todo);
    } else {
      res.status(404).send("Todo not found");
    }
  });

  
// todosRouter.get("/:id", (req: Request, res: Response) => {
//   const id = parseInt(req.params.id, 10);
//   const todo = monTableau.find((t) => t.id === id);
//   if (todo) {
//     res.send(todo);
//   } else {
//     res.status(404).send("Todo not found");
//   }
// });


  // todosRouter.put("/:id", (req: Request, res: Response) => {
  //   const id = parseInt(req.params.id, 10);
  //   const { label, done, dueDate } = req.body;
  //   const todoIndex = monTableau.findIndex((t) => t.id === id);
  //   if (todoIndex !== -1) {
  //     monTableau[todoIndex] = {
  //       ...monTableau[todoIndex],
  //       label: label || monTableau[todoIndex].label,
  //       done: done !== undefined ? done : monTableau[todoIndex].done,
  //       dueDate: dueDate ? new Date(dueDate) : monTableau[todoIndex].dueDate,
  //     };
  //     res.send(monTableau[todoIndex]);
  //   } else {
  //     res.status(404).send("Todo not found");
  //   }
  // });
  
  // todosRouter.delete("/:id", (req: Request, res: Response) => {
  //   const id = parseInt(req.params.id, 10);
  //   const todoIndex = monTableau.findIndex((t) => t.id === id);
  //   if (todoIndex !== -1) {
  //     const deletedTodo = monTableau.splice(todoIndex, 1);
  //     res.send(deletedTodo);
  //   } else {
  //     res.status(404).send("Todo not found");
  //   }
  // });
  
  // todosRouter.post("/", (req: Request, res: Response) => {
  //   const { label, done, dueDate } = req.body;
  //   const newId = monTableau.length > 0 ? monTableau[monTableau.length - 1].id + 1 : 1;
  //   const newTodo = { id: newId, label, done, dueDate: dueDate ? new Date(dueDate) : undefined };
  //   monTableau.push(newTodo);
  //   res.status(201).send(newTodo);
  // });
  
  
  // todosRouter.get("/", (req: Request, res: Response) => res.send(monTableau));



//   todosRouter.post('/', async (req: Request, res: Response) => {
//     console.log('.post/todos')
//     const { Employe_ID } = req.body;
//     console.log("Données reçues :", Employe_ID);
//     try {

//     const authentification = await query('SELECT * FROM `todo` WHERE Employe_ID = ?',[Employe_ID]);
//     if(!authentification){
//       res.status(401).json({Unauthorized: 'Une authentification est nécessaire pour accéder à la ressource.'});
//     }else{
//       authentification.forEach((element) => console.log(element))
//       res.send(authentification);
// }

//     } catch (error) {
//     console.error('Erreur :', error);
//      res.status(500).json({ error: 'Erreur serveur' + res });
//     }
//     });
  



// Route pour récupérer tous les utilisateurs
// todosRouter.get('/:Employe_id', async (req: Request, res: Response) => {
//   const Employe_id = parseInt(req.params.Employe_id, 10);
//   // const Employe_id = req.cookies.Connexiontoken;
//   console.log('.get/todos/'+Employe_id)

// try {
// // récupérer tous les utilisateurs du SGBD

// const Todos = await query('SELECT Todo_name, Todo_Echeance_date,Todo_End,List_ID FROM todo WHERE Employe_ID = ?',[Employe_id]);

// console.log("les todo",Todos)
// res.status(200).json({
//   message: "Connexion réussie",
//   Employe_ID : Todos, // retourner les infos de l'utilisateur
// });

// } catch (error) {
// console.error('Erreur :', error);
// res.status(500).json({ error: 'Erreur serveur' });
// }
// });

  export default todosRouter;