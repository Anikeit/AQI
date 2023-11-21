import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Charts from "./pages/Charts";
import Footer from "./components/Footer";
// import DropDownMenu from "./components/DropDownMenu";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Charts />} />
          </Routes>
        </div>

        <Footer />
        {/* <DropDownMenu /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
