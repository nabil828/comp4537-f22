# Assignment 3 - Frontend Mania
Use your Pokémon API server from A2 or [my solution of A2](https://github.com/nabil828/comp4537repo/tree/main/Assignments/A2/Solution) to bootstrap this assignment.
# Part I - Dashboard Page for Admin Reports 
  - **API Administrator Web Interface**
    
    Inspired by - https://www.moesif.com/docs/api-dashboards/
    
    
    You should log server endpoints *access* and *usage* events to generate reports upon request. 

    This will allow admins to access a dashboard to monitor the generated reports.

    The admin dashboard will display the following report:
    - Unique API users over a period of time
    - Top API users over period of time
    - Top users for each Endpoint
    - 4xx Errors By Endpoint
    - Recent 4xx/5xx Errors

    The admin dashboard web page interface should be accessible using a web login form.

---
---
# Part II - Client Pokémon Web App
![](https://cdn.discordapp.com/attachments/1016585518840041503/1044716711540174879/image.png)
Suppose you have registered as a Pokémon API user and you want to build a Pokémon Web App similar to the one we have done in labs 10 and 11.

Design this Pokémon web app to enable visitors to at least filter Pokémons by name and/or type. After selecting a Pokémon, the visitor should be able to view a detailed info for each Pokémon.

Host this app on Netlify.


# User Stories/Tests
## Part I- Dashboard Page for Admin Reports 
-
  ```
  As a Pokémon API administrator
  I want to access a dashboard web page 
  So that I view API related analytics 
  ```
  Acceptance Criteria:
  - The administrator should be able login and logout using a web interface
  - The logging session should be maintained. Meaning that the admins should not need to re-login every time they access the dashboard web page.
  ---
- 
  ```
  As a Pokémon API administrator
  I want the dashboard web page to display API-related analytics graphs. 
  So that I begin monetizing my API and set billing plans to implement usage-based pricing strategy. 
  ```
  Acceptance Criteria:
  - The administrator should be able to view:
    - Unique API users over a period of time
    - Top API users over period of tie
    - Top users for each Endpoint
    - 4xx Errors By Endpoint
    - Recent 4xx/5xx Errors
  - The dashboard webpage should be protected by a login interface.
  - Reports may be displayed using simple HTML table to nice Graphs using 3rd-party JS libraries. 

##  Part II - Pokémon Search Site

- 
  ```
  As a Pokémon Search site visitor
  I want to search for a Pokémon based on some criteria
  ```

  Acceptance Criteria:
  - At least by Pokémon type and name
  - The visitor should be able to select more than one type per search.
  - The results should show Pokémon images in a responsive grid.
  - The results should paginated. 
  - The current page should be highlighted.
  - Show `n` pages max at a time. You may fix `n` to any number you see fit.
  ---
- 
  ```
  As a Pokémon Search site visitor
  I want to select a Pokémon
  So that I view detailed info for the selected Pokémon
  ```
  Acceptance Criteria:
  - The detailed info should include the selected Pokémon name, type(s), and stats like HP, Attack Sp., ...etc.
  - Pokémon image should be displayed


# Deliverables
- 3-minutes max demo for the web interfaces.

- Links
  - GitHub link for code
  - Netlify links for the
    - API Administrator Web Interface
    - Pokémon Search site 

## What to demonstrate in the offline YT video?
The provided user stories
  

# Development tStrategy and Hints
to be added

# Rubric
Coverage of the provided user stories.

I will penalize you for 
- Improper/missing incremental atomic GIT commits, 
- Server crashes,
- Missing deliverables, and/or 
- Late submission.
