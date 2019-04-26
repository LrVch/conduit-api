import app from './app';
import config from './config';

const port = config.get('port');

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
  console.log(`Current envirnoment is "${config.get('env')}"`);
});
