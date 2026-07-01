import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const getToken = async (userId) => {
    console.log("userId:", userId);

    try {
        const token = jwt.sign(
            { userId },
            process.env.JWTSECRET,
            { expiresIn: "7d" }
        );


        return token;
    } catch (error) {
        console.error("JWT Error:", error);
        throw error;
    }
};

export default getToken;