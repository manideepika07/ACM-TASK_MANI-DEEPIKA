

const API_URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "YOUR_API_KEY"; // Replace with your Spoonacular API key

const form = document.getElementById("recipe-form");
const recipesSection = document.getElementById("recipes");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const ingredient = document.getElementById("ingredient").value.trim();
  const cuisine = document.getElementById("cuisine").value;

  if (!ingredient) {
    alert("Please enter at least one ingredient.");
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(API error: ${response.statusText});
    }

    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipesSection.innerHTML = <p class="error">Failed to fetch recipes. Please try again later.</p>;
  }
});

// Function to display recipes in the DOM
function displayRecipes(recipes) {
  recipesSection.innerHTML = ""; // Clear previous results

  if (recipes.length === 0) {
    recipesSection.innerHTML = <p class="error">No recipes found for the given input. Please try again with different criteria.</p>;
    return;
  }

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <button class="favorite" onclick="saveToFavorites('${recipe.id}', '${recipe.title.replace(
        /'/g,
        "\\'"
      )}')">Save to Favorites</button>
    `;
    recipesSection.appendChild(card);
  });
}

// Function to save recipes to localStorage
function saveToFavorites(id, title) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the recipe is already in favorites
  if (favorites.some((recipe) => recipe.id === id)) {
    alert(${title} is already in your favorites.);
    return;
  }

  favorites.push({ id, title });
  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert(${title} has been added to your favorites!);
}


