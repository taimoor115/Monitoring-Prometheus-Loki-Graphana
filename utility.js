
function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function simulateSlowResponse() {
    const behavior = Math.floor(Math.random() * 4); // 0, 1, 2, 3
    let delay;

    switch (behavior) {
        case 0:
            // Long response (3000-5000ms)
            delay = getRandomDelay(3000, 5000);
            await sleep(delay);
            return {
                status: 'success',
                data: 'This is a long response after a significant delay. '.repeat(10),
                delay
            };

        case 1:
            // Normal response (500-1000ms)
            delay = getRandomDelay(500, 1000);
            await sleep(delay);
            return {
                status: 'success',
                data: 'This is a normal response',
                delay
            };

        case 2:
            // Error response (1000-2000ms, then throw)
            delay = getRandomDelay(1000, 2000);
            await sleep(delay);
            throw new Error('Random error occurred in slow API');

        case 3:
            // Medium late response (1500-2500ms)
            delay = getRandomDelay(1500, 2500);
            await sleep(delay);
            return {
                status: 'success',
                data: 'This is a medium-late response',
                delay
            };

        default:
            return { status: 'success', data: 'Default response', delay: 0 };
    }
}

/**
 * Sleep helper function - pauses execution for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a fast API response
 * @returns {object} Fast response with metadata
 */
function getFastResponse() {
    return {
        status: 'success',
        data: 'This is a fast response',
        timestamp: new Date().toISOString(),
        responseTime: '<100ms'
    };
}

module.exports = {
    getRandomDelay,
    simulateSlowResponse,
    sleep,
    getFastResponse
};
