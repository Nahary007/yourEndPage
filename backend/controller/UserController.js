class UserController {
    constructor(UserService) {
        this.UserService = UserService;
    }

    async register(req, res) {
        try {
            const { firstname, lastname, email, password } = req.body;
            const imagePath = req.file ? req.file.filename : null;

            const newUser = await this.UserService.register(
                firstname, lastname, email, password, imagePath
            );

            const token = await this.UserService.login(email, password);

            res.status(201).json({ user: newUser, token });
        } catch (error) {
            res.status(400).json({ error: error.messagee });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await this.authUsersService.login(email, password);
            res.json({ token });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    async getCurrentUser(req, res) {
        try {
            const userId = req.user.id;
            const user = await this.authUsersService.getUserById(userId);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username, email, password } = req.body;
            const updatedUser = await this.authUsersService.updateUser(id, username, email, password);
            res.json(updatedUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await this.authUsersService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.authUsersService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await this.authUsersService.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default UserController;