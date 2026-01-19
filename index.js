const express = require('express');
const { simulateSlowResponse, getFastResponse } = require('./utility');

const app = express();
const PORT = 4000;

app.use(express.json());

app.get('/api/fast', (req, res) => {
    const startTime = Date.now();
    const response = getFastResponse();
    const endTime = Date.now();

    res.json({
        ...response,
        actualResponseTime: `${endTime - startTime}ms`
    });
});


app.get('/api/slow', async (req, res) => {
    try {
        const startTime = Date.now();
        const result = await simulateSlowResponse();
        const endTime = Date.now();

        res.json({
            ...result,
            actualResponseTime: `${endTime - startTime}ms`,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        const endTime = Date.now();
        res.status(500).json({
            status: 'error',
            error: error.message,
            timestamp: new Date().toISOString(),
            actualResponseTime: `${endTime - Date.now()}ms`
        });
    }
});


app.get('/health', (req, res) => {
    res.json({ status: 'Server is running', port: PORT });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📝 Available endpoints:`);
    console.log(`   - GET /api/fast    (responds quickly)`);
    console.log(`   - GET /api/slow    (random response behavior)`);
    console.log(`   - GET /health      (health check)`);
});
