import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as reducers from './reducers'
import { App, Home, Login } from './components'

// muiTheme 样式
const muiTheme = getMuiTheme({
  fontFamily : 'Changa'
})

// reducer和router连接
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

// 解决iOS上的300ms错误
injectTapEventPlugin({
  shouldRejectClick: function (lastTouchEventTimestamp, clickEventTimestamp) {
    return true;
  }
});

// 查看reducer树
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)
/*
  为onTouchTap解决一下两个issue的临时解决方案, 随时会被取缔：
  https://github.com/facebook/react/issues/436;
  https://github.com/facebook/react/issues/1170;
*/

// applyMiddleware()方法用于作为action的解释器的中间件,
// thunk用于解释action中的函数
const store = createStore(
  reducer,
  DevTools.instrument(),
  applyMiddleware(thunk)
)

// router中的路由与store绑定
const history = syncHistoryWithStore(browserHistory, store)

// Provider 传顶层store,
// MuiThemeProvider 控制MuiTheme样式
// Router 管理路由表
// Route 分发底层路由
// DevTools 管理reducer树
render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="/home" component={Home}/>
          </Route>
          <Route path="/login" component={Login}/>
        </Router>
        <DevTools />
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);