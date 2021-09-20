import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import store, {history} from './store'
import MyRouter from './route/Router';

import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import './assets/custom.scss';

const App = ()=> {
  return (
    //모든 상태는 store를  지나쳐간다. 
    <Provider store ={store}>
      <ConnectedRouter history={history}>
        <MyRouter/>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
