MyFunction(){
    GetMessages((list) => {
        console.log(list)
    })
}

async MyFunction(){
    let list = await GetMessages()
    console.log(list)
}