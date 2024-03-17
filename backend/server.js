const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/save', (req, res) => {
    const { dob, title, category, amount, notes } = req.body;
    const income = category === '월급' ? amount : '';
    const expense = category !== '월급' ? amount : '';
    const newData = `\n${dob},${title},${category},${income},${expense},${notes}`;

    fs.appendFile(path.join(__dirname, 'data.csv'), newData, (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).send('Error saving data');
        }
        res.send('Data saved successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
