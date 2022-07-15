import { combineReducers } from 'redux';
//import user from './user_reducer';

const rootReducer = combineReducers({
    //user
})

export default rootReducer;

//store안에 여러가지 reducer가 존재함. state가 변하는 것을 보여주고 변한 state의 마지막 값을 리턴해주는게 reducer
//combineReducers는 여러 reducer를 합하는 기능을 하고 있다.