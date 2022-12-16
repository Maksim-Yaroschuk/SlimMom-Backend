function tryCatchWrapper(endpointFn) {
    return async (req, res, next) => {
        try {
            await endpointFn(req, res, next);
        } catch (err) {
            next(err);
        };
    };
};

function createNotFoundError() {
    const err = new Error("Not Found");
    err.status = 404;
    return err;
};

module.exports = {
    tryCatchWrapper,
    createNotFoundError,
};