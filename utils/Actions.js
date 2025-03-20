import sql from 'better-sqlite3'
const db = sql('lux.db')

export async function getSofas() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return db.prepare('SELECT * FROM sofas').all()
}

export async function getSofa(slug) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return db.prepare('SELECT * FROM sofas WHERE slug = ?').get(slug)
}

// contact us
export async function getUsers() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return db.prepare('SELECT * FROM contacts').all()
}

export async function uploadUser(users) {
    db.prepare(` 
        INSERT INTO contacts (name, email, phone, address, message)
      VALUES (@name, @email, @phone, @address, @message)
    `).run(users)
}