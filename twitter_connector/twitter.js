require('dotenv').config();
const Twitter = require('twitter');
const client = new Twitter({
    consumer_key: process.env.APIKEY,
    consumer_secret: process.env.APISECRET,
    access_token_key: process.env.ACCESSTOKEN,
    access_token_secret: process.env.ACCESSTOKENSECRET
});

function getTweets(user) {
    return new Promise(resolve => {
        let params = {
            screen_name: user,
            count: parseInt(process.env.TWITTSCOUNT)
        };
        client.get('statuses/user_timeline', params, (error, tweets, response) => {
            if (error) {
                resolve({
                    status: false,
                    error
                });
                return;
            }
            let tweetsProccess = processTweets(tweets);
            resolve({
                status: true,
                data: tweetsProccess
            });
        });
    });
}

function processTweets(tweets) {
    return tweets.map(tweet => {
        return {
            id: tweet.id,
            created_at: tweet.created_at,
            text: tweet.text
        }
    });
}

module.exports = {
    getTweets
}