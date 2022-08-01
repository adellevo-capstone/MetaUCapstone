import React, { useState } from "react";
import Popup from "reactjs-popup";
import search from "../../assets/Search.svg";
import DeleteButton from "../../assets/DeleteButton.svg";
import SearchedResultCard from "../SearchResultCard/SearchedResultCard";
import "./SearchPopup.css";

export default function SearchPopup(props) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <span
        className="button"
        onClick={() => setOpen((o) => !o)}
      >
        {props.buttonText}
      </span>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        modal
        nested
        style={{
          minWidth: "40em",
        }}
      >
        {(close) => (
          <div className="search-popup">
            <div className="items-to-add">
              <div className="popup-header">
                <h1>{props.typeToAdd}s to add</h1>
                {props.itemsToAdd?.length > 0 && <p>{props.itemsToAdd.length}</p>}
              </div>

              {props.itemsToAdd?.length > 0 ? (
                <div className="added-items">
                  {props.itemsToAdd?.length > 0 &&
                    props.itemsToAdd?.map((item, index) => (
                      <SearchedResultCard
                        {...props}
                        key={index}
                        item={item}
                        inAdded={true}
                      />
                    ))}
                  <span
                    onClick={async () => {
                      props.typeToAdd === "Restaurants"
                        ? await props.addItems
                        : await props.addItems(props.groupId);
                      close();
                    }}
                    className="button"
                  >
                    {" "}
                    Confirm{" "}
                  </span>
                </div>
              ) : (
                <p className="no-results">Nothing to see here yet. </p>
              )}
            </div>
            <div className="popup-divider" />
            <div className="find-an-item">
              <div className="popup-header">
                <h1>Find a {props.typeToAdd.toLowerCase()}</h1>
                <div className="inputs">
                  <input
                    type="text"
                    name="restaurant"
                    placeholder={`${props.typeToAdd} name`}
                    onChange={(e) => props.setSearchQuery(e.target.value)}
                  />
                  {props.typeToAdd === "Restaurant" && (
                    <>
                      <div className="search-divider" />
                      <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        onChange={(e) => props.setLocation(e.target.value)}
                      />
                    </>
                  )}
                  <img
                    className="button search"
                    src={search}
                    onClick={props.findItem}
                    alt="search icon"
                  />
                </div>
              </div>

              {props.searchedItems?.length > 0 ? (
                <div className="searched-items">
                  {props.searchedItems?.map((item, index) => (
                    <SearchedResultCard
                      {...props}
                      key={index}
                      item={item}
                      inAdded={false}
                    />
                  ))}
                </div>
              ) : (
                <p className="no-results">Results will appear here. </p>
              )}
            </div>
            <img
              className="close"
              src={DeleteButton}
              onClick={closeModal}
              alt="delete button"
            />
          </div>
        )}
      </Popup>
    </div>
  );
}
