import { KEYWORDS_MAPTO_CDM_WORDS } from '../action-types';

const keywordsMaptoCdmWordsReducer = (state = {}, action) => {
    switch (action.type) {
        case KEYWORDS_MAPTO_CDM_WORDS.SET_KEYWORDS_MAPTO_CDM_WORDS: {
            const isExistKeyword = action.keyword in state;
            return (
                !isExistKeyword && {
                    ...state,
                    [action.keyword]: action.cdmWords,
                }
            );
        }
        default: {
            return state;
        }
    }
};

export default keywordsMaptoCdmWordsReducer;
