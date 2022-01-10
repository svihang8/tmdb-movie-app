import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import {  BrowserRouter as Router, Routes,  Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path = '/' element={<MyRoute/>}/>
        <Route path = '/favourites' element={<Favourites/>}/>
      </Routes>
    </Router>
  );
}

let MyRoute = (props) => {
  return (
    <>
    <Banner {...props}/>
    <Movies {...props}/>
    </>
  )
};


export default App;
