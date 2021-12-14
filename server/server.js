const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');

//? Module pour faciliter les accès au path locaux
const path = require('path');

const app = express();

// ? Manipuler les données des urls en json
app.use(express.urlencoded({extended : true}));
app.use(express.json());

// ? Enlever la detection possible du type de server
app.disable('x-powered-by');


// ? Paramètrage des CORS pour autoriser le requêtage de toute origine
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
 
    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', '*');
    next();
 
    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

// ? Routes à partir desquelles il va renvoyer les données lors de la solicitations

app.get('/profil', (req, res) => {
    res.sendFile(path.resolve('./data/profil.json'));
})

app.get('/profil/:_id', (req, res) => {
    getProfil(req.params._id);
    res.send('id reçu en paramètre : '  + req.params.id);
})

app.post('/id', (req, res) => {
    console.log(req.body);
    if(req.body.id == 'etienne' && req.body.passe == 'mdp'){
        let token = jwt.sign({
            id:req.body.id
        }, 'Cryptage')
        res.send({token});
    }

})

function getProfil(id){
    return fs.readFile(
        path.resolve('./data/listeEtudiants.json'),
        (erreur, data) => {
            if (erreur) throw erreur;
            console.log(data);
            console.log(data.find(profil => profil._id == id));
    })
}

// ? Initialisation du server sur le port 8080

app.listen(8080, () => {
    console.log("server launched on port 8080");
})