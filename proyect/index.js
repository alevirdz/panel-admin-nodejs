const express = require('express');
// const registerRouter = require('./routes/register');


const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/about', (req, res) => {
  res.send('Welcome to about');
});

app.use(express.json());
// app.use('/register', registerRouter);



const adminRouter = express.Router();
app.use('/admin', adminRouter);

adminRouter.get('/', function(req, res) {
  res.send('¡Soy el panel de administración!');
 });

 adminRouter.get('/users', function (req, res) {
  res.send('¡Muestro todos los usuarios!');
 });


adminRouter.get('/posts', function(req, res) { 
  res.send('¡Muestro todos los posts!');
 });




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
