import express from 'express';
import cors from 'cors';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import axios from 'axios';

const app = express();
app.use(cors());

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-v88tfgqc.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'this is the back end api connection',
  issuer: 'https://dev-v88tfgqc.us.auth0.com/',
  algorithms: ['RS256'],
}).unless({ path: ['/'] });

app.use(verifyJwt);

app.get('/', (req, res) => {
  res.send('Hello from index route');
});

app.get('/protected', (req, res) => {
  res.send('Hello from protected route');
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Internal server error';
  res.status(status).send(message);
});

app.listen(4000, () => console.log('Server running on port 4000'));
