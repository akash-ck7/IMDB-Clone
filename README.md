IMDb Clone — Project Overview

Project Summary

    The IMDb Clone is a full-stack web application that allows users to:
        • Add, edit, and list movies.
        • Search for movie data using the OMDb API.
        • All operations happen on a single-page UI built with React + Bootstrap.
        • Backend built using Node.js, Express, Sequelize, PostgreSQL.

Features

Frontend
• Add Movie form with inline creation of actors and producers.
• OMDb Search Integration to auto-fill movie details.
• Responsive layout using React Bootstrap.
• Poster validation: clear feedback if a poster is not available.
• Uses React Hooks and Ref Forwarding for form integration.

Backend
• CRUD APIs for Movies, Actors, and Producers.
• Many-to-Many relationship: Movie ⬌ Actors.
• Many-to-One relationship: Movie ➝ Producer.
• Built with Node.js + Sequelize + PostgreSQL.

Setup & Run Locally

Prerequisites
• Node.js >= 16
• PostgreSQL
. Docker
Step-by-Step Instructions

1.  Clone the Repo

    git clone https://github.com/akash-ck7/IMDB-Clone.git
    cd imdb-clone

2.  Intall the docker desktop client and start the engine

3.docker-compose up --build

4.After successfull build you can see that in http://localhost:3000/

How It Works 1. Search Movie (OMDb API)
• User types a movie name → gets details like title, actors, director, and release date.
• If movie exists, show data + “Add Movie” button. 2. Prefill Add Movie Form
• Clicking “Add Movie” auto-fills the form using ref to the form component. 3. Add/Edit Movies
• Inline create new Actors/Producers if not found.
• Assign multiple actors to a movie.
• Data is saved via the backend API. 4. List All Movies
• Table displays all movies with details like title, year, producer, and actor list.

Notes

    •	All functionality runs on one page — no page reloads.
    •	Poster fallback shows a warning message if no poster is available from OMDb.
    •	Movie form supports manual entry as well.
    •	Designed with clean, readable, and scalable React & Node.js code.

Contact Me

    •	Incase if you are facing any difficulties while cloneing this repo and run into locale please    reach out to in this below mobile number as well as email
           Mobile Number       :9080291768
           gmail               :vidhyasagar.s161199@gmail.com
           Linkdin Profile url :https//linkedin.com/in/vidhyasagar-s-630325210
