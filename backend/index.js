import express from "express";
import path from "path";
import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const port = 4000;

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());

// Servir le dossier "uploads" pour l'accès aux fichiers statiques
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

AppDataSource.initialize()

    .then(() => {
        console.log('Connexion à postgres réussie.');

        app.listen(port, () => {
            console.log(`Serveur démarré sur http://localhost:${port}`);
        });
    })
    .catch(error => console.error('Erreur de connexion :', error));