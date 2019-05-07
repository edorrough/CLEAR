# Documentation
---
## Table of Contents
- Custom Navbar
- Home Page
- Education Content

---
### Custom Navbar
To edit the navigation bar at the top of the page you can navigate [here](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/customNavbar/).

You will find [CustomNavbar.js](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/customNavbar/CustomNavbar.js) where you can edit the text shown and add/remove application routes from the navigation.    
To change styling such as colors/spacing/etc. edit CustomNavbar.scss found [here](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/customNavbar/CustomNavbar.scss).    
Here you can customize the design using css-like syntax.
---
### Home Page
#### Landing Banner
To change the homepage landing image navigate to Page1.js [here](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/home/sections/welcome/subPages/Page1.js).    
Edit the src of the ```<img></img>``` src to your new image.    

#### About Section
To change the About section content navigate to [Home.js](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/home/Home.js) and 
[Home.scss](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/home/Home.scss) to change styling.    

#### Projects Section
To change the Projects section navigate to [Projects.js](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/home/sections/projects/Projects.js) to edit
the ```<div className="card">``` divs with updated information unwanted    
divs(such as the number of members) can be removed by deleting or commenting out the appropriate divs.    
You can also edit the images: ```<div className="image">```, image description: ```<div className="content">```,the tooltip text: ```<ReactTooltip```,    
and the about projects section: ```<div className="project-about">```.

---
### Education Content
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
The content you want to dispaly as 'content_content'. The 'preview' section represents the image card. Here you can attach an image, a title, 
alt text, a header under the image, hoveer text, and finally a link.
    
The order of the list reflects the order on the live site. You can rearrange the ordering in the list, add items by copying the above code, 
or remove items by simply deleting them.
---