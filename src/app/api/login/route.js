import db from "../../../../config/db";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function POST(req) {
    const body = await req.json();
    try {
        const user = await getUserByEmail(body.email);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(body.password, user.password);

        if (passwordMatch) {
            const token = uuidv4();

            await new Promise((resolve, reject) => {
                db.query(`UPDATE users SET token = ? WHERE email = ?`, [token, user.email], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });

            const cookie = `token=${token}; Path=/; HttpOnly; SameSite=Strict; Secure`;

            const response = new Response("Login successful");
            response.headers.append('Set-Cookie', cookie);

            return response;
        } else {
            return new Response("Incorrect password", { status: 401 });
        }
    } catch (error) {
        console.error("Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

async function getUserByEmail(email) {
    try {
        const user = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
        return user;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }
}
