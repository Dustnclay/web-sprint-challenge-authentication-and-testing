const db = require('../database/dbConfig')

module.exports={
    find,
    findBy,
    add,
    findById
}

function find() {
    return db('users').select('id', 'username', 'password')
}
function findBy(filter) {
    return db('users').where(filter)
}
async function add(user) {
    console.log('user in colsolejokes m0deel:',user)
    const [id] = await db('users').insert(user)
    console.log('id in colsole jokes m0del:',id)
    return findById(id)
}
function findById(id) {
    return db('users').where({id}).first()
}
