// Imports
var jwt = require('jsonwebtoken');
// import {Response, Router ,NextFunction} from "express";
import { Employe } from "../models/employe"
import { Request, Response, NextFunction } from 'express';
// var cookieParser = require('cookie-parser')
var cookies = require('js-cookie')

const tokensign = 'test';

// const tokensign = process.env.JWT_SIGN_SECRET 
export function generateTokenForUser(userData: Employe)
{
  const token =  jwt.sign(
    { Employe_ID: userData.Employe_ID, Admin: userData.Admin }, 
    tokensign, 
    { expiresIn: '1h' }
  );
  console.log('token',token)
  return token
}

export interface UserRequest extends Request {
  user?: { Employe_ID: number ,Admin: boolean };
}

export function Connect(req: UserRequest, res: Response, next: NextFunction)
{
  const token = req.cookies['token'];
  if(token != null) {
      const jwtToken = jwt.verify(token,tokensign) ;
      req.user = {
        Employe_ID  : jwtToken.Employe_ID,
        Admin : jwtToken.Admin 
      };
        next()
}else{
    return res.status(401).json({ message: 'Pas de token présent dans le cookie' });
  }
}

export const adminConnect = (req: UserRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.Admin) {
    next();
  } else {
    return res.status(403).json({ message: "admin connect marche pas" });
  }
};

export const GETuserID = (req: any) => {
  const token = req.cookies['token'];
  if(token != null) {
    const jwtToken = jwt.verify(token,tokensign) ;
    return(jwtToken.Employe_ID)
}
  // if (req.user && req.user.Employe_ID) {
  //   return(req.user.Employe_ID)
  // }
};
