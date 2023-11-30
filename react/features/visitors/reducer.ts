import { CONFERENCE_WILL_LEAVE } from '../base/conference/actionTypes';
import ReducerRegistry from '../base/redux/ReducerRegistry';

import {
    I_AM_VISITOR_MODE,
    UPDATE_VISITORS_COUNT,
    VISITOR_PROMOTION_REQUEST,
    VISITOR_PROMOTION_REQUEST_DENIED
} from './actionTypes';
import { IPromotionRequest } from './types';

const DEFAULT_STATE = {
    count: -1,
    iAmVisitor: false,
    showNotification: false,
    promotionRequests: []
};

export interface IVisitorsState {
    count?: number;
    iAmVisitor: boolean;
    promotionRequests: IPromotionRequest[];
}
ReducerRegistry.register<IVisitorsState>('features/visitors', (state = DEFAULT_STATE, action): IVisitorsState => {
    switch (action.type) {
    case CONFERENCE_WILL_LEAVE: {
        return {
            ...state,
            ...DEFAULT_STATE
        };
    }
    case UPDATE_VISITORS_COUNT: {
        if (state.count === action.count) {
            return state;
        }

        return {
            ...state,
            count: action.count
        };
    }
    case I_AM_VISITOR_MODE: {
        return {
            ...state,
            iAmVisitor: action.enabled
        };
    }
    case VISITOR_PROMOTION_REQUEST: {
        const currentRequests = state.promotionRequests || [];

        currentRequests.push(action.request);

        return {
            ...state,
            promotionRequests: [ ...currentRequests ]
        };
    }
    case VISITOR_PROMOTION_REQUEST_DENIED: {
        let currentRequests = state.promotionRequests || [];

        currentRequests = currentRequests.filter(r => r.from !== action.request.from);

        return {
            ...state,
            promotionRequests: currentRequests
        };
    }
    }

    return state;
});
