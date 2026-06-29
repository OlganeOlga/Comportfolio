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

### Overview

This improvement plan is designed to gradually expand my skills from frontend development to full-stack application architecture. The goal is to strengthen practical experience, improve code structure, and build modern web applications with real-world functionality.

---

### Phase 1: Strengthen Frontend Skills

**Objective:** Improve UI/UX quality and build a stronger portfolio.

#### Actions:

* Add more projects and interactive demos
* Improve styling with modern CSS (Grid, Flexbox, animations)
* Enhance JavaScript interactivity
* Refactor existing projects for cleaner structure
* Focus on responsive and accessible design

**Goal:** Demonstrate solid frontend development skills through polished, functional projects.

---

### Phase 2: Implement Backend Functionality with Python

**Objective:** Transition from frontend-only projects to full-stack applications.

#### Actions:

* Learn backend fundamentals (HTTP, REST APIs, routing)
* Build a backend using Python (Flask or FastAPI)
* Connect frontend forms to backend endpoints
* Implement data validation and error handling

**Goal:** Understand how client-server communication works and build functional APIs.

---

### Phase 3: Add Database Integration

**Objective:** Store and manage persistent data.

#### Actions:

* Learn SQL fundamentals
* Use a relational database (e.g., PostgreSQL)
* Design database schemas
* Implement CRUD operations (Create, Read, Update, Delete)
* Connect database to Python backend

**Goal:** Build fully functional data-driven applications.

---

### Phase 4: Build an Example Single Page Application (SPA)

**Objective:** Learn modern frontend architecture.

#### Actions:

* Build a SPA using a framework (e.g., React)
* Implement client-side routing
* Manage application state
* Connect SPA to Python backend API

**Goal:** Gain experience with modern frontend frameworks and component-based development.

---

### Long-Term Vision

By completing these phases, I will move from static websites to fully structured full-stack applications that include:

* Interactive frontend
* Backend API
* Database integration
* Modern SPA architecture


## Licens
This project is for personal portfolio use.