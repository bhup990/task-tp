import { v4 as uuidv4 } from 'uuid';
import db from "../../../../config/db";
 
export async function POST(req) {
    const { email } = await req.json();
   
    try {
        const token = uuidv4();
        const results = await new Promise((resolve, reject) => {
            db.query(`UPDATE users SET token = ? WHERE email = ?`, [token, email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
 
        const cookie = `token=${token}; Path=/; HttpOnly; SameSite=Strict; Secure`;
 
        const response = new Response("Logged out successfully.");
        response.headers.append('Set-Cookie', cookie);
 
        return response;
    } catch (err) {
        console.error("Error:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}
