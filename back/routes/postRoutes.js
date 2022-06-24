const express = require("express");

// On utilise la méthode express.Router() qui nous permet de créer des routeurs séparés pour chaque route principale de l'application.
const router = express.Router();
const multer = require("../middlewares/multerConfig");
const post = require("../middlewares/auth");

// On importe nos fonctions pour l'inscription et la connexion a l'aide de cette constante.
const postCtrl = require("../controllers/postCtrl");
const auth = require("../middlewares/auth");

// Routes individuelles de notre routeur.
router.post("/", multer,postCtrl.createPost);
router.get("/", postCtrl.getAllPost);
router.put("/:id", multer,postCtrl.updatePost);
router.delete("/",postCtrl.deletePost);

//ROutes pour les réactions 
router.post("/commentaire" , multer,postCtrl.createComment);
router.post("/liker",postCtrl.liker );
router.delete("/disliker",postCtrl.disliker );


// On exporte notre routeur finale pour pouvoir l'utiliser.
module.exports = router;