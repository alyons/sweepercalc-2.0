import { combineReducers } from 'redux';
import app from './appReducer';
import metagame from './metagameReducer';
import usage from './usageReducer';

export default combineReducers({
    app,
    metagame,
    usage
});
