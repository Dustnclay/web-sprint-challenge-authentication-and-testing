const request = require('supertest')
const server = require('./server')
const db = require('../database/dbConfig')
const { json } = require('express')
const testUser = {username:'dust', password:'dust'}

describe('server.js', () => {
    describe('get request', () => {
        it('should return 500 sttus', async () => {
            const res = await request(server).get('/api/jokes')
            expect(res.status).toBe(500)
        })
        it('should be text', async () => {
            const res = await request(server).get('/api/jokes')
            expect(res.type).toBe('text/html')
        })
    })
    describe('registration of new user', () => {
        it('should give status 201 new user', async () => {
            await db('users').truncate()
            const res = await request(server)
            .post('/api/auth/register')
            .send(testUser)
            expect(res.status).toBe(201)
        })
        it('should return 400 status invalid', async () => {
            const res = await request(server)
            .post('/api/auth/register')
            .send({ user:'wrong',password:'dust'})
            expect(res.status).toBe(400)
        })
    })
    describe('login with user', () =>{
        it('should return 201 test user', async () => {
            const res = await request(server)
            .post('/api/auth/login')
            .send(testUser)
            expect(res.status).toBe(201)
        })
        it('should return with 401 invalid user', async () => {
            const res = await request(server)
            .post('/api/auth/login')
            .send({username:'does not exist',passwword:'does not xist'})
        })
    })
})