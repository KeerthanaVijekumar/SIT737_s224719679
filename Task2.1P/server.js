const express = require("express");

const app = express();
const port = 3040;

// Function to convert text to uppercase
const convertToUpperCase = (text) => text.toUpperCase();

// API endpoint
app.get("/convertUpperCase", (req, res) => {
    const text = req.query.text;

    if (!text) {
        return res.status(400).json({ statusCode: 400, error: "Please provide a text query parameter." });
    }

    res.json({ statusCode: 200, data: convertToUpperCase(text) });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log("Enter text to convert to uppercase:");

    // Capture user input from stdin
    process.stdin.on("data", (data) => {
        const text = data.toString().trim();
        if (!text) {
            console.log("No input provided.");
            return;
        }

        const url = `http://localhost:${port}/convertUpperCase?text=${encodeURIComponent(text)}`;
        console.log(`Click this link to open in your browser to see the uppercase :\n${url}`);
    });
});
