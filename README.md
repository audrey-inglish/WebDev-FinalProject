# RiverTrack - Streamlining River Flow Rate Monitoring

This site, targeted towards fishing enthusiasts, will showcase real-time data correlating to rivers in the US. Data will come from the Water Web Services Tool provided by the United States Geological Survey (USGS). Users will be able to save rivers to a collection for easy monitoring. Given the app’s focus on anglers, implemented validation will indicate whether or not a river’s flow conditions are optimal for fishing at any given moment.

While exploring potential topics for this project, I was reminded of previous work I had done for a water users association here in Utah. There are a few realistic applications for river data, but my inspiration for this project was my Dad’s love of flyfishing. When I mentioned that I was thinking about incorporating a river data API into my project, he practically begged me to make a “fishing buddy” app for flyfishing fanatics like him to monitor the flow of their favorite rivers. 

I want to build at least three pages for this project: a Home page introducing the user to the site; an Exploration page showing a list of rivers; and a Favorites page where users can get insights into their selected rivers of interest.


---

## Nov 17
- [ ] Set up the initial HTML pages (Home, Explore Rivers, User Favorites)

- [ ] Plan CSS styling and mockup elements (this includes colors scheme, margin/padding, and border radius)
- [ ] Set up basic page layout with nav, footer, etc.

- [ ] **HTML form** (a place for users to submit a request for a river to monitor)
- [ ] **Search bar** in the exploration page(text input for filtering) 

- [ ] **Search results table.** Table will show river name, general location, and average flow rate. (Use nth child styling for variation among rows, and hover effects to change row color & show focus). 
- [ ] **River details.** When user clicks into a river, they’ll see the average flow rate, current gage height, geological location (include unordered/ordered lists, and use sections/articles to break info up)
- [ ] **API Call**. Call from USGS API and access the data (async await/promises).


---
## Nov 24
- [ ] **Filter functions and event listeners.** Using data from the API, set up filter functions and event listeners to populate the table (access DOM elements, add/remove event listeners).
- [ ] **Structure/Organization**. Establish files in appropriate folders (ui, domain, svc)
- [ ] **Read querystring.** (Allowing users to share specific riverse).
---
## Dec 1
- [ ] **Local Storage**. Be able to save/retrieve user's list of favorite rivers from local storage.
- [ ] **Drag/Drop**. User should be able to drag/drop rivers from the table into their favorites list in the side bar.
- [ ] Start on infrastructure requirements (to be determined, based on what we discuss in class).
---
## Dec 8
- [ ] Finish up infrastructure requirements.
- [ ] Revisit difficult topics/bugs.
- 
---
## Dec 13 - Final Presentation

