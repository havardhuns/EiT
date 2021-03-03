import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { classnames } from "../helpers";

const PlaceSearch = (props) => {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

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
    setLatitude(null);
    setLongitude(null);
  };

  return (
    <div>
      <PlacesAutocomplete
        onChange={setAddress}
        value={address}
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
                    placeholder: "Search Places...",
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
                  {suggestions.map((suggestion) => {
                    const className = classnames("suggestion-item", {
                      "suggestion-item--active": suggestion.active,
                    });

                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { className })}
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
