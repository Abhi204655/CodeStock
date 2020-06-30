import React from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import { Provider } from 'react-redux';
import store from './redux/store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/pages/Landing';

import 'antd/dist/antd.css';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="main">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/code" component={CodeEditor} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
