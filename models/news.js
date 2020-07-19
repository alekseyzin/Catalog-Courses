const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

class News {
    constructor(title, img, description) {
        this.id = uuidv4();
        this.title = title,
        this.img = img,
        this.description = description
    }

    toJSON () {
        return {
            id: this.id,
            title: this.title,
            img: this.img,
            description: this.description
        }
    }

    async save () {
        const news = await News.getAll()
        news.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'news.json'),
                JSON.stringify(news),
                err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'news.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }

    static async getById(id) {
        const news = await News.getAll()
        return news.find(n => n.id === id)
    }

    static async update(newsCard) {
        const news = await News.getAll()
        const idx = news.findIndex(n => n.id === newsCard.id)
        news[idx] = newsCard

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'news.json'),
                JSON.stringify(news),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }
}

module.exports = News