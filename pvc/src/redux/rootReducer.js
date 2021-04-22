import {
    combineReducers
} from 'redux'

import UserReducer from './users/user.reducer'
import SessionReducer from './session/session.reducer'

export default combineReducers({
    user: UserReducer,
    session: SessionReducer
})

