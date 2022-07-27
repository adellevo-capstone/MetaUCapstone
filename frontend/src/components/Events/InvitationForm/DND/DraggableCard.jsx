import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ItemTypes } from "./Constants";
import Card from "./Card";

const DraggableCard = (props) => {
  const [, dragRef, preview] = useDrag({
    type: ItemTypes.CARD,
    item: { ...props },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div ref={dragRef}>
      <Card task={props.task} />
    </div>
  );
};

export default DraggableCard;
