import { useState } from "react";
import "../SEARCH/Search.scss";
import md5 from "md5";
import Character from "../CHARACTERS/Character.jsx";
import Comic from "../COMICS/Comic";

const Search = () => {
  const [characterName, setCharacterName] = useState("");
  const [characterData, setCharacterData] = useState(null);
  const [comicData, setComicData] = useState(null);

  const publicKey = import.meta.env.VITE_PUBLIC_KEY || "defaultPublicKey";
  const privateKey = import.meta.env.VITE_PRIVATE_KEY || "defaultPrivateKey";

  const handleSubmit = (event) => {
    event.preventDefault();
    getCharacterData();
  };

  const getCharacterData = () => {
    setCharacterData(null);
    setComicData(null);

    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);

    const url = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${characterName}&limit=100`;
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCharacterData(result.data);
        console.log(result);
      })
      .catch((error) => {
        console.log("Hubo un error:", error);
      });
  };

  const getComicData = (characterId) => {
    window.scrollTo({ top: 0, left: 0 });

    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);

    
    // const url = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`;
    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`;
    fetch(url)
      .then((response) => response.json())
      .then((results) => {
        setComicData(results.data);
        console.log(results);
      })
      .catch((error) => {
        console.log("Error al obtener datos del cómic", error);
      });
  };

  const generateHash = (timeStamp) => {
    return md5(`${timeStamp}${privateKey}${publicKey}`);
  };

  const handleChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleReset = () => {};

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          placeholder="Introduce el nombre del personaje"
          type="text"
          onChange={handleChange}
        />
        <div className="buttons">
          <button type="submit">Obtener datos de personajes</button>
          <button type="reset" className="reset" onClick={handleReset}>
            Reiniciar
          </button>
        </div>
      </form>
      {characterData && characterData.results && characterData.results[0] && (
        <Character data={characterData.results} onClick={getComicData} />
      )}
      {comicData && comicData.results && comicData.results[0] && (
        <Comic data={comicData.results} />
      )}
    </>
  );
};

export default Search;
