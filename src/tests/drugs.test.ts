afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Drugs', () => {
    describe('[GET] /drugs', () => {
        it('response fineAll Drugs', async () => {});
    });
});
