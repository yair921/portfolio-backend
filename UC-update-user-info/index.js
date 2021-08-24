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
        let result = await invokeLambda(event.user, event.newData);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return {
            status: false,
            error
        }
    }
}

function invokeLambda(user, newData) {
    return new Promise(resolve => {
        let payload = {
            operation: "update",
            user,
            newData
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

// let event;
// event = {
//     "user": { "twitterAccount": "@yair921" },
//     "newData": { "name": "Yair Manuel Montes" }
// };
// this.handler(event);