import React, { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export default function LocationSearchInput(props) {
  const handleSelect = async (value) => {
    props.setAddress(value);
  };

  return (
    <PlacesAutocomplete
      value={props.address}
      onChange={props.setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <input
            className={props.className}
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
                backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
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
