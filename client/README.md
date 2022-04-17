## Steps to set up the project on local host :notebook: 

  1. Install Node.js with npm
  2. Clone the repository onto your local device
  3. Open the terminal and change directories to the client folder
  4. In the terminal, run the command: "npm install"
  5. Start the server (refer to the servers README to start the server)
  6. After starting the server, in the terminal, run the command: "npm start"
  7. This will open a browser with the application running on localhost.
  
## Troubleshooting / Common Issues :notebook: 

As the GitIgnore contains the modules, often specific modules do not get pushed and will need to be installed on your localhost. If this is the case and the module cannot be found, copy the name of the module and run the command "npm i {module_name}". 

## Testing Methodologies :notebook: 

Testing methodologies include rendering each page to ensure that the page renders correctly. Additionally, unit tests were written for each function of a specific page. Initially, the test renders the specific component related to the function. After rendering the compoenent, the specific function is called to ensure that it executes. Once the function is called, the test checks to see if the function was called properly.
