# Assignment 3 - Frontend Mania
Use your Pokémon API server from A2 or [my solution of A2](https://github.com/nabil828/comp4537repo/tree/main/Assignments/A2/Solution) to bootstrap this assignment.
# Part I - Dashboard Page for Admin Reports 
Inspired by - https://www.moesif.com/docs/api-dashboards/


You should log server endpoints *access* and *usage* events to generate reports upon request. 

This will allow Pokémon API admins to access a dashboard to monitor the generated reports.

The admin dashboard will display the following report:
- Unique API users over a period of time
- Top API users over period of time
- Top users for each Endpoint
- 4xx Errors By Endpoint
- Recent 4xx/5xx Errors

The admin dashboard web page should be accessible using a web login form.


# Part II - Client Pokémon Web App

![](https://cdn.discordapp.com/attachments/1016585518840041503/1044716711540174879/image.png)

Suppose you have registered as a Pokémon API user and you want to build a Pokémon Web App similar to the one we have done in labs 10 and 11.

Design this Pokémon web app to enable visitors to at least filter Pokémons by name and/or type. After selecting a Pokémon, the visitor should be able to view a detailed info for each Pokémon.

~~Host this app on Netlify~~.


# User Stories/Tests
## Part I- Dashboard Page for Admin Reports 
-
  ```
  As a Pokémon API administrator
  I want to access a dashboard web page 
  So that I view API related analytics 
  ```
  Acceptance Criteria:
  - The administrator should be able login and logout using a web form
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
  - The dashboard webpage should be protected by a login form.
  - Reports may be displayed using simple HTML table to nice Graphs using 3rd-party JS libraries. 

##  Part II - Pokémon Search Site

- 
  ```
  As a Pokémon Search site visitor
  I want to search for a Pokémon based on some criteria
  ```

  Acceptance Criteria:
  - At least by Pokémon type and/or name
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
- Three minutes demo YT offline video

- Links
  - GitHub link for code
  - ~~Netlify links for the~~
    - ~~Dashboard Page for Admin Reports~~
    - ~~Pokémon Search site~~

## What to demonstrate in the offline YT video?
The provided user stories
  

# Part I - Development Strategy and Hints
- Step 1 - **Authentication**
  
  The login form to capture a username and password send them to a your API server. 
- Step 2 - **`cors`**

  Enable `cors` on your server. Make sure `cors` is exposing custom headers. 
- Step 3 - Conditional Rendering
  
  Display the `Dashboard` component if the login is successfu
  l

- Step 4 - **Authorization**

  Send another AJAX request to get the report(S). Now you have to use the access token you received in Step 1

- Step 5 - **Refresh Token**

  Handle the expiration of the request tokens using the referesh token you have received in step 1 

# Part II - Development Strategy and Hints
- use react router to easily handle displaying the details of the selected Pokémon 


# Rubric
Coverage of the provided user stories.

I will penalize you for 
- Improper/missing incremental atomic GIT commits, 
- Server crashes,
- Missing deliverables, and/or 
- Late submission.
