import express,{ Request, Response, Router,NextFunction  } from "express";
import { query } from "../db";

export const GetAll  = (tablename: string) =>
    async (req: Request, res: Response) => {
        const requete = await query('SELECT * from ?',[tablename]);
        if(!requete)
        {
            res.status(500).json({ error: "ouch pas de donné" });
        }
        else{
            res.status(201).json(requete);
        }
    }



    export const GetSpecific = (table: string, Id: number) =>
        async (req: Request, res: Response) => {
            try {
                console.log("getspe", table, Id);
                
                const requete = await query(
                    `SELECT * FROM ${table} WHERE Employe_ID = ?`, 
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

    
export const DeleteSpecific  = (table: string, Id : number ) =>
    async (req: Request, res: Response) => {
        const requete = await query('Delete FROM ? WHERE Employe_ID  = ?',[table,Id]);
        if (!requete || requete.length === 0) {
            res.status(500).json({ error: "No data found" });
        }
        else {
            res.status(201).json(requete);
        }
    }