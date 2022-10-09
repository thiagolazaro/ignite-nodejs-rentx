import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

import { CreateUserController } from "../modules/accounts/userCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/userCases/updateUserAvatar/UpdateUserAvatarController";
import { UpdateUserAvatarUseCase } from "../modules/accounts/userCases/updateUserAvatar/UpdateUserAvatarUseCase";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { usersRoutes };
