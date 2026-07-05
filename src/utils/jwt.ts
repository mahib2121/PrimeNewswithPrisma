// import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

// const createToken = (
//   payload: JwtPayload,
//   secret: string,
//   expiresIn: SignOptions,
// ) => {
//   const token = jwt.sign(payload, secret, {
//     expiresIn,
//   } as SignOptions);

//   return token;
// };

// const verifyToken = (token: string, secret: string) => {
//   try {
//     const verifiedToken = jwt.verify(token, secret);
//     return {
//       success: true,
//       data: verifiedToken,
//     };
//   } catch (error: any) {
//     console.log("Token verification failed:", error);
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// };

// export const jwtUtils = {
//   createToken,
//   verifyToken,
// };

import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: SignOptions["expiresIn"],
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtUtils = {
  createToken,
  verifyToken,
};
