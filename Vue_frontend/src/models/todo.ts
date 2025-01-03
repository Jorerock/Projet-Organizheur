/**
 * On définit une interface qui représente notre modèle de données
 * (la structure que nous manipulons pour représenter une entité)
 */

export interface Todo {
  List_ID: number;
  Todo_Name: string;
  Todo_End: boolean;
  Todo_Echeance_date?: string;
  Todo_ID: number;
  Todo_Completion_Date?: Date;
  Todo_Created_date?:Date;
  Employe_ID:number;
  Employe_ID_1:number;
  description : string
}



// export interface Todo {
//   id: number;
//   label: string;
//   done: boolean;
//   dueDate?: Date;
//   }
