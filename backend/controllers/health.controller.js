// controllers/health.controller.js
const getHealth = (req, res) => {
  res.json({
    status: 'ok',
    service: 'backend',
    time: new Date().toISOString(),
  });
};

module.exports = { getHealth };
