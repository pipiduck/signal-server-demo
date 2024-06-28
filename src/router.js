const router = require('koa-router')();

router.get('/', async (ctx) => {
    ctx.response.body = '<h1>Hello Pipiduck</h1>';
});

module.exports = router;