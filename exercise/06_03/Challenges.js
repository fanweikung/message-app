MyFunction(){
    GetMessages((list) => {
        console.log(list);
    })
};

// promise?
MyFunction(){
    GetMessages().then((list) => {
        console.log(list);
    })
};

// async await
async MyFunction(){
    let list = await GetMessages(list);
    console.log(list);
};

// 2.
MyFunction(){
    request((result, err) => console.log(result, err))
}

// async await w try catch
async MyFunction(){
    try {
        let result = await request()
        console.log(result)
    } catch (err) {
        console.log(err)
    }
    
}
