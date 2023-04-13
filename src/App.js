import logo from './logo.svg';
import './App.css';
import Header from './features/Header/Container/Header';
import Routers from './routes/Routers';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from './Context/UserProvider';

function App() {

  // console.log = function() {}

  return (
    <div className="App">
      <ToastContainer/>
      <Header/>
      <Routers className="routers"/>
    </div>
  );
}

export default App;
