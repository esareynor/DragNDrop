import './assets/App.css';
import GlobalState from './contexts/GlobalState';
import Routes from './routes/Routes';

function App() {
  return (
    <GlobalState>
      <Routes/>
    </GlobalState>
  );
}

export default App;
