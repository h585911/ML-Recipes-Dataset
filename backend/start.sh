#!/bin/bash
# Startup script with debugging for easier running of the BE.

cd "$(dirname "$0")"

if [ ! -d "venv" ]; then
    echo "Error: Virtual environment not found. Please create it first:"
    echo "  python3 -m venv venv"
    echo "  venv/bin/pip install -r requirements.txt"
    exit 1
fi

if [ -f "data/recipe_embeddings.pkl" ]; then
    echo "Found existing embeddings, loading them..."
    venv/bin/python3 app.py data/recipes.csv --load-embeddings data/recipe_embeddings.pkl
else
    echo "No embeddings found, generating them (this may take several minutes)..."
    venv/bin/python3 app.py data/recipes.csv --save-embeddings data/recipe_embeddings.pkl
fi

