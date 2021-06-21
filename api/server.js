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

app.get('/protected', async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    console.log(accessToken);
    const response = await axios.get(
      'https://dev-v88tfgqc.us.auth0.com/userinfo',
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const userInfo = response.data;
    console.log(userInfo);
    res.send(userInfo);
    // res.send('Hello from protected route');
  } catch (error) {
    res.send(error.message);
  }
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
