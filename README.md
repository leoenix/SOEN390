
# :wave: Covid-19 App (SOEN390) :wave: <br>

## Objective :trophy:

The objective of this project was to build an application that connects COVID-19 patients with doctors and medical professionals. The application allows doctors to easily observe and monitor the status of their patients based on the information the patient provides. Moreover, this project was developed for the Concordia mini-capstone in preparation for the final engineering project capstone. This project allowed us to learn and further develop an understanding of the fundamentals of software development, project management and the overall process of delivering a product.

## Description :pencil2:

The application provides a platform for doctors, health officials, and immigration officers to connect with patients. Initially, users are asked to sign up, provide their personal information and select their roles (patient, doctor, health officials, etc). In order for privileged accounts to be accepted into the system, admins must validate their credentials. Services provided for patients in the system include: daily symptom form uploads, book appointments or direct chat with their doctors, close monitoring by doctors, and access to the latest relevant information related to COVID. Further, services provided for doctors include: analytics of their patients, direct chat with their patients, a dashboard containing all their patients, and patient symptom forms. 


## Progress :alarm_clock:

- [X]  Sprint 1
- [X]  Sprint 2
- [X]  Sprint 3
- [X]  Sprint 4
- [X]  Sprint 5

## Project Architecture and Info :gear:

The project was built using the "Client - Server" architecture style, which essentially divides the frontend files (client) fron the backend files (server). Further information is provided the READMEs of both client and server folders.  

## Team Members :technologist:

| #   | Name                 | ID        | Github Username     | Role                     |
| --- | :------------------- | :-------- | :------------------ |:------------------------ |
| 1   | Maira Malhi          | 40128269  |  malhimaira         | Team Lead / FrontEnd     |
| 2   | Eric Hanna           | 40113678  |  leoenix            | Database Management      |
| 3   | Michael Warner       | 40124302  |  narroarrow         | FrontEnd UI              |
| 4   | Alexandru Bara       | 40132235  |  alexbara2000       | FrontEnd Lead            |
| 5   | Jeffrey Chan         | 40152579  |  JeffreyCHChan      | BackEnd Lead             |
| 6   | Maxime Giroux        | 40157483  |  giroux2000         | FullStack                |
| 7   | Joeseph Mezzacappa   | 40134799  |  JosephMezza        | Scrum Master / BackEnd   |
| 8   | James Gambino        | 40131946  |  JGambino00         | FullStack                |
| 9   | Jonathan Jong        | 40133041  |  jongjonathan       | Documentation / FrontEnd |

## Technology Stack :gear:

:black_square_button: &nbsp; Front-End <br>
&nbsp;&nbsp;&nbsp; :black_small_square: HTML <br>
&nbsp;&nbsp;&nbsp; :black_small_square: CSS <br>
&nbsp;&nbsp;&nbsp; :black_small_square: MUI <br>
&nbsp;&nbsp;&nbsp; :black_small_square: React <br>
&nbsp;&nbsp;&nbsp; :black_small_square: Axios <br>

:white_square_button: &nbsp; Back-End: <br>
&nbsp;&nbsp;&nbsp; :white_small_square: Node.js<br>
&nbsp;&nbsp;&nbsp; :white_small_square: MySQL <br>
&nbsp;&nbsp;&nbsp; :white_small_square: ExpressJS <br>
&nbsp;&nbsp;&nbsp; :white_small_square: Axios <br>

🔻: &nbsp; Testing: <br>
&nbsp;&nbsp;&nbsp; :white_small_square: Jest<br>
&nbsp;&nbsp;&nbsp; :white_small_square: React Testing Library <br>
&nbsp;&nbsp;&nbsp; :white_small_square: Enzyme <br>
&nbsp;&nbsp;&nbsp; :white_small_square: Postman <br>
&nbsp;&nbsp;&nbsp; :white_small_square: JMeter <br>


## Naming Conventions (for Git & Github organization) :green_book:


**:green_circle: &nbsp; Naming Convention Used For Branches** <br>
* **Syntax:** feature-(#issue_number/Issue-Topic) <br>
* **Example:** feature-(#40/Add-a-README.md-File) <br><br>
   
**:green_circle: &nbsp; Naming Convention Used For Issues** <br>
* **Syntax:** [#issue_number: FEATURE/BUG] Issue Topic <br>
* **Example:** [#40: FEATURE] Add a README.md File <br><br>

**:green_circle: &nbsp; Naming Convention Used For Pull-Requests** <br>
* **Syntax:** [Solves #issue_number] Pull-Request Topic <br>
* **Example:** [Solves #40] Add a README.md File<br>

## Coding Style & Naming Convention :notebook: 

Since we are using ExpressJS on the backend, we will also be following their coding standards which can be found here. Coding standards from Google’s JavaScript Style Guide were also used. It can be found here.

1. Properly indent code blocks and statements. Use (Ctrl + K) then (Ctrl F) to auto-format on VS Code.

2. Define individual classes for Error Handling. Group all Error Handling classes in one folder to be used by all .js files.

3. All imports from the same folder need to be put in the same line using the curly bracket notation.

4. When adding prompts to a component, add them in the same line. Only if the component is too long, can it be broken into multiple lines.

5. Always end a statement with a semicolon. 

6. All frontend page files need to go in the folder ./client/pages.

7. All frontend component files need to go in the folder ./client/component.

8. All testing files need to go in the folder ./client/src/\_\_tests__

9. Testing files need to have the extension .test.js

10. Every method needs to have a comment above it explaining the purpose of it.

11. Inline styling is heavily discouraged, use sparingly.

12. Use components from Material UI framework https://mui.com/.

13. Variable names must describe what they are used to do (ex. Use patientCount and not count3)

14. Variable names must be in camel case.

15. Class names must be in Pascal case.

16. Have uniform spacing between methods (1 space between each method to keep everything clean)

17. All methods should be no more than 100 lines long for clarity. If ever it is exceeded, find a way to break the methods down into smaller pieces.

18. Use single quotes (‘ ‘) when assigning a value to a string instead of double quotes (“ “) with the exception of strings that are used for database queries. 

18. Use dot notation when accessing an object's value.

19. Try to use const and let instead of var (we want to limit the amount of global variables)

20. Have all ‘const’s and all ‘let’s grouped together separately at the top of the file. 

21. Do not let the combination of predicates in an if statement get too long, start a new line and continue from there.

22. Use Switch statements if you plan on using more than 1 else if between an if and else statement. 

24. Every method must have a unit test associated with it.

25. To import js files, the .js is NOT optional and must be included. For example: 
   import '../directory/file.js'
   Source file structure:
   Copyright and Author information 
   @fileoverview (description of contents and its dependencies)
   Module imports.
   Require statements
   Source code implementation
   NOTE: Separate Each point above with exactly one line, except for step 5, 2 can be used. 

26. Always have 2 people review a branch before merging it

27. Tag issues worked on for commits and merge requests

