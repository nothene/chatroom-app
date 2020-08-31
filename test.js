// var express = require('express');
// var app = express();
// var path = require('path');
// var http = require('http').createServer(app);
// const PORT = process.env.PORT || 5000;

// http.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

// app.use(express.static(path.join(process.cwd(), 'public')));

// app.set('view engine',  'ejs');

// app.get('/', (req, res) => {
//     res.render('../views/index');
// });

// const dotenv = require("dotenv").config();

// console.log(process.env.DB_USERNAME);

// a = [{a: 1, b: 2}];

// console.log(a[0].a);

function firstFunction() {
    return new Promise((resolve, reject) => {
        let y = 0
        setTimeout(() => {
          for(i=0; i<10; i++){
             y++
          }
           console.log('loop completed')  
           resolve(y)
        }, 2000)
    })
  }
  
  //2. Create an async function
  async function secondFunction() {
      console.log('before promise call')
      //3. Await for the first function to complete
      let result = await firstFunction()
      console.log('promise resolved: ' + result)
      console.log('next step')
  }; 

  secondFunction()