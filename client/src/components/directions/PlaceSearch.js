import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { classnames } from "../../helpers";

const PlaceSearch = (props) => {
  const [address, setAddress] = useState("");

  const handleSelect = (selected) => {
    setAddress(selected);
    geocodeByAddress(selected)
      .then((res) => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        props.onSelect({ lat: lat, lng: lng, name: selected });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleCloseClick = () => {
    setAddress("");
    props.onSelect(null);
  };

  return (
    <div>
      <PlacesAutocomplete
        onChange={setAddress}
        value={props.value ? props.value.name : address}
        onSelect={handleSelect}
        onError={(error) => console.log(error)}
        shouldFetchSuggestions={address.length > 2}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => {
          return (
            <div className="search-bar-container">
              <div className="search-input-container">
                <input
                  {...getInputProps({
                    placeholder: props.placeholder,
                    className: "search-input",
                  })}
                />
                {address.length > 0 && (
                  <button className="clear-button" onClick={handleCloseClick}>
                    x
                  </button>
                )}
              </div>
              {suggestions.length > 0 && (
                <div className="autocomplete-container">
                  {suggestions.map((suggestion, index) => {
                    const className = classnames("suggestion-item", {
                      "suggestion-item--active": suggestion.active,
                    });

                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { className })}
                        key={index}
                      >
                        <strong>
                          {suggestion.formattedSuggestion.mainText}
                        </strong>{" "}
                        <small>
                          {suggestion.formattedSuggestion.secondaryText}
                        </small>
                      </div>
                    );
                  })}
                  <div className="dropdown-footer"></div>
                </div>
              )}
            </div>
          );
        }}
      </PlacesAutocomplete>
    </div>
  );
};

export default PlaceSearch;
