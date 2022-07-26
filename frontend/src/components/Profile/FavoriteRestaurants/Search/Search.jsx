import React, { useState } from "react";
import SearchedRestaurantCard from "./SearchedRestaurantCard";
import Popup from "reactjs-popup";
import API from "../../../../utils/API";
import search from "../../../Shared/assets/Search.svg";
import deleteButton from "../../../Shared/assets/DeleteButton.svg";

export default function Search(props) {
  const [restaurantsToAdd, setRestaurantsToAdd] = useState([]);
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);

  const findRestaurant = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { location: props.location, searchQuery: props.searchQuery };

      // add categories to likes
      const res = await API.post("api/v1/auth/restaurantInfo", body, config);
      setSearchedRestaurants(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const addRestaurants = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { restaurantsToAdd: restaurantsToAdd };

      // add restaurants to user's profile
      await API.patch("api/v1/auth/dietaryProfile/addRestaurants", body, config);
      props.ref.current.close();
    } catch (err) {
      console.log(err);
    }
  };

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <span
        className="button"
        onClick={() => setOpen((o) => !o)}
      >
        Add restaurants
      </span>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        modal
        nested
        // trigger={<span className="button"> Add restaurants </span>}
        style={{
          minWidth: "40em",
        }}
      >
        {(close) => (
          <div className="search-popup">
            <div className="restaurants-to-add">
              <div className="popup-header">
                <h1>Restaurants to add</h1>
                {restaurantsToAdd?.length > 0 && <p>{restaurantsToAdd.length}</p>}
              </div>

              {restaurantsToAdd?.length > 0 ? (
                <div className="added-restaurants">
                  {restaurantsToAdd?.length > 0 &&
                    restaurantsToAdd?.map((restaurant, index) => (
                      <SearchedRestaurantCard
                        key={index}
                        restaurantsToAdd={restaurantsToAdd}
                        setRestaurantsToAdd={setRestaurantsToAdd}
                        restaurant={restaurant}
                        searchedRestaurants={searchedRestaurants}
                        inAdded={true}
                      />
                    ))}
                  <span
                    onClick={() => {
                      addRestaurants();
                      close();
                    }}
                    className="button"
                  >
                    {" "}
                    Confirm{" "}
                  </span>
                </div>
              ) : (
                <p className="no-searched-results">Nothing to see here yet. </p>
              )}
            </div>
            <div className="popup-divider" />
            <div className="find-a-restaurant">
              <div className="popup-header">
                <h1>Find a restaurant</h1>
                <div className="inputs">
                  <input
                    className="search"
                    type="text"
                    name="restaurant"
                    placeholder="Restaurant name"
                    onChange={(e) => props.setSearchQuery(e.target.value)}
                  />
                  <div className="search-divider" />
                  <input
                    className="search"
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={(e) => props.setLocation(e.target.value)}
                  />
                  <img
                    className="button search"
                    src={search}
                    onClick={findRestaurant}
                    alt="search icon"
                  />
                </div>
              </div>

              {searchedRestaurants?.length > 0 ? (
                <div className="searched-restaurants">
                  {searchedRestaurants?.map((restaurant, index) => (
                    <SearchedRestaurantCard
                      key={index}
                      restaurantsToAdd={restaurantsToAdd}
                      setRestaurantsToAdd={setRestaurantsToAdd}
                      restaurant={restaurant}
                      searchedRestaurants={searchedRestaurants}
                      inAdded={false}
                    />
                  ))}
                </div>
              ) : (
                <p className="no-searched-results">Results will appear here. </p>
              )}
            </div>
            <img
              className="close"
              src={deleteButton}
              onClick={closeModal}
              alt="delete button"
            />
          </div>
        )}
      </Popup>
    </div>
  );
}
