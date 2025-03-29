const express = require('express');
const winston = require('winston');
const app = express();
const port = 3000;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'Calculator Microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

app.use(express.json());

const logOperation = (operation, num1, num2) => {
    logger.info(`New ${operation} request: ${num1} and ${num2}`);
};

app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    if (isNaN(num1) || isNaN(num2)) return res.status(400).json({ error: 'Invalid numbers' });
    logOperation('addition', num1, num2);
    res.json({ result: Number(num1) + Number(num2) });
});

app.get('/subtract', (req, res) => {
    const { num1, num2 } = req.query;
    if (isNaN(num1) || isNaN(num2)) return res.status(400).json({ error: 'Invalid numbers' });
    logOperation('subtraction', num1, num2);
    res.json({ result: Number(num1) - Number(num2) });
});

app.get('/multiply', (req, res) => {
    const { num1, num2 } = req.query;
    if (isNaN(num1) || isNaN(num2)) return res.status(400).json({ error: 'Invalid numbers' });
    logOperation('multiplication', num1, num2);
    res.json({ result: Number(num1) * Number(num2) });
});

app.get('/divide', (req, res) => {
    const { num1, num2 } = req.query;
    if (isNaN(num1) || isNaN(num2)) return res.status(400).json({ error: 'Invalid numbers' });
    if (Number(num2) === 0) return res.status(400).json({ error: 'Cannot divide by zero' });
    logOperation('division', num1, num2);
    res.json({ result: Number(num1) / Number(num2) });
});

app.listen(port, () => {
    console.log(`Calculator microservice running at http://localhost:${port}`);
});
