import './App.css';
import Register from './Register'
import Home from './Home';
import Editor from './Editor'
import Login from './Login'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {AuthProvider} from './contexts/AuthContext'
import PrivateRoute from './PrivateRoute';
import Navbar from './Navbar'
import {useAuth} from './contexts/AuthContext'

function App() {
  // const {currentUser} = useAuth()
  return (
    <div className="App">
      <AuthProvider>      
        <Router>
          <Navbar />
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
