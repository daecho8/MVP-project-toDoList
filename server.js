import express from "express";
import pg from "pg";
import { readFile } from "fs/promises";
import dotenv from "dotenv";

dotenv.config();
// const PORT = 4000;
const { DATABASE_URL, NODE_ENV, PORT} = process.env;

const app = express();
app.use(express.json());
app.use(express.static('static')); 

const pool = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: NODE_ENV === "production" ? { rejectionUnauthorized: false } : false
});
app.use(express.urlencoded({ extended: true }));
//sss
// const pool = new pg.Pool({
//     // database: 'todolist'
// });

app.get("/", (req, res) => {
    readFile("static/index.html", "utf-8").then(string => {
        res.send(string);
    });
});

app.get("/list", (req, res) => {
    pool.query('SELECT * FROM taskList').then((data) => {
        res.send(data.rows);
    });
});

app.post("/list", (req, res) => {
    const taskName = req.body.task_name;  
    const taskLocation = req.body.task_location;
    const taskNumber = req.body.task_number;
    pool.query(`INSERT INTO taskList(task_name, task_location, task_number) VALUES ($1, $2, $3) RETURNING *;`, [taskName, taskLocation, taskNumber])
    .then((data) => {
        console.log(data);
        if (data.rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.send(data.rows[0]);
        }
    })
});

app.delete("/list/:id", (req, res) => {
    const id = req.params.id;
    pool.query(`DELETE FROM taskList WHERE id = $1 RETURNING *;`, [id]).then((data) => {
        console.log(data);
        if(data.rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.send(data.rows[0]);
            // res.sendStatus(204);
        }
    });
});

app.use((err, req, res, next)=> {
    res.sendStatus(500);
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});