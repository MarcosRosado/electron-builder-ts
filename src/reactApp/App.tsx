import React, {Component} from 'react';
import './static/App.css';
import Router from "./controllers/router";
import {Provider} from "react-redux";
import { createStore } from "redux";
import reducers from "./controllers/store";
import {BrowserRouter} from "react-router-dom";


const store = createStore(reducers);

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <React.Suspense fallback={<div> Loading... </div>}>
                        <Provider store={store}>
                            <Router />
                        </Provider>
                    </React.Suspense>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

