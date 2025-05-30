import express from "express";
import path from "path";
import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import cors from "cors";
import dotenv from "dotenv";
import UserController from "./controller/UserController.js";
import AuthUsersRepository from "./repository/UserRepository.js";
import AuthUsersRoute from "./route/UserRoute.js";
import AuthUsersService from "./service/UserService.js";
import PageController from "./controller/PageController.js";
import PageRepository from "./repository/PageRepository.js";
import PageService from "./service/PageService.js";
import PageRoute from "./route/PageRoute.js";


const app = express();
const port = 4000;

dotenv.config();

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());

// Servir le dossier "uploads" pour l'accès aux fichiers statiques
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

AppDataSource.initialize()

    .then(() => {
        console.log('Connexion à postgres réussie.');

        const authUsersRepository = new AuthUsersRepository(AppDataSource);
        const authUsersService = new AuthUsersService(authUsersRepository);
        const authUsersController = new UserController(authUsersService);

        const pageRepository = new PageRepository(AppDataSource);
        const pageService = new PageService(pageRepository);
        const pageController = new PageController(pageService);

        app.use('/api/auth', AuthUsersRoute(authUsersController));
        app.use('/api/page', PageRoute(pageController));

        app.listen(port, () => {
            console.log(`Serveur démarré sur http://localhost:${port}`);
        });
    })
    .catch(error => console.error('Erreur de connexion :', error));