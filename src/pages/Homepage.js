import { useContext } from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


// Context
import ShowsContext from "../context/shows/showsContext";

// Components
import Searchbar from "../components/Searchbar";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";

const Homepage = (genre) => {
const [show, setShow] = useState([]);
  const showsContext = useContext(ShowsContext);
  const { loading, shows } = showsContext;
  console.log(shows)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://api.tvmaze.com/shows`);
      const data = await response.json();
      setShow(data);
    }
    fetchData();
  }, [genre]);
  console.log(shows);
  const filteredItems = show.filter((show) => show.genres === "Drama");
  console.log("filteredItems", filteredItems);

  const genreLanguage = show.filter((show) => show.language === "English");
  console.log("genreLanguage", genreLanguage);

  const genreStauts = show.filter((show) => show.status === "Running");
  console.log("genreStauts", genreStauts);

  const genreRating = show.filter((show) => show.rating.average >= 8);
  console.log("genreRating", genreRating)

  return (
    <div className="">
      {/* search bar */}
      <div className="homepage">
      <Searchbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="homepage__list">
          {shows.map((item) => (
            <ListItem
              key={item.show.id}
              id={item.show.id}
              image={
                item.show.image
                  ? item.show.image.medium
                  : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
              }
              name={item.show.name}
              rating={
                item.show.rating.average
                  ? item.show.rating.average
                  : "No rating"
              }
            />
          ))}
        </div>
      )}
      
    </div>
    {/* streaming genre */}
    <div className="rows">
        <div className=" rowbar">
          <p className="ge">Streaming Live</p>
          <Link to='/streamingLive'>
            <p className="ge">more</p>
          </Link>
        </div>
        <div className="genrerow">
          {genreStauts.slice([0], [8]).map(({ name, image, genres }) => (
            <div key={name}>
              <h2 className="genreName">{name}</h2>
              <img src={image.medium} alt={`${name} show poster`} />
            </div>
          ))}
        </div>
      </div>
      {/* English shows */}
      <div className="rows">
        <div className="genrebg">
          <div className=" rowbar">
            <p className="ge">English shows</p>
            <Link to='/english'>
              <p className="ge">more</p>
            </Link>
          </div>
          <div className="genrerow">
            {genreLanguage.slice([0], [8]).map(({ name, image, genres }) => (
              <div key={name}>
                <h2 className="genreName">{name}</h2>
                <img src={image.medium} alt={`${name} show poster`} />
              </div>
            ))}
          </div>
        </div>
      </div>
     
      {/* high rated shows */}
      <div className="rows">
        <div className="genrebg">
          <div className=" rowbar">
            <p className="ge">High Rated</p>
            <Link to='/english'>
              <p className="ge">more</p>
            </Link>
          </div>
          <div className="genrerow">
            {genreRating.slice([0], [8]).map(({ name, image, genres }) => (
              <div key={name}>
                <h2 className="genreName">{name}</h2>
                <img src={image.medium} alt={`${name} show poster`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Homepage;
