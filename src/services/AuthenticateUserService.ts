import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepositories } from "../repositories/UserRepositories";


interface IAuhenticateRequest {
    email: string;
    password: string;
}


class AuthenticateUserService {
    async execute({email, password}: IAuhenticateRequest) {
        const usersRepositories = getCustomRepository(UserRepositories);
    
        const user = await usersRepositories.findOne({
            email
        });
        if(!user) throw new Error("Email/Password incorrect!");

        const passwordMatch =  await compare(password, user.password);
        if(!passwordMatch) throw new Error("Email/Password incorrect!");

        const token = sign({
            email: user.email
        }, "1c4d5a10119aed84a74058dc1c4b6ca8", {
            subject: user.id,
            expiresIn: "1d",
        });
        return token;
    }
}

export { AuthenticateUserService };