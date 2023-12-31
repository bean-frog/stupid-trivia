# stupid trivia
A trivia game where most of the answers are kinda stupid. <br>
Partially inspired by Magic The Noah's video on Youtube (basic concept and some of the questions) <br>
check his channel out, it's pretty funny


## Playing
- just press play lmao its not that hard
- try not to rage too hard

## Contributing
- project is made with React
- dependencies: tailwind@latest, postcss@latest, autoprefixer@latest, whatever else React needs (just use `npm install` idk)
- tailwind build command (from root): `npx tailwindcss -i ./src/index.css -o ./src/built.css --watch`
- App.js: main app component
- Menu.js: the little menu thing at the top left
- Game.js: game component (ui, all game logic)
- the questions are in questions.js (duh). Game.js selects 10 at random