import mongoose from 'mongoose';
import config from '../config';

console.log(`Current uri is "${config.get('mongoose:uri')}"`);

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

export default mongoose;
