import nconf from 'nconf';
import { join } from 'path';

nconf
  .argv()
  .env()
  .file('config', join(__dirname, 'config.json'))
  .required(['environments']);

const environment = nconf.get('NODE_ENV') || 'development';
const environments = nconf.get('environments');

if (!environments.includes(environment)) {
  const message = `No such environment "${environment}". Available environments are "${environments.join(
    ', '
  )}"`;
  throw new Error(message);
}

nconf.file(environment, join(__dirname, environment.toLowerCase() + '.json'));
nconf.file('default', join(__dirname, 'default.json'));

nconf.set('env', environment);

export default nconf;
