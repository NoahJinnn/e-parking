import { LOCALE } from '@redux/actions/type';

interface Action {
    type: string;
    data: string;
}
const localeReducer = (state: string = 'en', action: Action) => {
    switch (action.type) {
        case LOCALE:
            return action.data;
        default:
            return state;
    }
};

export default localeReducer;
