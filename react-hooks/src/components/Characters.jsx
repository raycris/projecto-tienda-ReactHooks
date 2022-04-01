import { useEffect, useState, useReducer, useMemo, useRef } from "react";

import "../styles/Characters.css";

const initialState = {
  favorites: [],
};

const actionType = {
  addFavorite: "ADD_TO_FAVORITE",
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case actionType.addFavorite:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    default:
      return state;
  }
};

const Characters = () => {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState([]);

  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  const searchInput = useRef(null);

  // Metodo para consultar la API
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

  // Metodo para agregar un personaje a favoritos con useReducer
  const handleClick = (favorite) => {
    console.log("agrege a favorito a " + favorite.name);
    dispatch({ type: actionType.addFavorite, payload: favorite });
  };

  // Metodo para detectar los caracteres tipiados por el usuario
  const handleSearch = () => {
    setSearch(searchInput.current.value);
  };

  // Metodo para buscar o filtrar sin memo
  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  // Metodo para buscar o filtrar con memo
  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    <div className="characters">
      {favorites.favorites.map((favCharacter) => (
        // <h1>Favoritos</h1>
        <li className="favorite-list" key={favCharacter.id}>
          <div className="favorite-list__info">
            <img src={`${favCharacter.image}`} alt={`${favCharacter.name}`} />
            <h2>{favCharacter.name}</h2>
          </div>
        </li>
      ))}

      <div className="search">
        <input
          type="text"
          value={search}
          ref={searchInput}
          onChange={handleSearch}
        />
      </div>

      {filteredUsers.map((character) => (
        <div className="infor-card" key={character.id}>
          <img src={`${character.image}`} alt={`${character.name}`} />
          <div className="infor-card__text">
            <h2>{character.name}</h2>
            <p>
              <strong>Status: </strong>
              {character.status}
            </p>
            <p>
              <strong>Species: </strong>
              {character.species}
            </p>
            <p>
              <strong>Gender: </strong>
              {character.gender}
            </p>
            <button
              className="btn-favorite"
              type="button"
              onClick={() => handleClick(character)}
            >
              Agregar a Favoritos
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { Characters };
