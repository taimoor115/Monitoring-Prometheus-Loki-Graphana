const express = require('express');
const responseTime = require('response-time');
const { simulateSlowResponse, getFastResponse } = require('./utility');
const logger = require('./logger');
const client = require('prom-client');
const app = express();
const PORT = 8000;



const collectDefaultMetrics = client.collectDefaultMetrics;


collectDefaultMetrics({
    register: client.register,

})
app.use(express.json());






const requestResponseTime = new client.Histogram({
    name: "http_express_req_res_time",
    help: "How much time is taken for requests",
    labelNames: ["method", "route", "status_code"],
    buckets: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

})

const totalRequestCounter = new client.Counter({
    name: "total_request_counter",
    help: "Total number of requests received",
    labelNames: ["method", "route", "status_code"]
})

app.use(responseTime((req, res, time) => {
    totalRequestCounter.labels(req.method, req.path, res.statusCode).inc();
    requestResponseTime.labels(req.method, req.path, res.statusCode).observe(time);
}))
app.get('/metrics', async (req, res) => {
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
});
app.get('/api/fast', (req, res) => {
    logger.info("Received request for /api/fast endpoint");
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

        logger.info("Received request for /api/slow endpoint");
        const startTime = Date.now();
        const result = await simulateSlowResponse();
        const endTime = Date.now();

        res.json({
            ...result,
            actualResponseTime: `${endTime - startTime}ms`,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error(`Error in /api/slow endpoint: ${error}`);
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
