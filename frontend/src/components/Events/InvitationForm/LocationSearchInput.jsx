import React, { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export default function LocationSearchInput(props) {
  const handleSelect = async (value) => {
    props.setAddress(value);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={props.address}
        onChange={props.setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              required
              {...getInputProps({ placeholder: "Type address" })}
            />

            <div>
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
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
