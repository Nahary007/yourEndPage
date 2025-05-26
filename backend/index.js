import express from "express";
import path from "path";
import "reflect-metadata";
// import TemplatePageController from "./controller/TemplatePageController.js";
import { AppDataSource } from "./data-source.js";
// import TemplatePageRepository from "./repository/TemplatePageRepository.js";
// import templatePageRoutes from "./route/TemplatePageRoute.js";
// import TemplatePageService from "./service/TemplatePageService.js";
// import AuthUsersController from "./controller/AuthUsersController.js";
// import AuthUsersRepository from "./repository/AuthRepository.js";
// import AuthUsersRoute from "./route/AuthUsersRoute.js";
// import AuthUsersService from "./service/AuthUsersServices.js";
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
// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

AppDataSource.initialize()

    .then(() => {
        // console.log('Connexion à MySQL réussie.');

        // const templatePageRepository = new TemplatePageRepository(AppDataSource);
        // const templatePageService = new TemplatePageService(templatePageRepository);
        // const templatePageController = new TemplatePageController(templatePageService);

        // const authUsersRepository = new AuthUsersRepository(AppDataSource);
        // const authUsersService = new AuthUsersService(authUsersRepository);
        // const authUsersController = new AuthUsersController(authUsersService)
        
        // app.use('/templatePage', templatePageRoutes(templatePageController));
        // app.use('/api/auth', AuthUsersRoute(authUsersController));


        app.listen(port, () => {
            console.log(`Serveur démarré sur http://localhost:${port}`);
        });
    })
    .catch(error => console.error('Erreur de connexion :', error));