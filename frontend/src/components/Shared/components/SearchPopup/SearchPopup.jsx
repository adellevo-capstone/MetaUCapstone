import React, { useState } from "react";
import Popup from "reactjs-popup";
import search from "../../assets/Search.svg";
import DeleteButton from "../../assets/DeleteButton.svg";
import SearchedResultCard from "../SearchResultCard/SearchedResultCard";
import API from "../../../../utils/API";
import "./SearchPopup.css";
import NoResults from "../NoResults/NoResults";

export default function SearchPopup(props) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [newGroupName, setNewGroupName] = useState("");
  const createGroup = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const memberIds = props.itemsToAdd.map((user) => {
        return user._id;
      });
      const body = { name: newGroupName, members: memberIds };
      await API.patch("api/v1/auth/group/create", body, config);
      props.loadAllGroups();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnClick = async () => {
    if (props.typeToAdd === "Member") {
      if (props.actionType === "create") {
        await createGroup();
      } else {
        await props.addItems(props.groupId);
      }
    } else {
      await props.addItems();
    }
  };

  return (
    <div>
      {props.isCurrentUser && (
        <span
          className="button"
          onClick={() => setOpen((o) => !o)}
        >
          {props.buttonText}
        </span>
      )}

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
                <div className="left-side">
                  <h1>{props.typeToAdd}s to add</h1>
                  {props.itemsToAdd?.length > 0 && <p>{props.itemsToAdd.length}</p>}
                </div>
                {props.actionType === "create" && (
                  <input
                    className="group name"
                    type="text"
                    name="user"
                    placeholder="Pick a group name..."
                    onChange={(e) => setNewGroupName(e.target.value)}
                  />
                )}
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
                      await handleOnClick();
                      close();
                    }}
                    style={{ marginTop: "5em" }}
                    className="button"
                  >
                    {" "}
                    Confirm{" "}
                  </span>
                </div>
              ) : (
                <NoResults />
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
                <NoResults message={"Results will appear here."} />
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
