import axios from 'axios';

const initialState ={
    user: {},
    entry: '',
    entries:[]
}

const GET_USER = 'GET_USER'
const ADD_ENTRY = 'ADD_ENTRY'

export function getUser(){
    let userData = axios.get('/auth/me').then( res => {
        return res.data;
    })
    return {
        type:GET_USER,
        payload: userData
    }
}

export function addEntry(e) {
    return {
      type: ADD_ENTRY,
      payload: e
    }
  }

export default function reducer(state= initialState, action){
    switch(action.type){
        case GET_USER + '_FULFILLED':
        return Object.assign({}, state, {user: action.payload})
        case ADD_ENTRY:
        return Object.assign({}, state, {entry: action.payload});
        default:
    return state;
    }
}