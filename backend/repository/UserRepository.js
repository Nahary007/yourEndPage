class AuthUsersRepository {
    constructor(dataSource) {
        this.repository = dataSource.getRepository('User');
    }

    async findAll() {
        return this.repository.find();
    }

    async findById(id) {
        return this.repository.findOneBy({ id });
    }

    async findByEmail(email) {
        return this.repository.findOneBy({ email });
    }

    async save(firstname, lastname, email, password, image = null) {
        const user = { firstname, lastname, email, password, image };
        return this.repository.save(user);
    }


    async update(id, username, email, hashedPassword, image) {
        const user = await this.findById(id);
        if (!user) throw new Error('Utilisateur non trouvé.');

        user.firstname = username.split(" ")[0];
        user.lastname = username.split(" ")[1] || "";
        user.email = email;
        if (hashedPassword) user.password = hashedPassword;
        if (image) user.image = image;

        return this.dataSource.getRepository(UserEntity).save(user);
    }


    async delete({ id }) {
        return this.repository.delete({ id });
    }
}

export default AuthUsersRepository;
