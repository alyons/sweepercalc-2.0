import { applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import metagameMiddleware from './metagame';

const allMiddleware = applyMiddleware(
    apiMiddleware,
    metagameMiddleware,
    thunk
);

export default allMiddleware;
