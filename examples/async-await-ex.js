const { request } = require("express")

// 1 convert a function
MyFunction(){
    GetMessages((list) => {
        console.log(list)
    })
}

async MyFunction(){
    let list = await GetMessages()
    console.log(list)
}

// 2 Convert error handling
MyFunction(){
    request((result, err) => console.log(result, err))
}

async MyFunction(){
    try {
        let result = await request()
        console.log(result)
    } catch (error) {
        console.log(error)
    }

}