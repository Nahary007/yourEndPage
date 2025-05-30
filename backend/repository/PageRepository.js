class PageRepository {
    constructor(datasource) {
        this.repository = datasource.getRepository('contentPage');
    }

    async save(category, title, description, image, gif, gifPositionX, gifPositionY, date, userId) {
        const page = {
            category,
            title,
            description,
            image,
            gif,
            gifPositionX,
            gifPositionY,
            date,
            user: { id: userId },
        };

        return this.repository.save(page);
    }
}

export default PageRepository;
