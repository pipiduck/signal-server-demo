const logReq = async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
}

const logCostTime = async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
}

module.exports = {
    logReq,
    logCostTime
}