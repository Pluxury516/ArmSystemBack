const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


class NewsController {
    async addNews(req, res){
        const { userId, schoolsId, title, descriptions} = req.body
        const schoolExists = await prisma.schools.findUnique({
            where: {
                id: schoolsId,
            },
        });
        if (!schoolExists) {
            res.status(200).json('Такой школы не существует')
        }
        const userExists = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!userExists) {
            res.status(200).json('Пользователь не найден')
        }
        await prisma.news.create({
            data: {
                userId:userId,
                title: title,
                descriptions: descriptions,
                schoolsId:schoolsId
            }
        })
        res.status(200).json('ok')
    }

    async getNews(req, res) {
        const schoolId = req.params.schoolsId
        const news = await prisma.news.findMany({
            where:{
                schoolsId:Number(schoolId)
            }
        })
        try {
            res.status(200).json(news)
        } catch (e) {
            res.status(400).json({
                message: `Get News error with status 400 - ${e}`,
                status: 'error'
            })
        }

    }

    async getOneNews(req, res) {
        try {
            const id = req.params.id
            const school = await prisma.news.findUnique({
                where: {
                    id: id
                }
            })
            res.json(school)
        } catch (e) {
            res.status(400).json({
                message: `Get one user error with status 400 - ${e}`,
                status: 'error'
            })
        }

    }

    async updateNews(req, res) {
        try {
            const { descriptions, id, title} = req.body

            const news = await prisma.news.update({
                where: {
                    id: id
                },
                data: {
                    title: title,
                    descriptions: descriptions,
                }
            })
            res.status(200).json(news)
        } catch (e) {
            res.status(400).json({
                message: `Update user error with status 400 - ${e}`,
                status: 'error'
            })
        }

    }

    async deleteNews(req, res) {
        try {
            const id = req.params.id
            const deleteNews = await prisma.news.delete({
                where: {
                    id: Number(id)
                },
            })
            res.json(deleteNews)
        } catch (e) {
            res.status(400).json({
                message: `delete user error with status 400 - ${e}`,
                status: 'error'
            })
        }

    }

}


module.exports = new NewsController()