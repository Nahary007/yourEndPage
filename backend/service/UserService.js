import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthUsersService {
    constructor(authUsersRepository) {
        this.authUsersRepository = authUsersRepository;
    }

    async register(firstname, lastname, email, password, image) {
        if (!firstname || !lastname || !email || !password) {
            throw new Error('firstname, lastname, email et password sont requis.');
        }

        const existingUser = await this.authUsersRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Un utilisateur avec cet email existe déjà.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.authUsersRepository.save(firstname, lastname, email, hashedPassword, image);
    }


    async login(email, password) {
        if (!email || !password) {
            throw new Error('email et password sont requis.');
        }

        const user = await this.authUsersRepository.findByEmail(email);
        if (!user) {
            throw new Error('Utilisateur non trouvé.');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Mot de passe incorrect.');
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        return token;
    }

    async getUserById(id) {
        if (!id) {
            throw new Error('ID requis.');
        }
        return this.authUsersRepository.findById(id);
    }

    async updateUser(id, username, email, password, image) {
    if (!id || !username || !email) {
        throw new Error('id, username et email sont requis.');
    }

    let hashedPassword = null;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    return this.authUsersRepository.update(id, username, email, hashedPassword, image);
    }


    async deleteUser(id) {
        if (!id) {
            throw new Error('Id requis pour la suppression.');
        }

        return this.authUsersRepository.delete({ id });
    }

    async getAllUsers() {
        return this.authUsersRepository.findAll();
    }
}

export default AuthUsersService;
