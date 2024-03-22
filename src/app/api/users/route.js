import db from "../../../../config/db";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const results = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            });
        });
        console.log("response is ", results);
        return NextResponse.json({ data: results });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}

export async function POST(req) {
    const body = await req.json();
    const hashedPassword = await bcrypt.hash(body.password, 10);

    try {
        const token = uuidv4();

        const results = await new Promise((resolve, reject) => {
            db.query(`INSERT INTO users(full_name, email, password, city_id, district, state, isactive, token) VALUES(?,?,?,?,?,?,?,?)`,
                [body.full_name, body.email, hashedPassword, body.city, body.district, body.state, body.isactive, token],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });

        const cookie = `token=${token}; Path=/; HttpOnly; SameSite=Strict`;

        return NextResponse.json({ message: "One row inserted..", token }, { headers: { 'Set-Cookie': cookie } });

    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
