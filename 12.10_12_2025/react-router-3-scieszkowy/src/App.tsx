import {About, Home, Contact} from "./components";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import './App.css'

function App() {
  return (
      <BrowserRouter>
          <nav className="navbar">
              <Link to="/" className="nav-link">Strona Główna</Link>
              <Link to="/about" className="nav-link">O Nas</Link>
              <Link to="/contact" className="nav-link">Kontakt</Link>
          </nav>

          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
