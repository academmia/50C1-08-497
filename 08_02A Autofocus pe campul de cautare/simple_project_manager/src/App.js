import React, { Component } from 'react';
import ProjectList from './projects/ProjectList';
import './App.css';

class App extends Component {
  title = 'Simple Project Manager';

  render() {
    return (
      <main className="container pt-3">
        <div className="row justify-content-center">
          <h1 className="col-8 bg-primary p-3 text-white"> { this.title } </h1>
        </div>
          <ProjectList />
      </main>
    );
  }
}

export default App;
