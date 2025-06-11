const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());// Middleware to parse JSON requests

app.get('/', (req, res) => {      res.send('Hello, World!');   });
// Route to get a list of users
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'amit' },
    { id: 2, name: 'neha' },
  ];
  res.json(users);
});


// Route to get a single user by ID
app.get('/users/:id', (req, res) => {
   const users = [
    { id: 1, name: 'amit' },
    { id: 2, name: 'neha' },
  ];
  
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).send('User not found');
  }
  
  res.json(user);
});

// Route to add a new user
app.post('/users', (req, res) => 
 {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }

  const newUser = {
    id: Math.floor(Math.random() * 1000),
    name,
  };

  res.status(201).json(newUser);
});


// Route to update a user
app.put('/users/:id', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }

  const users = [
    { id: 1, name: 'amit' },
    { id: 2, name: 'neha' },
  ];

  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found');
  }

  user.name = name;
  res.json(users);
});


// Route to delete a user
 app.delete('/users/:id', (req, res) => 
 {
  const users = [
    { id: 1, name: 'amit' },
    { id: 2, name: 'neha' },
  ];
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  console.log(" index value of"+ userIndex);
  if (userIndex === -1) { 
    return res.status(404).send('User not found');
  }

  users.splice(userIndex, 1);   //start and no of record to delete

  res.status(204).send();    // No content, successful deletion

});



app.listen(port);



