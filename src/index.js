import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose   } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

// Firebase Setup
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig'


const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reactReduxFirebase(fbConfig, {
      // To sync auth profile to user collection
      userProfile: 'users', 
      useFirestoreForProfile: true, 
      // this will ensure to check auth is ready before to rendering to the DOM
      attachAuthIsReady: true
    }), // redux binding for firebase
    reduxFirestore(fbConfig) // redux bindings for firestore
  )
);


store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(

    <Provider store={store}>
      <App />
    </Provider>, 
  
  document.getElementById('root')
  );
  registerServiceWorker();
});


