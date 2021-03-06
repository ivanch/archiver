import './App.css';

import Archive from './components/archive/Archive';
import Screenshot from './components/screenshot/Screenshot';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/screenshot/:id">
                        <Screenshot />
                    </Route>

                    <Route path="/">
                        <h1>Archiver</h1>

                        <Archive />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
