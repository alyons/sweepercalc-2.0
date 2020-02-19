import { applyMiddleware } from 'redux';
import metagameMiddleware from './metagame';

const allMiddleware = applyMiddleware(
    metagameMiddleware
);

export default allMiddleware;
