const express = require('express');
const app = express();
const streamController = require('./controllers/streamController');

app.use(express.json());

app.get('/api/streams', streamController.getStreams);
app.get('/api/logs', streamController.getLogs);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
