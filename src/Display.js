import React from "react";

const Display = (props) => {
  const { dogs } = props;

  const loaded = () => {
    return (
      <div style={{ textAlign: "center" }}>
        {dogs.map((dog) => (
          <article>
            <img src={dog.img} style={{ maxWidth: "400px" }} />
            <h1>{dog.name}</h1>
            <h3>{dog.age}</h3>
          </article>
        ))}
      </div>
    );
  };

  const loading = <h1>Loading...</h1>;

  return dogs.length > 0 ? loaded() : loading;
};

export default Display;
