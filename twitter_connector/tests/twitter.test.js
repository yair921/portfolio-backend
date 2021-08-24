const { getTweets } = require('../twitter');

describe('Test twitter service', () => {
    test('Get lastest tweets from a user', async () => {
        let result = await getTweets('@yair921');
        expect(result.status).toBe(true);
    });
});
