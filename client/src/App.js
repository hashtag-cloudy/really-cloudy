import React, { Component } from 'react';
import logo from './logo.svg';
import Console from './Console';
import './App.css';

import io from 'socket.io-client'
let socket = io();

class App extends Component {

    constructor(props) {

        // this should be '/odsapi/{env}/log/'
        const envRegex = /\/odsapi\/(.+)\/log/i;
        const match = envRegex.exec(window.location.pathname);
        const env = match && match.length > 1 ? match[1] : 'all';
        const key = 'msg-logged-on-' + env;

        super(props);
        this.state = {
            messages: [{msg: 'hello'}],
            env: env,
            key: key
        };
    }

    componentDidMount() {

        fetch('/odsapi').then((response) => {
                if (response.ok) {
                    return response
                        .json()
                        .then((json) => {
                            this.setState((state, props) => {
                                state.messages.push({ msg: json.message });
                                state.messages.push({ msg: `listening for messages using key: ${this.state.env}` });
                            });
                        });
                } else {
                    console.log('Network response was not ok.');
                }
            })
            .catch((error) => {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });

        socket.on(this.state.key, (msg) => {
            this.setState((state, props) => {

              if(state.messages.length >= 100) {
                state.messages.shift();
              }
              state.messages.push(msg);
            });
        });
    }

    render() {
        return (
          <div>
            <div className="App">
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Welcome to API log</h2>
              </div>
              <p className="App-intro">
              This is log for API log for environment: {this.state.env}
              </p>
            </div>
            <Console messages={this.state.messages}/>
          </div>

        );
    }
}

export default App;
