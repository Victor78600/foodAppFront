import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage/HomePage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import FilterPage from "./Pages/FilterPage/FilterPage";
import FilterCountryPage from "./Pages/FilterCountryPage/FilterCountryPage";
import ReceipePage from "./Pages/ReceipePage/ReceipePage";
import FavPage from "./Pages/FavPage/favPage";
import CreatePage from "./Pages/CreatePage/CreatePage";
import Navbar from "./components/NavBar";

import ConnexionPage from "./Pages/ConnexionPage/ConnexionPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";

import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="/meals/:id" element={<ReceipePage />} />
        <Route path="/favorites" element={<FavPage />} />

        <Route path="/connection" element={<ConnexionPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/search/:category" element={<FilterPage />} />
        <Route path="/search/area/:area" element={<FilterCountryPage />} />

        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </>
  );
}

export default App;
