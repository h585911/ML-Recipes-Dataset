# ML Recipes Webapplication
Et lite fullstack prosjekt som anbefaler oppskrifter basert på ingredienser i kjøreskapet.
Dette prosjektet splittet opp frontend og backend til egne mapper:
- `backend` - Python (Flask). Embedder datasettet til vektor, og sender respons til frontend.
- `frontend` - React + TypeScript. Samler inn input fra bruker og viser UI, som igjen kaller `backend`.

## Installasjon backend (server)
Bekreft at du er i mappen `/backend`.
Deretter kjører du følgende kommando for å generere embeddings, og starte prosjektet:<br />
`./start.sh`

## Installasjon frontend (webapplikasjon)
Bekreft at du er i mappen `/frontend`<br />
Deretter kjører du kommandoen `bun install` eller `npm install`.<br />
Etter dette kjører du kommandoen `bun run dev` eller `npm run dev`.

## Hvordan bruker du serveren?
Send en POST request til: `http://localhost:8080/search` med Postman eller cURL
med JSON body:
```
{
    "ingredients": "graham crackers, milk chocolate candy bars, marshmallows",
    "top_k": 5
}
```
for å få tilbake en liste med oppskrifter som er relatert til søket:
```
{
    "query": "graham crackers, milk chocolate candy bars, marshmallows",
    "results": [
        {
            "category": "Cookies",
            "description": "I'll admit making s'mores over a campfire is the best method, but, if your living with a statewide burn ban and don't have a fireplace, this is a fabulous alternative. On the up side, this method does produce perfectly uniform, golden marshmallows.",
            "directions": "[\"Preheat the oven broiler. Line a small pan with aluminum foil and lightly coat with cooking spray.\", \"Break the graham crackers in half and lay 4 of the squares out on a serving plate. Break the candy bars in half and lay one piece on each of the graham crackers on the plate.\", \"Arrange the marshmallows in a single layer in the prepared pan.\", \"Broil the marshmallows until the tops brown, turn the marshmallows to brown the undersides. Keep a close eye on the marshmallows so they do not burn. They will brown very quickly.\", \"Remove the marshmallows from the pan and place three on each of the chocolate squares. Top with the remaining graham cracker halves.\"]",
            "ingredients": "[\"4 graham crackers\", \"2 milk chocolate candy bars\", \"12 marshmallows\"]",
            "num_ingredients": 3,
            "num_steps": 5,
            "recipe_title": "Broiler S'mores",
            "similarity_score": 0.892425537109375,
            "subcategory": "Sandwich Cookies"
        },
        {
            "category": "Halloween",
            "description": "I'll admit making s'mores over a campfire is the best method, but, if your living with a statewide burn ban and don't have a fireplace, this is a fabulous alternative. On the up side, this method does produce perfectly uniform, golden marshmallows.",
            "directions": "[\"Preheat the oven broiler. Line a small pan with aluminum foil and lightly coat with cooking spray.\", \"Break the graham crackers in half and lay 4 of the squares out on a serving plate. Break the candy bars in half and lay one piece on each of the graham crackers on the plate.\", \"Arrange the marshmallows in a single layer in the prepared pan.\", \"Broil the marshmallows until the tops brown, turn the marshmallows to brown the undersides. Keep a close eye on the marshmallows so they do not burn. They will brown very quickly.\", \"Remove the marshmallows from the pan and place three on each of the chocolate squares. Top with the remaining graham cracker halves.\"]",
            "ingredients": "[\"4 graham crackers\", \"2 milk chocolate candy bars\", \"12 marshmallows\"]",
            "num_ingredients": 3,
            "num_steps": 5,
            "recipe_title": "Broiler S'mores",
            "similarity_score": 0.892425537109375,
            "subcategory": "Halloween Cookies"
        },
        {
            "category": "Camping Recipes",
            "description": "I'll admit making s'mores over a campfire is the best method, but, if your living with a statewide burn ban and don't have a fireplace, this is a fabulous alternative. On the up side, this method does produce perfectly uniform, golden marshmallows.",
            "directions": "[\"Preheat the oven broiler. Line a small pan with aluminum foil and lightly coat with cooking spray.\", \"Break the graham crackers in half and lay 4 of the squares out on a serving plate. Break the candy bars in half and lay one piece on each of the graham crackers on the plate.\", \"Arrange the marshmallows in a single layer in the prepared pan.\", \"Broil the marshmallows until the tops brown, turn the marshmallows to brown the undersides. Keep a close eye on the marshmallows so they do not burn. They will brown very quickly.\", \"Remove the marshmallows from the pan and place three on each of the chocolate squares. Top with the remaining graham cracker halves.\"]",
            "ingredients": "[\"4 graham crackers\", \"2 milk chocolate candy bars\", \"12 marshmallows\"]",
            "num_ingredients": 3,
            "num_steps": 5,
            "recipe_title": "Broiler S'mores",
            "similarity_score": 0.892425537109375,
            "subcategory": "Camping Recipes"
        },
        {
            "category": "Halloween",
            "description": "I'll admit making s'mores over a campfire is the best method, but, if your living with a statewide burn ban and don't have a fireplace, this is a fabulous alternative. On the up side, this method does produce perfectly uniform, golden marshmallows.",
            "directions": "[\"Preheat the oven broiler. Line a small pan with aluminum foil and lightly coat with cooking spray.\", \"Break the graham crackers in half and lay 4 of the squares out on a serving plate. Break the candy bars in half and lay one piece on each of the graham crackers on the plate.\", \"Arrange the marshmallows in a single layer in the prepared pan.\", \"Broil the marshmallows until the tops brown, turn the marshmallows to brown the undersides. Keep a close eye on the marshmallows so they do not burn. They will brown very quickly.\", \"Remove the marshmallows from the pan and place three on each of the chocolate squares. Top with the remaining graham cracker halves.\"]",
            "ingredients": "[\"4 graham crackers\", \"2 milk chocolate candy bars\", \"12 marshmallows\"]",
            "num_ingredients": 3,
            "num_steps": 5,
            "recipe_title": "Broiler S'mores",
            "similarity_score": 0.892425537109375,
            "subcategory": "Leftover Candy Recipes"
        },
        {
            "category": "Allrecipes Allstar Recipes",
            "description": "This recipe for air fryer s'mores is perfect for the times when you have the craving, but not the bonfire. You can easily make 1 s'more in the air fryer, or make the whole batch.",
            "directions": "[\"Preheat an air fryer to 380 degrees F (193 degrees C). Lay out a total of 10 graham crackers. Do not break apart.\", \"Take 10 s'more size marshmallows and cut them in half horizontally with a serrated knife. Place the sticky side of each marshmallow half onto each square side of a graham cracker rectangle.\", \"Place a piece of parchment into the air fryer basket; place a graham cracker into the basket, marshmallow side facing up. Air fry until marshmallow is toasted, 3 to 4 minutes. Remove carefully.\", \"Gently break marshmallow-topped graham cracker rectangle into 2 squares, add a chocolate bar half on top of 1 square, and sandwich the chocolate with the other square.\"]",
            "ingredients": "[\"1 sleeve graham crackers\", \"5 (1.5 ounce) chocolate candy bars\", \"10 s'more-sized marshmallows\"]",
            "num_ingredients": 3,
            "num_steps": 4,
            "recipe_title": "Air Fryer S'Mores",
            "similarity_score": 0.834456205368042,
            "subcategory": "Allrecipes Allstars Desserts"
        }
    ],
    "success": true
}
```
