import './App.css';
import Register from './Register'
import Home from './Home';
import Editor from './Editor'
import Login from './Login'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {AuthProvider} from './contexts/AuthContext'
import PrivateRoute from './PrivateRoute';
import Navbar from './Navbar'
function App() {
  return (
    <div className="App">
      <AuthProvider>      
        <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <div>
              <div className="navbar" >
                  <Navbar  />
              </div>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/:id" component={Editor} />
            </div>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
