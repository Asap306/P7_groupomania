const express = require("express");

// On utilise la méthode express.Router() qui nous permet de créer des routeurs séparés pour chaque route principale de l'application.
const router = express.Router();

// On importe nos fonctions pour l'inscription et la connexion a l'aide de cette constante.
const userCtrl = require("../controllers/usersCtrl");

// Routes individuelles de notre routeur.
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// On exporte notre routeur finale pour pouvoir l'utiliser.
module.exports = router;