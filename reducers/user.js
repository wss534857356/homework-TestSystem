import { LOGIN } from '../constants'

const initialState = {
  userNumber: '',
  password: '',
  userName: '',
  userId: ''
}

export default function update(state = initialState, action) {
  if(!localStorage.user){
    switch (action.type) {
      case LOGIN: 
        return Object.assign({}, state, {
          userNumber: action.userNumber,
          password: action.password,
          userName: action.userName,
          userId: action.userId
        })
      default :
        return state;
    }
  }
}