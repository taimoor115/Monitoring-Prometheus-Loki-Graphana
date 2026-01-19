const { createLogger, format, transports } = require("winston");
const LokiTransport = require("winston-loki");

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new LokiTransport({
            labels: {
                app_name: "monitoring_app"
            },
            host: "http://127.0.0.1:3100"
        })
    ]
});

module.exports = logger;