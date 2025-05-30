import express from 'express';
import upload from '../middleware/upload.js';
import authenticate from '../middleware/authentificate.js';

function PageRoute(pageController) {
    const router = express.Router();

    router.post(
        '/save',
        authenticate,
        upload.fields([
            { name: 'image', maxCount: 1 },
            { name: 'gif', maxCount: 1 },
        ]),
        (req, res) => pageController.savePage(req, res)
    );

    return router;
}

export default PageRoute;
