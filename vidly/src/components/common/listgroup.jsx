import React from "react";

const ListGroup = (props) => {
  const { genres, slectedGenre, onGenreSelect, textProperty, valueProperty } = props;

  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          className={
            slectedGenre === genre
              ? "list-group-item active"
              : "list-group-item"
          }
          key={genre[valueProperty]}
          style={{cursor: 'pointer'}} 
          onClick={() => onGenreSelect(genre)}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}

export default ListGroup;
