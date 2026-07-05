import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        name: string;
        id: string;
        role: Role;
      };
    }
  }
}
router.post("/register", userController.registerUser);
router.get(
  "/me",
  (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    const decoded = jwtUtils.verifyToken(accessToken, config.jwt_access);
    if (typeof decoded === "string") {
      throw new Error("Invalid token");
    }

    const { email, name, id, role } = decoded;
    const required_role = [Role.ADMIN, Role.USER, Role.AUTHOR];
    if (!required_role.includes(role)) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Forbidden: Insufficient role",
      });
    }
    req.user = {
      email,
      name,
      id,
      role,
    };
    next();
  },
  userController.getMyProfile,
);
export const userRoutes = router;
