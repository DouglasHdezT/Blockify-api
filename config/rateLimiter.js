const rateLimiter = require("express-rate-limit");

const time = process.env.LIMITERTIME || 10 * 60 * 1000;
const quota = process.env.LIMITERQUOTA || 100;

const limiter = rateLimiter({
    windowMs: time,
    max: quota,
});

module.exports = {
    limiter
}