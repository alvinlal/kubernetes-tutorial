const redis = require("redis");

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT, "redis");

const cache = (req, res, next) => {
  const { id } = req.params;
  client.get(id, (err, data) => {
    if (err) throw err;
    if (data != null) {
      return res.json(JSON.parse(data));
    } else {
      next();
    }
  });
};

const setCache = (key, value) => {
  client.setex(key, 3600, value);
};

module.exports = {
  cache,
  setCache,
};
