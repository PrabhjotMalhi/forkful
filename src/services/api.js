const API_BASE_URL = 'http://localhost:4000';

export const api = {
  async getAllRecipes() {
    const response = await fetch(`${API_BASE_URL}/recipes`);
    if (!response.ok) throw new Error('Failed to fetch recipes');
    return response.json();
  },

  async getRecipe(id) {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
    if (!response.ok) throw new Error('Recipe not found');
    return response.json();
  },

  async createRecipe(data) {
    // Get all recipes to determine the next ID
    const recipes = await this.getAllRecipes();
    const maxId = recipes.reduce((max, recipe) => {
      const recipeId = parseInt(recipe.id) || 0;
      return recipeId > max ? recipeId : max;
    }, 0);
    
    const newData = {
      ...data,
      id: (maxId + 1).toString() // Convert to string to maintain consistency
    };

    const response = await fetch(`${API_BASE_URL}/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });
    if (!response.ok) throw new Error('Failed to create recipe');
    return response.json();
  },

  async updateRecipe(id, data) {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update recipe');
    return response.json();
  },

  async deleteRecipe(id) {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete recipe');
  },
}; 