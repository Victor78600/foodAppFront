import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import FavPage from "../Pages/FavPage/favPage";
import CreatePage from "../Pages/CreatePage/CreatePage";

import HomepageIcon from "./images/homepage-icon.png";
import DiscoverpageIcon from "./images/discoverpage-icon.png";
import FavpageIcon from "./images/favpage-icon.png";
import CreatepageIcon from "./images/createpage-icon.png";

function NavBar() {
  return (
    <>
      <nav className="bottom-nav">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <div>
            <img src={HomepageIcon} alt="Home Page" />
          </div>
        </Link>
        <Link to="/search">
          <div>
            <img src={DiscoverpageIcon} alt="Discover Page" />
          </div>
        </Link>
        <Link to="/favorites">
          <div>
            <img src={FavpageIcon} alt="Fav Page" />
          </div>
        </Link>
        <Link to="/create">
          <div>
            <img src={CreatepageIcon} alt="Create Page" />
          </div>
        </Link>
      </nav>
    </>
  );
}

export default NavBar;
