import React, { useState, useEffect } from 'react';
import './App.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)} 
      />
      <button type="submit">Search</button>
    </form>
  )
}

const PokemonInfo = ({ pokemonName }) => {
  const [pokemonData, setPokemonData] = useState(null);
 
  useEffect(() => {
    if (!pokemonName) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => setPokemonData(data));
  }, [pokemonName]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const name = pokemonData.name;
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div>
      <h2 className='nice-font'>{nameCapitalized}</h2>
      <img src={pokemonData.sprites.front_default} alt={nameCapitalized} />
    </div>
  )
}

function Pokedex() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch}/>
      <PokemonInfo pokemonName={searchTerm}/>
    </div>
  )
}

export default function App() {
  return (
    <div className="centered-component">
      <Pokedex />
    </div>
  ) 
}
