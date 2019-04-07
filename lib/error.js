/**
 * Created by root on 12/2/14.
 */
exports.errorHandle = function(err, req, res, next) {
    //Error Handling
    let status = 500;
    if (err.status) {
        if (typeof err.status === 'function') {
            status = err.status() || status;
        }
        else if (typeof err.status === 'number') {
            status = err.status;
        }
    }

    try {
        console.log(err);
        let message = status >= 500 ? '抱歉，内部发生错误' : (err.message || '请求错误');
        res.status(status).send(message);
    }
    catch (e) {
        e.message = 'Error in sending RESPONSE ({0}):\t{1} -> {2}'.format(req.url, e.message, err.message);
    }
};