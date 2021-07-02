const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`
    const qs = {
        access_token: 'pk.eyJ1IjoibHljMjAxN2ZhbGwiLCJhIjoiY2txYjlmemdmMGJ2eTJwcDlrbzg1cDMzcSJ9.LVL_Bv2ox6Id9QFsqptzXw',
        limit: 1,
    }

    request({url, qs, json: true}, (error, _, {features}) => {
        if (error) {
            callback('Unable to connect to Geocoding service', undefined)
            return
        } else if (features.length === 0) {
            callback('No result for the current query', undefined)
            return
        }

        callback(error, {
            longitude: features[0].center[1],
            latitude: features[0].center[0],
            location: features[0].place_name
        })
    })
}

module.exports = geocode