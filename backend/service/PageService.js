class PageService {
    constructor(PageRepository){
        this.PageRepository = PageRepository;
    }

    async savePage(category, title, description, image, gif, gifPositionX, gifPositionY, date){
        if(!category || !title || !description) {
            throw new Error('category, title et description sont requis.');
        }
        return this.PageRepository.save(category, title, description, image, gif, gifPositionX, gifPositionY, date);
    }
}
export default PageService;