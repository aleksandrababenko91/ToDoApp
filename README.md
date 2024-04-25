# Project Name: ToDoApp

- - - 
# Description: 

 Used React for the frontend, JSON Server for backend emulation, and Vite for development tooling. Material-UI seems to be the choice for UI components, along with some additional libraries for styling and utility.

ToDoApp is a task management application designed to help users organize and track their tasks efficiently. Built with React and utilizing Material-UI components, it offers a user-friendly interface for creating, editing, and managing tasks. With features like date pickers and swipeable views, ToDoApp aims to streamline task management, enhancing productivity and organization for users.

The ToDoApp project is a project that has been implemented during February and March 2024 for my own pleasure and learning. This template provides a minimal setup to run React on Vite. The goal is to learn and present the necessary skills to software developers.
- - - 
# Hankkeen kuvaus:

ToDoApp-projekti on hanke, joka on toteutettu helmikuun ja maaliskuun 2024 aikana omaksi ilokseni ja oppimisekseni. Tämä malli tarjoaa minimaalisen asennuksen Reactin toimimiseksi Vitessä. Tavoitteena on oppia ja esitellä tarvittavia taitoja ohjelmistokehittäjille.

Käytettiin Reactia käyttöliittymässä, JSON Serveriä taustajärjestelmän emulointiin ja Vitea kehitystyökaluihin. Material-UI näyttää olevan valinta käyttöliittymäkomponenteille, sekä joitakin lisäkirjastoja tyyliä ja hyödyllisyyttä varten.

ToDoApp on tehtävienhallintasovellus, joka on suunniteltu auttamaan käyttäjiä järjestämään ja seuraamaan tehtäviä tehokkaasti. Se on rakennettu Reactilla ja hyödyntää Material-UI-komponentteja, ja se tarjoaa käyttäjäystävällisen käyttöliittymän tehtävien luomiseen, muokkaamiseen ja hallintaan. Ominaisuuksilla, kuten päivämäärävalitsimet ja pyyhkäisynäkymät, ToDoApp pyrkii virtaviivaistamaan tehtävien hallintaa ja parantamaan käyttäjien tuottavuutta ja organisointia.

- - - 
# Front-end Developer:

# _**Aleksandra Babenko**_

- - - 

# Technologies used:

**Frontend:**

```diff
- React.js
- CSS-in-JS
- Material-UI
- axios
- dayjs
- react-swipeable-views: React component for swipeable views
```
**Backend:**
```diff
- json-server: Full fake REST API for mocking and prototyping
```

**Development & Tooling:**
```diff
- Vite
- eslint
- uuid: Library for generating UUIDs

```

- - - 
# Figma

<img src="/src/images/Screenshot 2024-03-04 at 18.26.18.png">



# User Functions

**Task Management:**

1. Users can create new projects and tasks.
2. Users can edit existing projects, tasks and subtasks.
3. Users can delete and duplicate projects using Context Menu (right click mouse).



**Task Organization:**
1. Users can organize tasks using date pickers.
2. Users can navigate through tasks using swipeable views.

- - - 

# Features

1. **Responsive design:**

The app provides a responsive user interface, ensuring compatibility across various devices and screen sizes.

2. **Styling:**

Styled with Emotion and Material-UI for visually appealing and consistent design.

3. **Date Handling:**

Integrates dayjs for seamless date manipulation, allowing users to set and manage task deadlines effectively.

4. **Unique Task Identification:**

Utilizes UUID generation to ensure each task has a unique identifier, preventing conflicts or duplicates.


# Future updates:

- Hovering and Focusing and tasks and subtasks

- Drag and Drop between Tasks and Projects

- Implement User Authentication

- - - 

# Requirements:
1. [Node](https://nodejs.org/en/download)
2. React.js
3. [npm](https://docs.npmjs.com/cli/v8/commands/npm-install)
4. Git
- - - 

# Installation:
1. Clone the Repository:
2. Navigate to the Project Directory:
```
cd todoapp 

```
3. Install Dependencies:
``` 
npm install 

```
4. Server: Start JSON Server with port 3001 and watch db.json.
```
npm run server 

```
5. Start the Development Server:
```
npm run dev 

```
6. [Open the App in your Browser](http://localhost:3000 )


# How App looking in Browser:


<img src="src/images/näköinen.png">
<img src="src/images/Screenshot 2024-04-01 at 14.18.24.png">
<img src="src/images/näk2.png">

<img src="/src/images/Screenshot 2024-03-04 at 18.26.18.png">

- - - 
