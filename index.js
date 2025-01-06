/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
        // Loop over each game in the array
        for (let game of games) {
            // Create a new div element to become the game card
            const gameCard = document.createElement("div");
            
            // Add the 'game-card' class to the div
            gameCard.classList.add("game-card");
    
            // Set the inner HTML using a template literal to display the game's image, name, and description
            gameCard.innerHTML = `
                <img src="${game.img}" alt="${game.name}" class="game-img" />
                <h3>${game.name}</h3>
                <p>${game.description}</p>
            `;
    
            // Append the game card to the games-container
            gamesContainer.appendChild(gameCard);
        }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the total number of contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0); // start with 0 as the initial total

// set the inner HTML of the contributions card to display the total contributions
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
// grab the raised card element
const raisedCard = document.getElementById("total-raised");

// use reduce() to calculate the total amount pledged across all games
const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0); // start with 0 as the initial total

// set the inner HTML of the raised card to display the total raised with a dollar sign
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// set inner HTML using template literal


// grab number of games card and set its inner HTML
// grab the games card element
const gamesCard = document.getElementById("num-games");

// calculate the total number of games
const totalGames = GAMES_JSON.length;

// set the inner HTML of the games card to display the total number of games
gamesCard.innerHTML = totalGames;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    // Clear the current games displayed
    deleteChildElements(gamesContainer);

    // Filter games where pledged is less than the goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Log the length of the unfundedGames array to the console
    console.log(unfundedGames.length);

    // Use the addGamesToPage function to add the filtered games to the DOM
    addGamesToPage(unfundedGames);
}


// show only games that are fully funded
function filterFundedOnly() {
    // Clear the current games displayed
    deleteChildElements(gamesContainer);

    // Filter games where pledged is greater than or equal to the goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Log the result to see the number of funded games
    console.log(fundedGames);

    // Log the number of funded games
    console.log(fundedGames.length);

    // Use the addGamesToPage function to add the funded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    // Clear the current games displayed
    deleteChildElements(gamesContainer);

    // Call the addGamesToPage function with all games in GAMES_JSON
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// Add event listener for the "Show Unfunded Only" button
unfundedBtn.addEventListener("click", filterUnfundedOnly);

// Add event listener for the "Show Funded Only" button
fundedBtn.addEventListener("click", filterFundedOnly);

// Add event listener for the "Show All Games" button
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numberOfUnfundedGames = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0);

console.log(numberOfUnfundedGames);

// create a string that explains the number of unfunded games using the ternary operator
// Calculate the total raised amount


// Count the number of unfunded games


// Create the template string with the ternary operator for grammatical correctness
const descriptionText = `
    We have raised $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games. 
    There ${numberOfUnfundedGames === 1 ? 'is' : 'are'} ${numberOfUnfundedGames} game${numberOfUnfundedGames === 1 ? '' : 's'} still unfunded.
`;

// Select the description container and update its inner HTML

descriptionContainer.innerHTML = descriptionText;


// create a new DOM element containing the template string and append it to the description container
// Create a new paragraph element
const newParagraph = document.createElement('p');

// Set the inner HTML of the paragraph element to the description string
newParagraph.innerHTML = descriptionText;

// Append the paragraph to the description container
descriptionContainer.appendChild(newParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;
console.log(firstGame);
console.log(secondGame);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.innerHTML = firstGame.name; // Set the name of the top funded game

// Append the first game element to the first game container
firstGameContainer.appendChild(firstGameElement);

// Create a new element for the second most funded game (secondGame)
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = secondGame.name; // Set the name of the second most funded game

// Append the second game element to the second game container
secondGameContainer.appendChild(secondGameElement);
// do the same for the runner up item