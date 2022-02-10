var request = require("request")
// const myTimeout = 5000

describe('calc', () => {
    it('should multiply 2 and 2', () => {
        expect(2 * 2).toBe(4)
    })
})

describe('get messages', () => {
    it('should return 200 OK', (done) => {
        // npm install --save-dev request
        request.get('http://localhost:3000/messages', (err, res) => {
            //console.log(res.body)
            expect(res.statusCode).toEqual(200)
            done() // in jasmin, need to call done() when asynchronous call finishes
        })
    })

    it('should return a list, thats not empty', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            // false negative - this would be checking the length of message body than the number of elements.
            // Hence, TDD should try to make the test fail first to make sure hte test is valid.
            //expect(res.body.length).toBeGreaterThan(40)
            expect(JSON.parse(res.body).length).toBeGreaterThan(2) // will fail if test with 1 message entry
            done()
        })
    })
})