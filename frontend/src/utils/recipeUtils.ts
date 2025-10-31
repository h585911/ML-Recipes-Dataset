import { type BackendRecipe, type Recipe } from "../types/recipe";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const parseIngredients = (ingredientsStr: string): string[] => {
  if (!ingredientsStr) return [];
  return ingredientsStr
    .split('",')
    .map((i) => {
      let cleaned = i.replace(/^[\["\s]+|["\]\s]+$/g, "").trim();
      return cleaned;
    })
    .map((i) => {
  return i
    .replace(/\\u00bc|¼/gi, "1/4")
    .replace(/\\u00bd|½/gi, "1/2")
    .replace(/\\u00be|¾/gi, "3/4");
})
    .filter((i) => i.length > 0);
};

export const parseDirections = (directionsStr: string): string[] => {
  if (!directionsStr) return [];

  if (directionsStr.includes('",')) {
    return directionsStr
      .split('",')
      .map((step) => {
        let cleaned = step.replace(/^[\["\s]+|["\]\s]+$/g, "").trim();
        cleaned = cleaned.replace(/^\d+\.\s*/, "");
        return cleaned;
      })
      .filter((step) => step.length > 0);
  }

  const stepPattern = /\d+\.\s*/;
  if (stepPattern.test(directionsStr)) {
    const parts = directionsStr.split(stepPattern);
    return parts.map((step) => step.trim()).filter((step) => step.length > 0);
  }

  const newlineParts = directionsStr.split(/\n+/);
  if (newlineParts.length > 1) {
    return newlineParts
      .map((step) => {
        return step.trim().replace(/^\d+\.\s*/, "");
      })
      .filter((step) => step.length > 0);
  }

  const trimmed = directionsStr.trim().replace(/^\d+\.\s*/, "");
  return trimmed.length > 0 ? [trimmed] : [];
};

export const convertRecipe = (backendRecipe: BackendRecipe): Recipe => {
  return {
    name: backendRecipe.recipe_title,
    category: backendRecipe.category,
    subcategory: backendRecipe.subcategory,
    description: backendRecipe.description,
    ingredients: parseIngredients(backendRecipe.ingredients),
    instructions: parseDirections(backendRecipe.directions),
    numIngredients: backendRecipe.num_ingredients,
    numSteps: backendRecipe.num_steps,
    similarityScore: backendRecipe.similarity_score,
  };
};

export const searchRecipes = async (
  ingredients: string[]
): Promise<Recipe[]> => {
  const ingredientsString = ingredients.join(", ");

  const response = await fetch(`${API_BASE_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredientsString,
      top_k: 5,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `HTTP error! status: ${response.status}`
    );
  }

  const data = await response.json();
  if (!data.success || !data.results) {
    throw new Error("Invalid response from server");
  }

  return data.results.map(convertRecipe);
};
