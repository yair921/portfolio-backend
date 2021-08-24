const { get, update } = require('../mongo');

describe('Test mongo operations', () => {
    test('Get operations, should return a user information', async () => {
        let result = await get({ user: { twitterAccount: '@yair921' } });
        expect(result.status).toBe(true);
    });

    test('Update operations, should update a user information', async () => {
        let result = await update({ twitterAccount: '@yair921' }, { name: 'Yair Montes' });
        expect(result.status).toBe(true);
    });
});
