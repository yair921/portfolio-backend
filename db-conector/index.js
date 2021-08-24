const { get, add, update, remove } = require('./mongo');

exports.handler = async event => {
    try {
        let result = {
            status: false,
            data: null
        }
        switch (event.operation) {
            case 'get':
                result = await get(event.user);
                console.log(result);
                return result;
            case 'add':
                result = await add(event.user);
                console.log(result);
                return result;
            case 'update':
                result = await update(event.user, event.newData);
                console.log(result);
                return result;
            case 'remove':
                result = await remove(event.user);
                console.log(result);
                return result;
            default:
                return result;
        }

    } catch (error) {
        console.log(error);
        return {
            status: false,
            error
        }
    }
}

//let event;


// event = {
//     operation: "get",
//     user: { twitterAccount: "@yair921" }
// };

// event = {
//     operation: "add",
//     user: {
//         name: 'Fernando herrera',
//         titile: 'Teacher',
//         textDescription: 'Some description...',
//         urlImage: 'https://1.bp.blogspot.com/-lwv8c8-DPdQ/XP_hPD7UsuI/AAAAAAAAINU/UigdvlF_1XUYt0vXHbYm72OQjFukn35_wCLcBGAs/s640/FERNANDO%2BHERRERA.jpg',
//         twitterAccount: '@Fernando_Her85'
//     }
// };

// event = {
//     operation: "update",
//     user: {
//         twitterAccount: '@Fernando_Her85'
//     },
//     newData: {
//         name: 'Fernando herrera',
//         textDescription: 'Some description....'
//     }
// };

// event = {
//     operation: "remove",
//     user: {
//         twitterAccount: '@Fernando_Her85'
//     }
// };


//this.handler(event);
