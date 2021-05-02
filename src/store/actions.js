const axios = require('axios');

exports.getIssLocation = () => {
    return new Promise((resolve, reject) => {
        try {
            const headers = {
                "Content-Type": "application/json"
            }
            const url = 'http://api.open-notify.org/iss-now.json';
            axios.get(url, headers)
                .then((location) => {
                    var loc = [];

                    loc.push(Number(location.data.iss_position.longitude))
                    loc.push(Number(location.data.iss_position.latitude))
                    resolve(loc)
                })
                .catch((error) => {
                    console.log(error)
                    reject(err)
                })
        } catch (e) {
            reject(e)
        }
    })
}