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
