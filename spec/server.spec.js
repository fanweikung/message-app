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
            expect(JSON.parse(res.body).length).toBeGreaterThan(0) // will fail at 2 if test with 1 message entry
            done()
        })
    })
})

// TDD: Add a new feature using test driven development 
// Add a test first, make it fail, then implement the feature to make the test pass.
// The ideal thing would be that our test suite sets up the server and the database just the way it should be before the tests are run. And in more advanced testing, that's exactly what we would do. We'd have a before function that executes at the start of our test or test suites, that sets up the database with say, a message from Tim. The test then executes and then an after function would execute and remove that message, therefore returning the database back to a normal state
// http://localhost:3000/messages/tim
describe('get messages from user', () => {
    it('should return 200 OK', (done) => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })

    it('name should be tim', (done) => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual('tim')
            done()
        })
    })

})