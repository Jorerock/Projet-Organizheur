import express, { Router, Express, Request, Response } from "express";
import cors from "cors";


import { query } from './db';
import todoRouter from "./routes/todos";
import usersRouter from "./routes/users";

import authRouter from "./routes/auth";


const server = express();
server.use(express.json());

var whitelist = ['http://localhost:3000', /** other domains if any */ ]
var corsOptions = {
}

server.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true
}));

interface Todo {
  id: number;
  label: string;
  done: boolean;
  dueDate?: Date;
}


server.use('/todos',todoRouter);
server.use('/auth',authRouter);
server.use('/users',usersRouter);
  
  

const sql = `SELECT 1 + 1 AS test`;
query(sql).then(
  value => console.log(value)
)

server.listen(3000, () => console.log("Serveur prêt à démarrer"));