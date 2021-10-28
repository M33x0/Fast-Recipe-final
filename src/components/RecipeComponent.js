import styled from "styled-components";

export const RecipeListContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
justify-content: space-evenly;
gap: 20px;
`;

export const RecipeContainer =  styled.div`
display: flex;
flex-direction: column;
padding: 30px;
width: 300px;
box-shadow: 0 3px 10px 0 #aaa;
`;

export const CoverImage = styled.img`
height: 200px;
object-fit: cover;
`;

export const RecipeName = styled.span`
font-size: 18px;
font-weight: bold;
color: black;
margin: 10px 0;
`;

export const IngredientsText = styled.span`
border-radius: 4px;
color:black;
cursor: pointer;
font-size: 18px;
border: 1px solid green;
padding: 10px 15px;
margin-bottom: 12px;
color: green;
text-align: center;
`;

export const SeeMoreText = styled(IngredientsText)`
color: #eb3300;
border: 1px solid #eb3300;
`;