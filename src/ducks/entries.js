import axios from 'axios';

const initialState ={
    entries: ''
}

const ADD_ENTRY = 'ADD_ENTRY'
const SINGLE_ENTRY = 'SINGLE_ENTRY'

export function addEntry(e) {
    return {
      type: ADD_ENTRY,
      payload: e
    }
  }


export default function reducer(state= initialState, action){
        switch (action.type) {
          case ADD_ENTRY:
            return this.setState({entries: action.payload});
        default:
    return state;
    }
}