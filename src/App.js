import './App.css';
import Start from './components/Start';
import Welcome from './components/Welcome';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/start" element={<Start/>} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
