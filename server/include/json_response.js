let error = (status, err) => {
    return {
        status,
        data: {
            ok: false,
            err
        }
    }
}

let ok = (status, obj) => {
    let res = {
        status,
        data: {
            ok: true,

        }
    }
    for (let key in obj) {
        res.data[key] = obj[key];
    }
    return res;
}

module.exports = {
    error,
    ok
}