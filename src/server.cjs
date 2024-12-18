const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Serve the data.json file
app.get('/data.json', (req, res) => {
    console.log('Request for /data.json received');
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err); // Log the error
            return res.status(500).json({ error: 'Failed to load data' });
        }
        try {
            res.json(JSON.parse(data)); // Try parsing and sending the JSON
        } catch (parseErr) {
            console.error('Error parsing data.json:', parseErr); // Log parse errors
            return res.status(500).json({ error: 'Failed to parse data' });
        }
    });
});

// Update the data.json file
app.post('/updateData', (req, res) => {
    const updatedData = req.body;

    // Ensure the content data is properly escaped (if needed)
    updatedData.forEach(item => {
        if (item.content) {
            // Manually escape any problematic quotes in the content if needed
            item.content = item.content.replace(/"/g, '\\"'); // Escape quotes in content
        }
    });

    console.log("Received updated data:", updatedData); // Log the received data

    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(updatedData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing to data.json:', err); // Log any errors while writing
            return res.status(500).json({ error: 'Failed to update data' });
        }
        console.log('Data updated successfully');
        res.json({ success: 'Data updated successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
