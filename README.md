# Project: **CLEAR Website Application Development**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

The goal of our project was to rebuild the original CLEAR website.  Our new site provides redesigned pages and a dynamic scheduler.  The web app for this new site was built using the MERN stack (MongoDB, Express.js, React.js/Redux.js, Node.js).

## **Getting Started:**
This project requires the following dependencies to run (MongoDB, Node.js, and git).  These instructions have been categorized by operating system.

In order to install MongoDB, Node.js, and git, follow the instructions by operating system.

#### **Windows:**

To install MongoDB locally on your Windows machine, follow this link: 
    [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

#### **MacOS:**

#### **Linux:**

## **Documentation:**
---
## Documentation - Table of Contents
    - Custom Navbar
    - Home Page
    - People Page
    - Projects Page
    - Education Page
    - Login Page
    - Contact Page

---
### Custom Navbar
To edit the navigation bar at the top of the page you can navigate [here](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/customNavbar/).

You will find [CustomNavbar.js](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/customNavbar/CustomNavbar.js) where you can edit the text shown and add/remove application routes from the navigation.    
To change styling such as colors/spacing/etc. edit CustomNavbar.scss found [here](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/customNavbar/CustomNavbar.scss).    
Here you can customize the design using css-like syntax.
---
### Home Page
#### Landing Banner
To edit the homepage landing image navigate to Page1.js [here](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/home/sections/welcome/subPages/Page1.js).    
Edit the src of the ```<img></img>``` src to your new image.    

#### About Section
To edit the About section content navigate to [Home.js](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/home/Home.js) and 
[Home.scss](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/home/Home.scss) to change styling.    

#### Projects Section
To edit the Projects section navigate to [Projects.js](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/home/sections/projects/Projects.js) and change
the ```<div className="card">``` divs with updated information:    

- images: ```<div className="image">```
- image description: ```<div className="content">```
- the tooltip text: ```<ReactTooltip```
- projects section: ```<div className="project-about">```.

Navigate to [Project.scss]((https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/home/sections/projects/Projects.scss)) to edit the style.

#### People Section
To edit the People section navigate to [MeetPeople.js](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/home/sections/meetPeople/MeetPeople.js) to change the content. Each person is represented as a card: ``` <div className="card">```    

- Name/association for the person: ```<div className="header">```
- Bio: ```<div className="content">```
- email: ```<i className="envelope outline icon" ></i>``` 
- image: ```<div className="image">```
- phone number: ```<i className="phone volume icon"></i>```

---
### People Page
To edit the list of people(updating information, adding people, removing people, moving people, etc.) navigate to [PeopleList.js](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/people/PeopleList.js).    
The list is organized into listst matching the people categories on the live site(Faculty, Admin Staff, Current Research Staff, etc.) and can be rearranged, expanded, downsized, or upate people's information.   
Navigate to [people.css](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/people/people.css) to edit the styling.
---
### Projects Page

---
### Education Page
To edit the first block of content edit introduction.js file found [here](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/education/sections/introduction/introduction.js).    
Simply add html paragraph blocks: ```<p>Your words here!</p>```    
    
To edit the blocks of content for each education option edit the publicEducation.js file found [here](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/reducers/publicEducation/publicEducation.js).    
     
This file contains a list of objects that are representative of the content on the live site. This is what they look like:     
     
```	
{
            content_header: 'Institute of Cognitive Science (ICS) Graduate Certificate Programs',
            content_header_link: 'https://www.colorado.edu/ics/',
            content_content: "The Institute of Cognitive Science (ICS) sponsors Graduate Certificate Programs and Combined PhD Programs that provide exceptional 
			readth and depth of interdisciplinary training in the cognitive sciences. Successful completion of an ICS program is acknowledged by a Certificate of 
			Completion on the student�s transcript. The PhD programs are noted on the student�s diploma. NOTE: We are not an admitting department. Please email or 
			call the department of interest to apply for graduate school. Upon acceptance into a department or unit's graduate program, then follow the instructions 
			below to apply for an ICS program. Four ICS Graduate Programs are available: Cognitive Science Graduate Certificate, Human Language Technology Certificate, 
			Cognitive Science Combined PhD, and Cognitive Neuroscience Combined Triple PhD.",
            previews: [
                {
                    preview_img: "https://res.cloudinary.com/dtf7zeh9v/image/upload/v1555871831/education_page/others/education_ics.jpg",
                    preview_title: "Certificates Information",
                    preview_alt: "Certificates Information",
                    preview_footer: "Certificates",
                    preview_content: "For more information, visit their site",
                    preview_link: "https://www.colorado.edu/ics/graduate-programs",
                }
            ]
        },
```


You can create more objects with information including the Header of the section along with a link to attach to it(not required.) 
The content you want to dispaly as ```content_content:```. The ```previews:``` section represents the image card. Here you can attach an image, a title, 
alt text, a header under the image, hoveer text, and finally a link.
    
The order of the list reflects the order on the live site. You can rearrange the ordering in the list, add items by copying the above code, 
or remove items by simply deleting them.
---
#### Login Page
To edit the Login Page navigate to [Login.scss](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/login/Login.scss) to edit the styling.

---
#### Contact Us Page
To edit the Contact Page navigate to [ContactUS.js](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/contactUS/ContactUS.js) to edit the content. Here you will find a form ```<div className="contact-page-container">```.    
You can edit the contact information displayed here. To edit the styling navigate to [ContactUS.scss](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/contactUS/ContactUS.scss).

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
