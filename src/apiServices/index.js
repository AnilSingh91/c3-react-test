// Http request handler
async function httpRequest(url) {
    let res;
    try {
        res = await fetch(url);
        return res.json();
    } catch(e) {
        throw new Error();
    }
    
}

export default httpRequest