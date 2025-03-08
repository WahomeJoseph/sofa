import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
import fs from 'node:fs'

const db = sql('sofas.db')

// .all Fetch all data from the columns
// .get Get all data from a single row
// .run Insert data into db
export async function getSofas() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return db.prepare('SELECT * FROM sofas').all()

}

export function getSofa(image) {
    return db.prepare('SELECT * FROM sofas WHERE image = ?').get(image)
}

// image uploading
export async function uploadSofa(meal) {
    meal.slug = slugify(meal.title, { lower: true })
    meal.instructions = xss(meal.instructions)

    // store meal images in the file system
    const extension = meal.image.name.split('.').pop()
    const fileName = `${meal.slug}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer()

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Sofa Image not Saved!')
        }
    })
    // store the image path to the db
    meal.image = `/images/${fileName}`

    db.prepare(` 
        INSERT INTO sofas (name, description, price, image, material, color, in_stock)
        VALUES (@name, @description, @price, @image, @material, @color, @in_stock)
        `).run(meal)
}