import * as http from 'http';
import app from './server';

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

// const { createServer } = http;

// class Hello {
//   constructor() {}

//   save() {}
// }

// export const sum = (a: number, b: number): number => {
//   return a + b;
// };

// const server = createServer((req, res) => {
//   res.end('hello world');
// });

// server.listen(3000);
