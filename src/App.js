import './App.css';
import db from './firebase'
import Landing from './Landing'
import Home from './Home';
import Editor from './Editor'
import Login from './Login'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {

  return (
    <div className="App">
       
        <Router>
        <Switch>
        <Route  path="/login">
            <Landing/>
          </Route>
          <Route  path="/signup">
            <Landing/>
          </Route>
          <Route exact path="/Home">
              <Home/>
          </Route>
          <Route exact path="/:id">
              <Editor/>
          </Route>
          
        </Switch>
        </Router>

    </div>
  );
}

export default App;
