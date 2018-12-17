# Run project in development mode
1) In "\public\design\"
2) Run > npm run start
  "start": "npm-run-all --parallel be:watch fe:watch"
  "fe:watch": "webpack --mode development --watch"
  "be:watch": "nodemon \"./../../index.js\" --watch \"./../../\"" 
# Make webpack development bundle
1) In "\public\design\"
2) Run > npm run fe:bundle
  "fe:bundle": "webpack --mode development"