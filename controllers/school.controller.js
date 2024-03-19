const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


class SchoolController {
   async addSchool(req, res){
        const { title, city, street, appartments, userIds} = req.body
       await prisma.schools.create({
           data: {
               usersIds:userIds,
               title: title,
               city: city,
               street: street,
               appartments: appartments
           }
       })
       res.status(200).json('ok')
    }

    async getSchool(req, res) {
        try {
            const schools = await prisma.schools.findMany()
            res.json(schools)
        } catch (e) {
            res.status(400).json({
                message: `Get user error with status 400 - ${e}`,
                status: 'error'
            })
        }

    }

    async getOneSchool(req, res) {
        try {
            const id = req.params.id
            const school = await prisma.schools.findUnique({
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

    async updateSchool(req, res) {
        try {
            const {id, title, city, street, usersIds, appartments} = req.body
            console.log(id,title,city,street,usersIds, appartments)

            const school = await prisma.schools.update({
                where: {
                    id: id
                },
                data: {
                    title: title,
                    city: city,
                    street:street,
                    usersIds:usersIds,
                    appartments:appartments
                }
            })
            res.json(school)
        } catch (e) {
            res.status(400).json({
                message: `Update school error with status 400 - ${e.message}`,
                status: 'error'
            })
        }

    }

    async deleteSchool(req, res) {
        try {
            const id = req.params.id
            const deleteUser = await prisma.schools.delete({
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


module.exports = new SchoolController()