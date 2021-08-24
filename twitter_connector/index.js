const { getTweets } = require('./twitter');

exports.handler = async event => {
    try {
        let result = await getTweets(event.user);
        return result;
    } catch (error) {
        return {
            status: false,
            error
        }
    }
}

// let event;
// event = {
//     user: '@yair921'
// };

// this.handler(event);
