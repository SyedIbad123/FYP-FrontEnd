const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000; // Choose a port number

app.use(express.json());



app.get('https://localhost:8000', async (req, res) => {
    try {
        const filename = 'db.json';
        const data = await fs.promiseses.readFile(filename, 'utf-8');
        const parsedData = JSON.parse(data);
        res.status(200).send(parsedData.images);
    } catch (error) {
        console.error('Error reading db.json:', error);
        res.status(500).send('Error reading images');
    }
});



app.put('/images', async (req, res) => {
    try {
        const filename = 'db.json';
        const existingData = await fs.promises.readFile(filename, 'utf-8');
        const parsedData = JSON.parse(existingData);
        const newImageEntry = req.body.pop(); // Get the latest entry

        parsedData.images.push(newImageEntry);

        await fs.promises.writeFile(filename, JSON.stringify(parsedData));
        res.status(200).send('Image saved successfully');
    } catch (error) {
        console.error('Error saving to db.json:', error);
        res.status(500).send('Error saving image');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
