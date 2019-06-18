import { SOUNDS } from '../shared/sounds';
import * as ActionTypes from './actionTypes';

export const Sounds = (state = SOUNDS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SOUND_FILE:
            var soundfile = action.payload;
            soundfile.id = state.length;
            soundfile.date = new Date().toISOString();
            soundfile.featured = false;
            soundfile.user = 1;
            soundfile.image = '/assets/images/samplewave.jpg';
            return state.concat(soundfile);
        
        case ActionTypes.REMOVE_SOUND_FILE:
            var soundfile = action.payload;
            state = state.filter((obj)=>parseInt(obj.id,10)!=parseInt(soundfile.id,10))
            return state;

        default:
            return state;
    }
}

