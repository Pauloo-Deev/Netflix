import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setSearchTerm("");
  };

  const handleSearch = async () => {
    closeSearchModal();

    try {
      const response = await fetch(
        `https://api.tvmaze.com/singlesearch/shows?q=${searchTerm}`
      );
      const data = await response.json();

      if (data && data.id) {
        history.push(`/movies/${data.id}`);
      } else {
        console.log("Filme não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar o filme:", error);
    }
  };

  return (
    <Router>
      <div className="header">
        <div>
          <a href="/">
            <img
              className="header__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix Logo"
            />
          </a>
        </div>
        <div className="search">
          <IoSearch className="icon-search" onClick={openSearchModal} />
        </div>
      </div>
      {isSearchModalOpen && (
        <div className="search-modal">
          <input
            className="input-search"
            type="text"
            placeholder="Digite sua busca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="div-button-modal">
            <button className="button-modal" onClick={handleSearch}>
              Buscar
            </button>
            <button className="button-modal" onClick={closeSearchModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </Router>
  );
}

export default Header;
