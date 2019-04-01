import express from 'express';
import * as http from 'http';

const app = express();

app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello World!'
  });
});

export default http.createServer(app);
