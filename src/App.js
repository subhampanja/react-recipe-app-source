import React, { useState } from "react";
import "./App.css";
import { config } from "./config";
import axios from "axios";
import Recipe from "./component/Recipe";
import { v4 as uuidv4 } from "uuid";
import Alert from "./component/Alert";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APIurl = `https://api.edamam.com/search?q=${query}&app_id=${config.apiId}&app_key=${config.apiKey}`;

  const getData = async () => {
    if (query !== "") {
      const result = await axios.get(APIurl);
      if (!result.data.more) {
        return setAlert("Not Recipe Found");
      }
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
    } else {
      setAlert("Please Search Something");
    }
  };

  const onchange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      <h1>Recipe Searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="search recipe"
          autoComplete="off"
          onChange={onchange}
          value={query}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
}

export default App;
