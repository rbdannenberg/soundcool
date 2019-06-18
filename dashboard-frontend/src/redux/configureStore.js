import { createStore, combineReducers} from 'redux';
import { Leaders } from './leaders';
import { Sounds } from './sounds';
import { Projects } from './projects';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            leaders: Leaders,
            projects: Projects,
            sounds: Sounds
        })
    );

    return store;
};