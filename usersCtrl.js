var userData = require('./userData.json');

var users = {}

module.exports = users;

users.getUsers = function (req, res, next) {
    var q = req.query;
    var matches = userData;


        if (q.age || q.lastname || q.email) {
            matches = [];
            for (var i = 0; i < userData.length; i++) {
                if (userData[i].age < q.age || userData[i].last_name == q.lastname) {
                    matches.push(userData[i]);
                }
                if (userData[i].email == q.email){
                    return res.status(200).json(userData[i]);
                }
            }
        }
        if (q.favorites) {
            matches = [];
            for (var i = 0; i < userData.length; i++) {
                var favs = userData[i].favorites
                for (var j = 0; j < favs.length; j++) {
                    if (favs[j] == q.favorites) {
                        matches.push(userData[i]);
                    }
                }
            }
        }
    return res.status(200).json(matches);
}

users.getUsersById = function (req, res, next){
    for (var i = 0; i < userData.length; i++){
        if(userData[i].id == req.params.id){
            return res.status(200).json(userData[i]);
        }
    }
    return res.status(404).json(null);
}

users.getAdmins = function (req, res, next){
    var matches = [];
    for (var i = 0; i < userData.length;  i++){
        if(userData[i].type === "admin"){
            matches.push(userData[i]);
        }
    }
    return res.status(200).json(matches);
}

users.getNonAdmins = function (req, res, next){
    var matches = [];
    for (var i = 0; i < userData.length; i++){
        if(userData[i].type !== "admin"){
            matches.push(userData[i]);
        }
    }
    return res.status(200).json(matches);
}

users.getUsersByType = function (req, res, next) {
    var matches = [];
    for (var i = 0; i < userData.length; i++){
        if(userData[i].type == req.params.type){
            matches.push(userData[i]);
        }
    }
    return res.status(200).json(matches);
}

users.updateUserById = function (req, res, next) {
    for(var i = 0; i < userData.length; i++){
        if(userData[i].id == req.params.userId){
            userData[i] = req.body;
            return res.status(200).json(userData);
        }
    }
}

users.createUser = function (req, res, next){
    var ids = [];
    for(var j = 0; j < userData.length; j++){
        ids.push(userData[j].id);
    }
    var max = ids.pop();
    
    
    if(req.body[0]){
    for(var i = 0; i < req.body.length; i++){
        max++;
        req.body[i].id = max;
        userData.push(req.body[i]);
    }
    }
    else {
        req.body.id = max+1;
        userData.push(req.body);
    }
    return res.status(200).send(userData);
}

users.deleteUserById = function (req, res, next){
    
    for(var i = 0; i < userData.length; i++){
        if(userData[i].id == req.params.userId){
            userData.splice(i,1);
            
        }
    }
    return res.status(200).json(userData);
} 
 
 
