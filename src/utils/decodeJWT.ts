import jwt from "jsonwebtoken";
import User from "../entities/User";
const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN || "");
    const { id } = decoded;
    return await User.findOne({ id });
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
