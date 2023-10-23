import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage/HomePage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import FilterPage from "./Pages/FilterPage/FilterPage";
import ReceipePage from "./Pages/ReceipePage/ReceipePage";
import FavPage from "./Pages/FavPage/FavPage";
import CreatePage from "./Pages/CreatePage/CreatePage";
import Navbar from "./components/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:filter" element={<FilterPage />} />
        <Route path="/meals/:id" element={<ReceipePage />} />
        <Route path="/favorites" element={<FavPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </>
  );
}

export default App;
