const { getStreamStatus, getLogs } = require('../models/streamModel');

exports.getStreams = async (req, res) => {
  const streams = await getStreamStatus();
  res.json(streams);
};

exports.getLogs = async (req, res) => {
  const logs = await getLogs();
  res.json(logs);
};
