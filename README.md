# Project: **CLEAR Website Application Development**
#### [CLEAR Website Link	](https://lit-wave-46253.herokuapp.com/)

![](https://res.cloudinary.com/dtf7zeh9v/image/upload/v1555968130/background_in_frontend/home-landing/desktop/home-landing.jpg)


******************************************************************************************

## **Table of Contents:**

* **[1. Introduction](#introduction)**
* **[2. Getting Started](#getting-started)**
* **[3. Documentation](#documentation)**
* **[4. Prerequisites](#prerequisites)**
* **[5. Installation/Setup](#installationsetup)**
* **[6. Deployment](#deployment)**
* **[7. License/Copyright](#licensecopyright)**

******************************************************************************************


## **Introduction:**
The CLEAR (Computational Language and EducAtion Research) Lab is a research organization at the University of Colordao at Boulder working to advance the field of Human Language Technology through the collaboration of the following departments: Computer Science, Linguistics, Education, Cognition, Psychology, and Speech and Language.  

The goal of our project was to redesign the user-interface and rebuild the original CLEAR website.  The web app for this new site was built using the MERN stack (MongoDB, Express.js, React.js/Redux.js, Node.js).

## **Getting Started:**
Install MongoDB, Node.js, and git.
## **Documentation:**
## **Prerequisites:**
## **Installation/Setup:**
To setup a local development environment of this web app:

Run `git clone https://rj218@bitbucket.org/rj218/clearrepo.git` in a local directory.

Run `npm install` within the Server directory and the client directory of your cloned repo.

Remove this section `"REACT_APP_RECAPTCHA_SITE_KEY=6LfQjXgUAAAAALYizu_VXiWriP_7FcXgwlmhrFwf"` from the line starting with `"start-js:"` from `/clearrepo/Server/client/package.json`.  
* *Before the edit: `"start-js": "REACT_APP_RECAPTCHA_SITE_KEY=6LfQjXgUAAAAALYizu_VXiWriP_7FcXgwlmhrFwf react-scripts start",`*
* *After the edit: `"start-js": "react-scripts start",`*

Run `npm start` from the client directory.

## **Deployment:**
## **License/Copyright:**
This repository is licensed under the terms of the [MIT License](LICENSE.md).
