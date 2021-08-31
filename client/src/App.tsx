import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import './styles/styles.scss'; 

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
