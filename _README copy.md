# Comportfolio

A personal portfolio website showcasing web development projects using HTML, SCSS, JavaScript, and Python, databases, and cloud technologies.

## Technologies Used
- HTML5
- SCSS
- JavaScript
- Python
- Git & GitHub

## Viewing the Portfolio
Open `index.html` in a browser, or view it live at:
[OlganeOlga/Portfolio](https://olganeolga.github.io/Comportfolio/)


## Technologies Used
### HTML5
### SCSS
### JavaScript
### Python
### Git & GitHub
### npm & package.json
``` npm init -y ``` ** Creates package.json
```npm install vite --save-dev``` ** Allows to run live server
I add to scripts:
```
   "sass": "sass scss/main.scss css/main.css", **watch changes in scss files and compeal it to main.css
   "watch": "sass --watch scss:css",
   "build": "sass scss:css --style=compressed", **build the copressd style for deploying
   "vite": "npm run dev"

## Projct structure
```Comportfolio/
                ├───.gitignor
                ├───assets
                │   ├───fonts
                │   ├───images
                │   └───_toggle
                ├───backend
                │   └───templates
                ├───blog
                ├───css
                ├───js
                ├───python
                ├───scss
                └───sections
                └── index.html
```

## Features
- Responsive web design
- Interactive JavaScript components
- Modular SCSS styling
- Python backend examples (optional)

## How to View Locally
1. Clone the repository:  
   ```bash
   git clone https://github.com/OlganeOlga/Comportfolio.git
   ```     
2. Open index.html in a browser

3. SCSS files can be compiled to CSS using Sass:
```sass --watch scss/main.scss:css/main.css```

## Future Improvements
- Add more projects and demos

- Enhance interactivity with JavaScript

- Implement backend functionality using Python


## Licens
This project is for personal portfolio use.