import { NextResponse } from "next/server";
import db from "../../../../config/db";
import bcrypt from 'bcrypt';


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
        })
        console.log("rresponse is ", results);
        return NextResponse.json({ data: results });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}


export async function POST(req) {
    const body = await req.json();
    const hashedPassword = await bcrypt.hash(body.password, 10);

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(`INSERT INTO users(full_name, email, password, city_id, district, state, isactive) VALUES(?,?,?,?,?,?,?)`,
                [body.full_name, body.email, hashedPassword, body.city, body.district, body.state, body.isactive],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
        return new Response("One row inserted..", {status:200})
    } catch (err) {
        console.error("Error:", err);
        return new Response("Internal Server Error")
    }
}


// export async function POST() {
//     const body = await NextRequest.body();
//     try {
//         const results = await new Promise((resolve, reject) => {
//             db.query(`INSERT INTO users (full_name, email, password, city_id, district, state) VALUSE (${body.full_name}, ${body.email}, ${body.password}, ${body.city}, ${body.district}, ${body.state})`, (err, results) => {
//                 if (err) {
//                     reject(err)

//                 } else {
//                     resolve(results)
//                 }
//             });
//         })
//         console.log("rresponse is ", results);
//         return NextResponse.json({ data: results })
//     } catch (err) {
//         return NextResponse.json({ message: err }, { status: 500 })
//     }
// }
