import { registerUser } from "./register.auth.controller";
import { getUsers, getuser } from "./get.auth.controller";
import { login } from "./login.auth.controller";
// import { deleteEmployee } from "./delete.employee.controller";
import { changePassword } from "./change.auth.controller";
import { forgotPassword } from "./forget.auth.controller";
import { resetPasswordHandler} from "./resetPassword.auth.controller"
import { activateUser } from "./activate.auth.controller"

export { registerUser, changePassword,getuser,resetPasswordHandler, forgotPassword,getUsers, activateUser, login };

