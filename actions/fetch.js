import { browserHistory } from 'react-router'
import { LOGIN_URL } from '../urls'
import { LOGIN } from '../constants'

function login(userNumber, password, userName, userId) {
  console.log(userNumber);
  return {
    type: LOGIN,
    userNumber: userNumber,
    password: password,
    userName: userName,
    userId: userId
  }
}

export function fetch_login(userNumber, password) {
  return dispatch => {
    fetch(`${LOGIN_URL}?userNumber=${userNumber}&password=${password}`)
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      if(data.code==1){
        let result = data.result;
        dispatch(login(result.userNumber, password, result.userName, result.userId));
        browserHistory.push('/');
      }
    })
    .catch(function(error) {
      console.log('request failed', error)
    })
  }
}