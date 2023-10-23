const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bp = require('body-parser');

const app = express();
const port = 8000

app.use(cors());
app.use(bp.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db',
    port: 3306
});

//Check DB Connection
db.connect(error => {
    try {
        console.log('database connected');
    } catch (error) {
        console.error(error);
    }
});

// Get all data
app.get('/student', (req, res) => {
    const qr = `SELECT * FROM student`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error get all data'
            })
        } else {
            res.send({
                message: 'Get all data',
                data: result
            })
        }
    })
})

// Get single data
app.get('/student/:id', (req, res) => {
    const { id } = req.params;
    const qr = `SELECT * FROM student WHERE id = ?`;

    db.query(qr, id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error get single data'
            })
        }

        if (result.length > 0) {
            res.send({
                message: 'Get single data',
                data: result
            })
        } else {
            res.send({
                message: 'Data not found'
            })
        }
    })
})

// Create data
app.post('/student', (req, res) => {
    const { fname, lname, phone, address } = req.body;

    const qr = `
        INSERT INTO student (fname, lname, phone, address)
        VALUE (?,?,?,?)
    `;

    db.query(qr, [fname, lname, phone, address], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error creating data'
            })
        } else {
            res.send({
                message: 'Data created successfully'
            })
        }
    })
})

// Update data
app.put('/student/:id', (req, res) => {
    const { id } = req.params;
    const { fname, lname, phone, address } = req.body;

    const qr = `
        UPDATE student
        SET
            fname = ?,
            lname = ?,
            phone = ?,
            address = ?
        WHERE id = ?
    `;

    db.query(qr, [fname, lname, phone, address, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error updating data'
            })
        } else {
            res.send({
                message: 'Data updated successfully'
            })
        }
    })
})

// Delete all data
app.delete('/student', (req, res) => {
    const qr = `DELETE FROM student`

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error to delete all data'
            })
        } else {
            res.send({
                message: 'All data deleleted successfully'
            })
        }
    })
})

// Delete single data
app.delete('/student/:id', (req, res) => {
    const { id } = req.params;
    const qr = `DELETE FROM student WHERE id = ?`

    db.query(qr, id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error to delete single data'
            })
        } else {
            res.send({
                message: 'Single data deleleted successfully'
            })
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})