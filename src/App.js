import './App.css';
import Register from './Register'
import Home from './Home';
import Editor from './Editor'
import Login from './Login'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {AuthProvider} from './contexts/AuthContext'
import PrivateRoute from './PrivateRoute';

function App() {

  return (
    <div className="App">
      <AuthProvider>      
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/:id" component={Editor} />
          </Switch>
        </Router>
      </AuthProvider>   
    </div>
  );
}

export default App;
