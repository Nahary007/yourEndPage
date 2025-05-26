import express from "express";
import upload from "../middleware/Upload.js";
import authenticate from "../middleware/authentificate.js";

function AuthUsersRoute(authUsersController) {
  const router = express.Router();

  router.post('/register', upload.single("image"), (req, res) => authUsersController.register(req, res));
  router.post('/login', (req, res) => authUsersController.login(req, res));
  router.put('/update/:id', authenticate, upload.single("image"), (req, res) => authUsersController.updateUser(req, res));


  // Nouvelle route protégée
  router.get('/me', authenticate, (req, res) => authUsersController.getCurrentUser(req, res));

  return router;
}

export default AuthUsersRoute;