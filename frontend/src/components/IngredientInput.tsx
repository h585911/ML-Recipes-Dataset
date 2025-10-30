import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X } from "lucide-react";

export interface Ingredient {
  id: string;
  name: string;
}

interface IngredientInputProps {
  ingredient: Ingredient;
  showRemoveButton: boolean;
  onUpdate: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function IngredientInput({
  ingredient,
  showRemoveButton,
  onUpdate,
  onRemove,
  onKeyDown,
}: IngredientInputProps) {
  return (
    <div
      key={ingredient.id}
      className="flex gap-2 items-center group"
      style={{
        animation: "ingredient-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="flex-1 relative">
        <Input
          type="text"
          placeholder="e.g., tomatoes, chicken, pasta..."
          value={ingredient.name}
          onChange={(e) => onUpdate(ingredient.id, e.target.value)}
          className="w-full rounded-none"
          onKeyDown={onKeyDown}
        />
      </div>
      {showRemoveButton && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onRemove(ingredient.id)}
          className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-none!"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}
