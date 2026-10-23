import { useState } from 'react';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import './App.css';
import About from './About.jsx';
import Registration from './Registration.jsx';
import logo from "./assets/New Logo1.png";
import classroom from "./assets/classroom.png";

function Header(){
  return(
    <header>
      <img src={logo} alt='DSA college logo' />
      <ul className='topnav'>
        <li><Link to={"/"}>Home</Link></li>
        <li><Link to={"/About"}>About</Link></li>
        <li><Link to={"/Registration"}>Registration</Link></li>
        <li className='dropdown'><Link to={"#"}>Department</Link>
        <div className='dropdown-content'>
          <Link>CSE</Link>
          <Link>ME</Link>
          <Link>EEE</Link>
          <Link>ECE</Link>
          <Link>CIV</Link>
        </div>
        </li>
      </ul>
    </header>
  )
}
function Home(){
  return(
    <div className='welcome-section'>
      <h1><i id="school" class="material-icons">school</i> Welcome to College </h1>
      <p>Learn...Innovate<i id="bulb" class="material-icons">lightbulb_outline</i>...Excel</p>
    </div>
  )
}
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='About' element={<About/>} />
      <Route path='Registration' element={<Registration/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
