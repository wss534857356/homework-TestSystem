import { INCREASE, DECREASE, TIMES } from '../constants'

const initialState = {
  number: 1
}

export default function update(state = initialState, action) {
  switch(action.type) {
    case INCREASE:
      return { number: state.number + action.amount }
    case DECREASE:
      return { number: state.number - action.amount }
  }
/*  if(action.type === INCREASE) {
    return { number: state.number + action.amount }
  }
  else if(action.type === DECREASE) {
    return { number: state.number - action.amount }
  }*/
  return state
}