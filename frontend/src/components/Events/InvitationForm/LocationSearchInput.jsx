import React, { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export default function LocationSearchInput({ setAddress, address, className }) {
  const handleSelect = async (value) => {
    setAddress(value);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <input
            className={className}
            required
            {...getInputProps({
              placeholder: "1634 Lilac Court, San Francisco, CA, USA",
              color: "black",
            })}
          />

          <>
            {loading ? <div>...loading</div> : null}

            {suggestions.map((suggestion, index) => {
              const style = {
                backgroundColor: suggestion.active ? "#e0dfdc" : "#fff",
                borderBottom: "1px solid grey",
                padding: "1em",
                width: "75%",
                cursor: "pointer",
                fontFamily: "Lexend",
                fontSize: "0.8em",
                fontWeight: "400",
                color: "black",
              };

              return (
                <div
                  key={index}
                  {...getSuggestionItemProps(suggestion, { style })}
                >
                  {suggestion.description}
                </div>
              );
            })}
          </>
        </>
      )}
    </PlacesAutocomplete>
  );
}
