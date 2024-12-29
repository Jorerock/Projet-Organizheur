import express,{ Request, Response, Router,NextFunction  } from "express";
import { query } from "../db";

export const GetAll  = (tablename: string) =>
    async (req: Request, res: Response) => {
        const requete = await query(`SELECT * from ${tablename} `);
        if(!requete)
        {
            return res.status(500).json({ error: "ouch pas de donné" });
        }
        else{
            return res.status(201).json(requete);
        }
    }

    export const GetSpecific = (table: string,WhereId : string, Id: number) =>
        async (req: Request, res: Response) => {
            try {
                console.log("getspe", table, Id);
                
                const requete = await query(
                    `SELECT * FROM ${table} WHERE ${WhereId} = ?`, 
                    [Id]
                );
                
                if (!requete || requete.length === 0) {
                    return res.status(404).json({ error: "No data found" });
                }
                
                return res.status(200).json(requete);
            } catch (error) {
                console.error("Error in GetSpecific:", error);
                return res.status(500).json({ error: "Internal server error" });
            }
        }

export const DeleteSpecific  = (table: string,WhereId:string, Id : number ) =>
    async (req: Request, res: Response) => {
        const requete = await query(`Delete FROM  ${table} WHERE ${WhereId}  = ?`,[Id]);
        if (!requete || requete.length === 0) {
            return res.status(500).json({ error: "No data found" });
        }
        else {
            return  res.status(201).json(requete);
        }
    }

    
// 
export const PutSpecific  = (table: string, header : string[][]) =>
    async (req: Request, res: Response) => {
        let insertQuery = `INSERT INTO ${table}`
        header.forEach(element => {
        insertQuery = insertQuery + ` ? VALUES ?`,[element[0],element[1]]
        });
        console.log(insertQuery)
      try{
        const Todos = await query(insertQuery);
        res.status(201).json({'Crée': 'Elément crée'});
      } catch (error) {
        console.error('Erreur :', error);
        res.status(500).json({ error: error });
      }};
    


export const PatchSpecific  = (table: string,WhereId:string, header : string[][]) =>
async (req: Request, res: Response) => {
    let insertQuery = `UPDATE ${table} SET`
    header.forEach(element => {
    insertQuery = insertQuery + ` ? = ?`,[element[0],element[1]]
    insertQuery = insertQuery + `WHERE ${WhereId}  = ?`,element[3];
    console.log(insertQuery)});
    try{
    const Todos = await query(insertQuery);
    res.status(201).json({'Crée': 'Elément crée'});
    } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ error: error });
    }};
        