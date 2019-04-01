import config from './config';
import app from './server';

const port = config.get('port');

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
  console.log(`Current envirnoment is "${config.get('env')}"`);
});
