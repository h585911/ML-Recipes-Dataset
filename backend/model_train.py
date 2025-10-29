import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import warnings

warnings.filterwarnings("ignore")

sns.set_style("whitegrid")
plt.rcParams["figure.figsize"] = (12, 6)

print("Laster datasett...")
df = pd.read_csv("data/recipes.csv")

print("\n" + "=" * 80)
print("PREPROSESSERING AV DATA")
print("=" * 80)

df_clean = df.copy()

df_clean["description"] = df_clean["description"].fillna("")
df_clean["ingredients"] = df_clean["ingredients"].fillna("")
df_clean["directions"] = df_clean["directions"].fillna("")
df_clean["category"] = df_clean["category"].fillna("")
df_clean["subcategory"] = df_clean["subcategory"].fillna("")

df_clean = df_clean[df_clean["category"] != ""]

print(f"\nDatasettets størrelse etter rengjøring: {df_clean.shape}")

tfidf_ingredients = TfidfVectorizer(
    max_features=100, stop_words="english", ngram_range=(1, 2)
)
