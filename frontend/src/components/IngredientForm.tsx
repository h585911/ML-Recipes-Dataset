import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Plus, X, Clock, Users, ChefHat } from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
}

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
}

// Temp data, will be removed once we hook up the backend
const getDummyRecipe = (ingredients: string[]): Recipe => {
  const recipeNames = [
    "Delicious Mixed Dish",
    "Gourmet Creation",
    "Chef's Special",
    "Tasty Fusion",
  ];
  const randomRecipe = recipeNames[Math.floor(Math.random() * recipeNames.length)];

  return {
    name: randomRecipe,
    ingredients: [
      ...ingredients,
      "2 tbsp olive oil",
      "Salt and pepper to taste",
      "1 clove garlic",
    ],
    instructions: [
      "Prepare all the ingredients.",
      "Heat oil in a pan over medium heat.",
      "Add the main ingredients and cook for 5-7 minutes.",
      "Season with salt and pepper.",
      "Serve hot and enjoy!",
    ],
    cookingTime: "20 minutes",
    servings: 4,
  };
};

export function IngredientForm() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: crypto.randomUUID(), name: "" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

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
        ingredient.id === id ? { ...ingredient, name } : ingredient,
      ),
    );
  };

  const handleSubmit = () => {
    const enteredIngredients = ingredients
      .map((ing) => ing.name.trim())
      .filter((name) => name.length > 0);

    if (enteredIngredients.length === 0) {
      return;
    }

    const dummyRecipe = getDummyRecipe(enteredIngredients);
    setRecipe(dummyRecipe);
    setIsDialogOpen(true);
  };

  const hasValidIngredients = ingredients.some((ing) => ing.name.trim().length > 0);

  return (
    <div className="w-full">
      <div className="bg-card ring-1 ring-black/10 dark:ring-white/13 rounded-lg shadow-md dark:shadow-md dark:shadow-black/20 p-8 sm:p-10 space-y-8">
        <div className="space-y-1.5">
          <h2 className="text-base font-medium text-foreground">Ingredients</h2>
          <p className="text-xs text-muted-foreground">
            Add your ingredients one by one
          </p>
        </div>

        <div className="space-y-2">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="flex gap-2 items-center group"
              style={{
                animation: 'ingredient-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="e.g., tomatoes, chicken, pasta..."
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(ingredient.id, e.target.value)}
                  className="w-full"
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
              </div>
              {ingredients.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIngredient(ingredient.id)}
                  className="h-9 w-9 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <Button
            type="button"
            variant="ghost"
            size="default"
            onClick={addIngredient}
            className="flex-1 justify-start h-9 text-sm font-normal"
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Ingredient
          </Button>

          <Button
            type="button"
            variant="default"
            size="default"
            onClick={handleSubmit}
            disabled={!hasValidIngredients}
            className="flex-1 sm:flex-none sm:px-6 h-9 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Find Recipe
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[88vh] overflow-hidden flex flex-col p-0 font-medium">
          {recipe && (
            <>
              {/* Header */}
              <div className="border-b border-border px-7 py-6 bg-card/50">
                <DialogHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <DialogTitle className="text-xl font-medium flex items-center gap-2.5">
                        <ChefHat className="h-4 w-4 text-muted-foreground" />
                        {recipe.name}
                      </DialogTitle>
                      <DialogDescription className="flex items-center gap-5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {recipe.cookingTime}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3 w-3" />
                          {recipe.servings} servings
                        </span>
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-7 py-7 space-y-8">
                {/* Ingredients */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    Ingredients
                  </h3>
                  <div className=" bg-muted/20 rounded-lg p-4 border ring-white/10">
                    <ul className="space-y-2.5">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed"
                        >
                          <span className="text-muted-foreground mt-1.5 shrink-0 text-xs">•</span>
                          <span className="flex-1">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    Instructions
                  </h3>
                  <div className="space-y-1">
                    {recipe.instructions.map((instruction, index) => (
                      <div
                        key={index}
                        className="flex gap-4 group/item"
                      >
                        <div className="flex flex-col items-center shrink-0">
                          <div className="h-5 w-5 aspect-square rounded-full bg-primary/8 text-primary/80 flex items-center justify-center text-[10px] font-medium leading-none mt-0.5 group-hover/item:bg-primary/15 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            {index + 1}
                          </div>
                          {index < recipe.instructions.length - 1 && (
                            <div className="w-px h-full bg-border mt-1.5" />
                          )}
                        </div>
                        <p className="flex-1 text-sm text-foreground/90 pt-0 pb-4 leading-relaxed">
                          {instruction}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
