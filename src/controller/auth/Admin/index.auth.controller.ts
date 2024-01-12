import { register } from "./register.auth.controller";
import { getUsers, getuser } from "./get.auth.controller";
import { login } from "./login.auth.controller";
import { changePassword } from "./change.auth.controller";
import { forgetPassword } from "./forget.auth.controller";
import { DeleteUser } from "./delete.auth.controller"
import { resetPasswordHandler } from "./resetpassword.auth.controller"
export { register, changePassword,getuser,forgetPassword,getUsers,resetPasswordHandler, login, DeleteUser };
