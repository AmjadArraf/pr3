import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ShowForm from './components/showform';
import background from './pics/beach.jpeg'
import FetchData from './components/FetchData';



function App() {
  return (
    <div className="App">
      <div className="mainCon" style={{ backgroundImage: `url(${background})`}}>
       <ShowForm/>

      <FetchData/>
      </div>
    </div>
  );
}

export default App;
