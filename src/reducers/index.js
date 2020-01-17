import { combineReducers } from 'redux';
import metagame from './metagameReducer';
import usage from './usageReducer';

export default combineReducers({
    metagame,
    usage
});
