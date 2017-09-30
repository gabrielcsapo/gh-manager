const express = require('express');
const path = require('path');
const debug = require('debug')('gh-manager');
const metrics = require('gh-metrics');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/api/metrics', (req, res) => {
  const user = req.body.user;
  const keys = req.body.keys;

  metrics({
    token: GITHUB_TOKEN,
    user,
    keys,
    limit: 100
  }, (error, results) => {
    if(error) {
      res.status(500).send({ error });
    } else {
      res.status(200).send({ results: JSON.parse(results) });
    }
  })
});

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  debug(`server listening on port ${port}`);
});
