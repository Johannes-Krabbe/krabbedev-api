"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// Get all users
app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});
// Get a user by ID
app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.json(user);
});
// Create a new user
app.post("/users", async (req, res) => {
    const { name, email } = req.body;
    const newUser = await prisma.user.create({ data: { name, email } });
    res.status(201).json(newUser);
});
// Update a user
app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, email },
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(404).send("User not found");
    }
});
// Delete a user
app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({ where: { id: parseInt(id) } });
        res.status(204).send("User deleted");
    }
    catch (error) {
        res.status(404).send("User not found");
    }
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
