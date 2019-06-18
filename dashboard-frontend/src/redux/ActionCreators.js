import * as ActionTypes from './actionTypes';

export const addSoundFile = (name, image, description) => ({
    type: ActionTypes.ADD_SOUND_FILE,
    payload: {
        name: name,
        image: image,
        description: description
    }
});

export const removeSoundFile = (id) => ({
    type: ActionTypes.REMOVE_SOUND_FILE,
    payload: {
        id: id
    }
});