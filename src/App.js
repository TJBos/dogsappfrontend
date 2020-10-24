import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  //variable for url
  const url = "http://localhost:4500";
  //create the state to hold the dogs
  const [dogs, setDogs] = React.useState([]);
  //empty dog
  const emptyDog = {
    name: "",
    age: 0,
    img: "",
  };
  //select a dog
  const [selectedDog, setSelectedDog] = React.useState(emptyDog);

  //make function that calls API to get the dogs
  const getDogs = () => {
    fetch(url + "/dog/")
      .then((response) => response.json())
      .then((data) => setDogs(data));
  };

  //useEffect to do initial fetch of dogs
  React.useEffect(() => getDogs(), []);

  //handleCreate function for creating new dogs
  const handleCreate = (newDog) => {
    fetch(url + "/dog/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDog),
    }).then(() => {
      getDogs();
    });
  };

  const handleUpdate = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    }).then(() => {
      // don't need the response from the post but will be using the .then to update the list of dogs
      getDogs();
    });
  };

  const selectDog = (dog) => {
    setSelectedDog(dog);
  };

  const deleteDog = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      // don't need the response from the post but will be using the .then to update the list of dogs
      getDogs();
    });
  };

  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <main>
        <Link to="/create">
          <button>Add Dog</button>
        </Link>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display
                {...rp}
                dogs={dogs}
                selectDog={selectDog}
                deleteDog={deleteDog}
              />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                dog={emptyDog}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form
                {...rp}
                label="update"
                dog={{ selectedDog }}
                handleSubmit={handleUpdate}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
