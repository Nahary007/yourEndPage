class PageRepository {
    constructor(datasource) {
        this.repository = datasource.getRepository('contentPage');
    }

    async save(category, title, description, image, gif, gifPositionX, gifPositionY, date) {
        const page = { category, title, description, image, gif, gifPositionX, gifPositionY, date };
        return this.repository.save(page);
    }
}
export default PageRepository;