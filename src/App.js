import React from "react";
import { keyframes } from 'styled-components'
import styled from "styled-components";
import Axios from "axios";
import { DialogTitle } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import { useState } from "react";
import { Header, 
        AppNameComponent, 
        AppIcon, 
        SearchComponent, 
        SearchInput, 
        SearchIcon} from "./components/HeaderComponent";

import { RecipeListContainer,
        RecipeContainer,
        RecipeName,
        CoverImage,
        IngredientsText,
        SeeMoreText,
                  } from "./components/RecipeComponent";

const Container = styled.div`
display: flex;
flex-direction: column;
`;

const rotationPizza = keyframes`
0%{-webkit-transform: rotate(0deg); opacity: 0;}
100%{-webkit-transform: rotate(359deg); opacity: 1;}
`;

const Placeholder = styled.img`
  width: 150px;
  height: 150px;
  margin: 500px;
  opacity: 50%;
  animation-name: ${rotationPizza};
  animation-duration: 8s;
  animation-iteration-count: 1;
`;

const RecipeComponent = (props) => {
  const [show, setShow] = React.useState(false);
  const {recipeObj} = props;
  return (
  <>  
    <Dialog open={show}>
      <DialogTitle id="alert-dialog-slide-title">Ingredients</DialogTitle>
      <DialogContent>
        <table>
          <thead>
            <th>Ingredients</th>
            <th>Weight</th>
          </thead>
          <tbody>
            {recipeObj.ingredients.map((ingredientObj) => (
              <tr>
              <td>{ingredientObj.text}</td>
              <td>{ingredientObj.weight}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </DialogContent>

      <DialogActions>
        <IngredientsText onClick={() => window.open(recipeObj.url)}>See More</IngredientsText>
        <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
      </DialogActions>

    </Dialog>
    <RecipeContainer>
      <CoverImage src={recipeObj.image}/>
      <RecipeName>{recipeObj.label}</RecipeName>
      <IngredientsText onClick={ () => setShow(true)}>Ingredients</IngredientsText>
      <SeeMoreText onClick={ () => window.open(recipeObj.url)}>Complete Recipe</SeeMoreText>
    </RecipeContainer>
  </>
  );
}

function App() {
  const [timeoutId, updateTimeoutId] = useState();
  const [recipeList, updateRecipeList] = useState([]);
  const APP_ID = "a3c55f93";
  const APP_KEY = "8d09f50c0332c20e64a56caa6859ef1b";

  const getRecipe = async (searchString) => {
    const response = await Axios.get(`https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  updateRecipeList(response.data.hits);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => getRecipe(event.target.value), 500);
    updateTimeoutId(timeout);
  }

  return (
    <Container>
      <Header>
        <AppNameComponent>
          <AppIcon src="/pizza.svg"/>
          Fast Recipe
        </AppNameComponent>

        <SearchComponent>
          <SearchIcon src="/search-icon.svg"/>
          <SearchInput placeholder="fish, meat, tomato..." onChange={onTextChange}/>
        </SearchComponent>
      </Header>

      <RecipeListContainer>
        {recipeList.length ? recipeList.map((recipeObj) => (
          <RecipeComponent recipeObj={recipeObj.recipe}/>
        )):(
          <Placeholder src="pizza.svg"/>
        )}
      </RecipeListContainer>
    </Container>
  );
}

export default App;
