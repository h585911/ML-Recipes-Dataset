export interface BackendRecipe {
  recipe_title: string;
  category: string;
  subcategory: string;
  description: string;
  ingredients: string;
  directions: string;
  num_ingredients: number;
  num_steps: number;
  similarity_score: number;
}

export interface Recipe {
  name: string;
  category?: string;
  subcategory?: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  numIngredients: number;
  numSteps: number;
  similarityScore: number;
}
