import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';


/*
function App() {
  return (
    <Router>
      <div>*/
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}/*
        <Routes>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Routes>
      </div>
    </Router>
  );
}
*/

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element ={<LandingPage/>}/>
          <Route exact path="/login" element ={<LoginPage/>}/>
          <Route exact path="/register" element ={<RegisterPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home 안녕하세요</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About 어바웃 페이지 </h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard 대시보드 페이지 </h2>
    </div>
  );
}



export default App;