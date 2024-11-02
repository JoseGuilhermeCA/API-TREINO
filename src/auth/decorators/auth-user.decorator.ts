import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Usuario } from "../../usuario/entities/usuario.entity";


const AuthUser = createParamDecorator((_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const usuario = request.user as Usuario;
    return usuario;
})

export default AuthUser;