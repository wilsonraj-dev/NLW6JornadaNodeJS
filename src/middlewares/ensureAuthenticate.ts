import { Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
    sub: string;
}

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    //Receber o token
    const authToken = request.headers.authorization;

    //Validar se o token está preenchido
    if(!authToken) return response.status(401).end();

    const [, token] = authToken.split(" ");

    //Validar se o token é válido
    try {
        const { sub } = verify(token ,"1c4d5a10119aed84a74058dc1c4b6ca8") as IPayLoad;

        //Recupear informações do usuário
        request.user_id = sub;

        return next();
    } 
    catch(err) {
        return response.status(401).end();
    }
}