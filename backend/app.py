import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Globale variabler for å lagre data og modell
model = None
recipe_embeddings = None
recipes_df = None


def load_and_prepare_data(csv_path):
    global model, recipe_embeddings, recipes_df

    print("Laster data...")
    recipes_df = pd.read_csv(csv_path)

    recipes_df["ingredients"] = recipes_df["ingredients"].fillna("")

    print(f"Lastet {len(recipes_df)} oppskrifter")

    print("Laster embedding model")
    model = SentenceTransformer("all-MiniLM-L6-v2")

    print("Lager embeddrings for alle oppskrifter (dette kan ta litt tid)...")
    recipe_embeddings = model.encode(
        recipes_df["ingredients"].tolist(), show_progress_bar=True, batch_size=32
    )

    print("Setup ferdig")
    return recipe_embeddings


def save_embeddings(embeddings_path="data/recipe_embeddings.pkl"):
    with open(embeddings_path, "wb") as f:
        pickle.dump(recipe_embeddings, f)
    print(f"Embeddings lagret i {embeddings_path}")


def load_embeddings(embeddings_path="data/recipe_embeddings.pkl"):
    global recipe_embeddings
    with open(embeddings_path, "rb") as f:
        recipe_embeddings = pickle.load(f)
    print(f"Embeddings lastet fra {embeddings_path}")


def find_matching_recipes(user_ingredients, top_k=5):
    user_embedding = model.encode([user_ingredients])

    similarities = cosine_similarity(user_embedding, recipe_embeddings)[0]

    top_indices = np.argsort(similarities)[-top_k:][::-1]

    results = []
    for idx in top_indices:
        recipe = recipes_df.iloc[idx]
        results.append(
            {
                "recipe_title": str(recipe["recipe_title"]),
                "category": str(recipe.get("category", "N/A")),
                "subcategory": str(recipe.get("subcategory", "N/A")),
                "description": str(recipe.get("description", "N/A")),
                "ingredients": str(recipe["ingredients"]),
                "directions": str(recipe.get("directions", "N/A")),
                "num_ingredients": int(recipe.get("num_ingredients", 0))
                if pd.notna(recipe.get("num_ingredients"))
                else 0,
                "num_steps": int(recipe.get("num_steps", 0))
                if pd.notna(recipe.get("num_steps"))
                else 0,
                "similarity_score": float(similarities[idx]),
            }
        )

    return results


@app.route("/search", methods=["POST"])
def search_recipes():
    try:
        data = request.get_json()
        user_ingredients = data.get("ingredients", "")
        top_k = data.get("top_k", 5)

        if not user_ingredients:
            return jsonify({"error": "No ingredients provided."}), 400

        results = find_matching_recipes(user_ingredients, top_k)

        return jsonify({"success": True, "query": user_ingredients, "results": results})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy"})


if __name__ == "__main__":
    import sys, os

    # Kommenter ut portinnstillingen for å bruke standard 8080
    port = int(os.environ.get("PORT", 5000))

    if len(sys.argv) < 2:
        print(
            "Bruk: python app.py <path_to_recipes.csv> [--load-embeddings <embeddings.pkl>]"
        )
        sys.exit(1)

    csv_path = sys.argv[1]

    print("Laster oppskrifter...")
    recipes_df = pd.read_csv(csv_path)
    recipes_df["ingredients"] = recipes_df["ingredients"].fillna("")
    print(f"Lastet {len(recipes_df)} oppskrifter")

    print("Laster embedding model...")
    model = SentenceTransformer("all-MiniLM-L6-v2")

    if "--load-embeddings" in sys.argv:
        embeddings_path = sys.argv[sys.argv.index("--load-embeddings") + 1]
        load_embeddings(embeddings_path)
    else:
        load_and_prepare_data(csv_path)
        if "--save-embeddings" in sys.argv:
            embeddings_path = sys.argv[sys.argv.index("--save-embeddings") + 1]
            save_embeddings(embeddings_path)

    print("\nStarter Flask server...")
    print("API endpoint: POST http://localhost:8080/search")
    print('Example request body: {"ingredients": "chicken, rice, garlic"}')

    # Sett port til default '8080' hvis ikke spesifisert i miljøvariabler
    app.run(debug=False, host="0.0.0.0", port=port)
