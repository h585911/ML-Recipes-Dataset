import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, Loader2 } from "lucide-react";
import { IngredientInput } from "./IngredientInput";
import { ErrorMessage } from "./ErrorMessage";
import { RecipeListDialog } from "./RecipeListDialog";
import { RecipeDetailDialog } from "./RecipeDetailDialog";
import { searchRecipes } from "../utils/recipeUtils";
import type { Ingredient } from "./IngredientInput";
import type { Recipe } from "../types/recipe";

export function IngredientForm() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: crypto.randomUUID(), name: "" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRecipeListOpen, setIsRecipeListOpen] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: crypto.randomUUID(),
      name: "",
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    }
  };

  const updateIngredient = (id: string, name: string) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, name } : ingredient
      )
    );
  };

  const handleSubmit = async () => {
    const enteredIngredients = ingredients
      .map((ing) => ing.name.trim())
      .filter((name) => name.length > 0);

    if (enteredIngredients.length === 0) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipes([]);
    setRecipe(null);

    try {
      const results = await searchRecipes(enteredIngredients);

      if (results.length === 0) {
        setError("No recipes found. Try different ingredients.");
        setIsLoading(false);
        return;
      }

      setRecipes(results);

      if (results.length === 1) {
        setRecipe(results[0]);
        setIsDialogOpen(true);
      } else {
        setIsRecipeListOpen(true);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to search recipes. Make sure the backend is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipeSelect = (selectedRecipe: Recipe) => {
    setRecipe(selectedRecipe);
    setIsRecipeListOpen(false);
    setIsDialogOpen(true);
  };

  const hasValidIngredients = ingredients.some(
    (ing) => ing.name.trim().length > 0
  );

  return (
    <div className="w-full">
      <div className="bg-card ring-1 ring-black/10 dark:ring-white/13 rounded-lg shadow-md dark:shadow-md dark:shadow-black/20 p-8 sm:p-10 space-y-8">
        <div className="space-y-1.5">
          <h2 className="text-base font-medium text-foreground">Ingredients</h2>
          <p className="text-sm text-muted-foreground">
            Add your ingredients you have sitting around
          </p>
        </div>

        <div className="space-y-2">
          {ingredients.map((ingredient) => (
            <IngredientInput
              key={ingredient.id}
              ingredient={ingredient}
              showRemoveButton={ingredients.length > 1}
              onUpdate={updateIngredient}
              onRemove={removeIngredient}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (hasValidIngredients) {
                    handleSubmit();
                  } else {
                    addIngredient();
                  }
                }
              }}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <Button
            type="button"
            variant="ghost"
            size="default"
            onClick={addIngredient}
            className="flex-1 justify-start h-9 text-sm font-normal rounded-none!"
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Ingredient
          </Button>

          <Button
            type="button"
            variant="default"
            size="default"
            onClick={handleSubmit}
            disabled={!hasValidIngredients || isLoading}
            className="flex-1 sm:flex-none sm:px-6 h-9 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed rounded-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                Searching...
              </>
            ) : (
              "Find Recipe"
            )}
          </Button>
        </div>

        {error && <ErrorMessage message={error} />}
      </div>

      <RecipeListDialog
        isOpen={isRecipeListOpen}
        onOpenChange={setIsRecipeListOpen}
        recipes={recipes}
        onRecipeSelect={handleRecipeSelect}
      />

      <RecipeDetailDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        recipe={recipe}
      />
    </div>
  );
}
