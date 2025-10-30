import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import type { Recipe } from "../types/recipe";

interface RecipeListDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  recipes: Recipe[];
  onRecipeSelect: (recipe: Recipe) => void;
}

export function RecipeListDialog({
  isOpen,
  onOpenChange,
  recipes,
  onRecipeSelect,
}: RecipeListDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col p-0 font-medium!">
        <div className="border-b border-border px-7 py-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">
              Found {recipes.length} Recipes
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Select a recipe to view details
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <div className="space-y-3">
            {recipes.map((recipe, index) => (
              <button
                key={index}
                onClick={() => onRecipeSelect(recipe)}
                className="w-full text-left p-4 rounded-lg border border-border bg-card hover:bg-muted transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium text-foreground">{recipe.name}</h3>
                    {recipe.category && (
                      <p className="text-sm text-muted-foreground">
                        {recipe.category}
                        {recipe.subcategory && ` • ${recipe.subcategory}`}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <span>{recipe.numIngredients} ingredients</span>
                      <div className="h-[3px] w-[3px] bg-foreground/70"></div>
                      <span>{recipe.numSteps} steps</span>
                      <div className="h-[3px] w-[3px] bg-foreground/70"></div>
                      <span>
                        Match: {(recipe.similarityScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
