// middleware/authenticate.js
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Non autorisé, token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Assure-toi que JWT_SECRET est bien défini
    req.user = decoded; // { id, email }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

export default authenticate;
