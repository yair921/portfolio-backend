require('dotenv').config();
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const lambda = new AWS.Lambda({
    apiVersion: '2015-03-31',
    accessKeyId: process.env.AWSSECRETKEY,
    secretAccessKey: process.env.AWSSECRETACCESSKEY
});

exports.handler = async event => {
    try {
        if (!event?.user?.twitterAccount.trim()) {
            return {
                status: false,
                error: 'user.twitterAccount is required.'
            }
        }
        let userInfo = await getUserInfo(event.user);
        let tweets = await getTweets(event.user.twitterAccount);
        let result = {
            status: false,
            data: []
        }
        if (userInfo.status && tweets.status) {
            result.status = true;
            result.data = [{
                ...userInfo.data[0],
                tweets: [
                    ...tweets.data
                ]
            }]
        } else {
            return userInfo;
        }
        return result;
    } catch (error) {
        console.log(error);
        return {
            status: false,
            error
        }
    }
}

function getUserInfo(user) {
    return new Promise(resolve => {
        let payload = {
            operation: "get",
            user
        };

        let params = {
            FunctionName: process.env.DBCONNECTOR,
            Payload: JSON.stringify(payload)
        };

        lambda.invoke(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                if (data.StatusCode === 200) {
                    resolve(JSON.parse(data.Payload));
                } else {
                    console.log(JSON.stringify(data));
                    resolve({
                        status: false,
                        error: 'Unexpected error.'
                    });
                }
            }
        });
    });
}

function getTweets(twitterAccount) {
    return new Promise(resolve => {
        let payload = {
            user: twitterAccount
        }

        let params = {
            FunctionName: process.env.TWITTERCONNECTOR,
            Payload: JSON.stringify(payload)
        };

        lambda.invoke(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                if (data.StatusCode === 200) {
                    resolve(JSON.parse(data.Payload));
                } else {
                    console.log(JSON.stringify(data));
                    resolve({
                        status: false,
                        error: 'Unexpected error.'
                    });
                }
            }
        });
    });
}

// let event;
// event = {
//     user: { twitterAccount: "@yair921" }
// };
// this.handler(event);