const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const secret = process.env["SECRET_KEY"]
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {
        expiresIn:'24h'
    })
}

class UserController {
    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await prisma.user.findUnique({
                where: {
                    username
                }
            })
            if (!user) {
                return res.status(200).json({
                    message: `User ${username} not found`,
                    status: 'error'
                })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(200).json({
                    message: `Incorrect password`,
                    status: 'error'
                })
            }
            const token = generateAccessToken(user.id,user.role)
            res.json({token, status:'ok'})
        } catch (e) {
            res.status(400).json({
                message: `Login error with status 400 - ${e}`,
                status: 'error'
            })
        }
    }

    async createUser(req, res) {
        try {
            const {name, surname, username, password, role = 'USER',} = req.body
            const isAlreadyExists = await prisma.user.findUnique({
                where: {
                    username: username
                }
            })
            if (Boolean(isAlreadyExists)) {
                return res.status(200).json({
                    message: `User already exists`,
                    status: 'error'
                })
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            await prisma.user.create({
                data: {
                    name: name,
                    surname: surname,
                    username: username,
                    password: hashPassword,
                    role: role
                }
            })
            res.status(200).json({
                message: 'User has been created',
                status: 'ok'
            })
        } catch (e) {
            res.status(400).json({
                message: `Create user error with status 400 - ${e}`,
                status: 'error'
            })
        }

    }

    async getUser(req, res) {
        try {
            const users = await prisma.user.findMany()
            res.json(users)
        } catch (e) {
            res.status(400).json({
                message: `Get user error with status 400 - ${e}`,
                status: 'error'
            })
        }

    }

    async getOneUser(req, res) {
        try {
            const id = req.params.id
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })
            res.json(user)
        } catch (e) {
            res.status(400).json({
                message: `Get one user error with status 400 - ${e}`,
                status: 'error'
            })
        }

    }

    async updateUser(req, res) {
        try {
            const {id, name, surname, password} = req.body
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    surname: surname,
                    password:hashPassword
                }
            })
            res.json(user)
        } catch (e) {
            res.status(400).json({
                message: `Update user error with status 400 - ${e}`,
                status: 'error'
            })
        }

    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const deleteUser = await prisma.user.delete({
                where: {
                    id: Number(id)
                },
            })
            res.json(deleteUser)
        } catch (e) {
            res.status(400).json({
                message: `delete user error with status 400 - ${e}`,
                status: 'error'
            })
        }

    }
}


module.exports = new UserController()