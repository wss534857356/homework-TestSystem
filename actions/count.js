import { INCREASE, DECREASE, TIMES } from '../constants'

export function increase(n) {
  return {
    type: INCREASE,
    amount: n
  }
}

export function decrease(n) {
  return {
    type: DECREASE,
    amount: n
  }
}

export function time(n, state, delay = 1000) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increase(n));
    }, delay)
  }
}