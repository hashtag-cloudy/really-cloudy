import React from 'react';
import ReactDOM from 'react-dom';
import Console from './Console';

it('renders without crashing without messages', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Console />, div);
});

it('renders without crashing with messages', () => {
  const div = document.createElement('div');
  const messages = ['message 1', 'message 2'];

  ReactDOM.render(<Console messages={messages}/>, div);
});
