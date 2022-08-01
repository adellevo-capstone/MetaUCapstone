import React from "react";
import marker from "../../assets/marker.svg";
import addButton from "../../assets/AddButton.svg";
import deleteButton from "../../assets/DeleteButton.svg";
import "./SearchedResultCard.css";

function CardContent({ name, information, typeToAdd }) {
  return (
    <>
      <h2>{name}</h2>
      <span className="location">
        {typeToAdd === "Restaurant" && (
          <img
            className="marker"
            src={marker}
            alt="marker"
          />
        )}
        <p>{information}</p>
      </span>
    </>
  );
}

export default function SearchedResultCard({
  item,
  setItemsToAdd,
  itemsToAdd,
  inAdded,
  typeToAdd,
}) {
  const handleClick = () => {
    let updated = new Set([...itemsToAdd]);

    if (inAdded) {
      updated.delete(item);
    } else {
      if (updated.has(item)) {
        alert(`You've already added this ${typeToAdd.toLowerCase()} to your list :)`);
      }
      updated.add(item);
    }

    setItemsToAdd([...updated]);
  };

  return (
    <div className="searched-restaurant-card">
      <div className="content">
        <CardContent
          name={typeToAdd === "Restaurant" ? item.name : item.firstName + " " + item.lastName}
          information={
            typeToAdd === "Restaurant"
              ? `${item.location.address1}, ${item.location.city}, ${item.location.state}`
              : "@mistedlilacs"
          }
          typeToAdd={typeToAdd}
        />
      </div>
      <div className="checkmark">
        <img
          className="close"
          onClick={handleClick}
          src={!inAdded ? addButton : deleteButton}
          alt="checkmark"
        />
      </div>
    </div>
  );
}
