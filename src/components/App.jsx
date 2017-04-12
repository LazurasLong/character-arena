import React, { Component } from 'react';

const App = (props) => (
  <div>
    <header className="Header"></header>
    <aside className="Sidebar"></aside>
    { props.children }
    <footer className="Footer"></footer>
  </div>
);

App.displayName = 'App';

export default App;