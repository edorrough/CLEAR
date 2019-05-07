# Documentation
---
## Table of Contents
- [Custom Navbar](#navbar)
- [Education Content](#Education)

---
### [Custom Navbar](#navbar)
To edit the navigation bar at the top of the page you can navigate [here](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/customNavbar/).

**/Server/client/src/components/customNavbar/**

You will find [CustomNavbar.js](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/customNavbar/CustomNavbar.js) where you can edit the text shown and add/remove application routes from the navigation.    
To change styling such as colors/spacing/etc. edit CustomNavbar.scss found [here](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/customNavbar/CustomNavbar.scss):    
    
**/Server/client/src/components/customNavbar/CustomNavbar.scss**    
    
Here you can customize the design using css-like syntax.

---
### [Education Content](#Education)
To edit the first block of content edit introduction.js file found [here](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/components/education/sections/introduction/introduction.js)    
Simply add html paragraph blocks: ```<p>Your words here!</p>```    
    
**/Server/client/src/components/education/sections/introduction/introduction.js**
    
To edit the blocks of content for each education option edit the publicEducation.js file found [here](https://bitbucket.org/rj218/clearrepo/src/master/Server/client/src/reducers/publicEducation/publicEducation.js):    
    
**/Server/client/src/reducers/publicEducation/publicEducation.js**
     
This file contains a list of objects that are representative of the content on the live site. This is what they look like:     
     
```	
{
            content_header: 'Institute of Cognitive Science (ICS) Graduate Certificate Programs',
            content_header_link: 'https://www.colorado.edu/ics/',
            content_content: "The Institute of Cognitive Science (ICS) sponsors Graduate Certificate Programs and Combined PhD Programs that provide exceptional 
			readth and depth of interdisciplinary training in the cognitive sciences. Successful completion of an ICS program is acknowledged by a Certificate of 
			Completion on the student’s transcript. The PhD programs are noted on the student’s diploma. NOTE: We are not an admitting department. Please email or 
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