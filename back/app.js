const express = require("express");
const bodyParser = require("body-parser");// On importe body-parser qui sert analyser le corp d'une requête entrante afin qu'il n'y est pas d'erreus.
const path = require("path");// On importe path qui nous permettra de travailer avec les chemins de fichiers et de répertoires.
const helmet = require("helmet");
const nocache = require("nocache");
const userRoutes = require("./routes/usersRoutes");
const postRoutes = require("./routes/postRoutes");

require("dotenv").config();



// Déclaration de notre const app pour créer une application express.
const app = express();

// Ceci permettra à l'application d'accèder à notre API, et aussi sa permettra à nos deux serveur de communiquer entre eux.
// Donne l'accès de notre API à tous le monde, on autorise d'utiliser certain Headers sur l'objet requête et d'envoyer certaines méthodes de requête(verbes de requête).
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

});

const cors = require("cors")
app.use(cors({origin:true,credentials: true}));
// On utilisera ce middleware pour transformer les données des requêtes analysées en format json.  
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());

// Middleware qui nous permet d'utiliser nos routes de notre API, pour les utilisateurs et les sauces.
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);


// Ce middleware Express définit certains en-têtes de réponse HTTP pour essayer de désactiver la mise en cache côté client.
app.use(nocache());

// On exporte a l'aide du module notre application.
module.exports = app;