import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import type { Recipe } from "../types/recipe";

interface RecipeDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: Recipe | null;
}

function extractInstructions(recipe: Recipe): string[] {
  const formattedSteps = recipe.instructions.map((step, index) => {
    return `${index + 1}. ${step}`;
  });
  return formattedSteps;
}

export function RecipeDetailDialog({
  isOpen,
  onOpenChange,
  recipe,
}: RecipeDetailDialogProps) {
  if (!recipe) return null;

  const instructions = extractInstructions(recipe);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[88vh] overflow-hidden flex flex-col p-0 font-medium">
        <div className="border-b border-border px-7 py-6">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <DialogTitle className="text-xl font-medium flex items-center gap-2.5">
                  {recipe.name}
                </DialogTitle>
                <DialogDescription className="space-y-2">
                  {(recipe.category || recipe.subcategory) && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {recipe.category && <span>{recipe.category}</span>}
                      {recipe.category && recipe.subcategory && <div className="h-[3px] w-[3px] bg-foreground/70"></div>}
                      {recipe.subcategory && <span>{recipe.subcategory}</span>}
                    </div>
                  )}
                  {recipe.description && (
                    <p className="text-sm text-muted-foreground">
                      {recipe.description}
                    </p>
                  )}
                  <div className="flex items-center gap-5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      {recipe.numIngredients} ingredients
                    </span>
                    <div className="h-[3px] w-[3px] bg-foreground/70"></div>
                    <span className="flex items-center gap-1.5">
                      {recipe.numSteps} steps
                    </span>
                    <div className="h-[3px] w-[3px] bg-foreground/70"></div>
                    <span>
                      Match: {(recipe.similarityScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-7 space-y-8">
          <div className="space-y-3">
            <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Ingredients
            </h3>
            <div className=" bg-muted/20 rounded-lg p-4 border ring-white/10">
              <ul className="space-y-2.5">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm text-foreground/90 leading-relaxed items-center"
                  >
                    <div className="h-[3px] w-[3px] bg-foreground/70"></div>
                    <span className="flex-1">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Instructions
            </h3>
            <div className="space-y-1">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex gap-4 group/item">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="h-5 w-5 aspect-square rounded-full bg-primary/8 text-primary/80 flex items-center justify-center text-[10px] font-medium leading-none mt-0.5 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {index + 1}
                    </div>
                    {index < instructions.length - 1 && (
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
      </DialogContent>
    </Dialog>
  );
}
