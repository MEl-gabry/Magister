import { request } from "https";

export default new Proxy({}, {
    get: (_target, method) => (path, data) =>
        new Promise((resolve, reject) => {
            const req = request(
                {
                    host: "magister-60b0a-default-rtdb.firebaseio.com",
                    path: path + ".json",
                    port: 443,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: method.toUpperCase(),
                },
                res => res.on("data", data => resolve(JSON.parse(data.toString())))
            );
            req.on("error", reject);
            if(data) req.write(JSON.stringify(data));
            req.end();
        })
})