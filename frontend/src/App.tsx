import "./App.css";
import { IngredientForm } from "./components/IngredientForm";

function App() {
  return (
    <main className="flex-1 h-full min-w-0 min-h-screen flex flex-col items-center justify-center relative bg-background font-medium!">
      <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="w-full max-w-2xl space-y-12">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-medium tracking-tight text-foreground">
              Recipe Finder
            </h1>
            <p className="text-muted-foreground text-sm mt-1.5">
              Enter your ingredients and discover delicious recipes
            </p>
          </div>
          <IngredientForm />
        </div>
      </div>
    </main>
  );
}
export default App;
