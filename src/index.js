import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import './index.css';
import 'animate.css/animate.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';


const middleware = [ thunk ]

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
    <div className="container-fluid">
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
