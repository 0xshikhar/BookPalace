import React from 'react';
import './index.css';
import { render } from 'react-dom';
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import ReadingList from './ReadingList'
import Home from './Home'
import Header from './components/Header'

class App extends React.Component {
  
  render() {
    return (
      <Router>
        <div>
          {/* within Header - added app navingation */}
          <nav>
            <Header />
          </nav>

          {/* defined react-dom routing for the application */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reading" element={<ReadingList />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));
