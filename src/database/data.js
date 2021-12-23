const { PrismaClient } = require("@prisma/client"),
    prisma = new PrismaClient();

class Heroku_Postgre {
    constructor(bot) {
        this.bot = bot
    }
};

module.exports = {
    class_data: Heroku_Postgre,
    status: false
};