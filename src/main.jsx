import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

  const defaultState = {
    counter: 0
  }

  const reducer = (state = defaultState,actions) =>{
    switch (actions.type) {
      case 'ADD':
        return {...state,counter: state.counter + actions.payload}
      default:
        return state
    }
  }
const store = createStore(reducer)




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
