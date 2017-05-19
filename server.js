var express = require('express'),
    bodyParser = require('body-parser');

var usersCtrl = require('./usersCtrl');

var port = 3000;

var app = express();
app.use(bodyParser.json());

app.get('/api/users', usersCtrl.getUsers);
app.get('/api/users/:id', usersCtrl.getUsersById);
app.get('/api/admins', usersCtrl.getAdmins);
app.get('/api/nonadmins', usersCtrl.getNonAdmins);
app.get('/api/user_type/:type', usersCtrl.getUsersByType);

app.put('/api/users/:userId', usersCtrl.updateUserById);

app.post('/api/users', usersCtrl.createUser);

app.delete('/api/users/:userId', usersCtrl.deleteUserById);

app.listen(port,()=> console.log(`Listening on ${port}`));