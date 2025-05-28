class PageController {
    constructor(PageService) {
        this.PageService = PageService;
    }

    async savePage(req, res) {
        try {
            const { category, title, description, image, gif, gifPositionX, gifPositionY, date } = req.body;
            const imagePath = req.file ? req.file.filename : null;

            const newPage = await this.UserService.savePage(
                category, title, description, image, gif, gifPositionX, gifPositionY, date, imagePath
            );

            res.status(201).json({ page: newPage, token });
        } catch (error) {
            res.status(400).json({ error: error.messagee });
        }
    }
}
export default PageController;