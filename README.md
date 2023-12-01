# RiverTrack: Streamlining River Flow Rate Monitoring

This site, targeted towards fishing enthusiasts, will showcase real-time data correlating to rivers in the US. Data will come from the Water Web Services Tool provided by the United States Geological Survey (USGS). Users will be able to save rivers to a collection for easy monitoring. Given the app’s focus on anglers, implemented validation will indicate whether or not a river’s flow conditions are optimal for fishing at any given moment.

While exploring potential topics for this project, I was reminded of previous work I had done for a water users association here in Utah. There are a few realistic applications for river data, but my inspiration for this project was my Dad’s love of flyfishing. When I mentioned that I was thinking about incorporating a river data API into my project, he practically begged me to make a “fishing buddy” app for flyfishing fanatics like him to monitor the flow of their favorite rivers. 

I want to build at least three pages for this project: a Home page introducing the user to the site; an Exploration page showing a list of rivers; and a Favorites page where users can get insights into their selected rivers of interest.


---

## Nov 17
- [x] Set up the initial HTML pages (Home, Explore Rivers, User Favorites)
- [x] Establish links (anchor tags) for citing USGS.
- [x] Figures/images on the home page for visual appeal.

- [x] Plan CSS styling and mockup elements (this includes color scheme, margin/padding, and border radius)
- [x] Set up basic page layout with nav, footer, etc.
- [x] Incorporate asides for helpful tips.

- [x] **HTML form**. A place for users to submit a request for a river to monitor. Will include text, number, select, reset, and submit inputs.
- [x] **Search bar** in the exploration page(text input for filtering) 

- [x] **Search results table.** Table will show river name, general location, and average flow rate. (Use nth child styling for variation among rows, and hover effects--including transitions--to change row color & show focus). 
- [x] **API Call**. Call from USGS API and access the data (async await/promises).


---
## Nov 24
- [x] **Populate the starting table.**
- [x] **Stylize table.** Use nth child and hover.
- [x] **Filter functions and event listeners.** Using data from the API, set up filter functions and event listeners to populate the table (access DOM elements, add/remove event listeners).
- [x] **Structure/Organization**. Establish files in appropriate folders (ui, domain, svc)
- [x] **Read querystring.** (Based on a given streamflow range).
---
## Dec 1
- [ ] Style form elements and other inputs.
- [ ] Set up basic sign in. Validate username input—if it doesn't exist, show error message.
- [ ] **Local Storage**. Use local storage to save IDs of users that have signed in (?)
- [ ] **Drag/Drop**. User should be able to drag/drop rivers from the table into their favorites list in the side bar.
- [ ] **Infrastructure.** Create a C# minimal API to store/retrieve users and their saved favorites.
---
## Dec 8
- [ ] Finish up infrastructure requirements.
- [ ] Revisit difficult topics/bugs.
---
## Dec 13 - Final Presentation

