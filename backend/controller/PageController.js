class PageController {
    constructor(PageService) {
        this.PageService = PageService;
    }

    async savePage(req, res) {
        try {
            const userId = req.user.id;
            const { category, title, description, gifPositionX, gifPositionY, date } = req.body;

            const imagePath = req.files?.image?.[0]?.filename || null;
            const gifPath = req.files?.gif?.[0]?.filename || null;

            console.log('req.files:', req.files);
            console.log('req.body:', req.body);


            const newPage = await this.PageService.savePage(
                category,
                title,
                description,
                imagePath,
                gifPath,
                gifPositionX,
                gifPositionY,
                date,
                userId
            );

            res.status(201).json({ page: newPage });
        } catch (error) {
            console.error('Erreur:', error);
            res.status(400).json({ error: error.message });
        }
    }

}

export default PageController;
