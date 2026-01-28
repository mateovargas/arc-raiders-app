import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header"
import Home from "./pages/Home";
import About from "./pages/About/About";

function App() {
  return (
    <div className="min-h-screen bg-arc-bg text-arc-text">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
          {/* other routes */}
        </Routes>
      </main>
    </div>
  );
}

export default App
