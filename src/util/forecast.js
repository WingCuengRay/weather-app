const request = require('postman-request')

const url = 'http://api.weatherstack.com/current'

const forecast = (latitude, longitude, callback) => {
    const qs = {
        query: `${longitude},${latitude}`,
        access_key: '112dc7a0e7c5d696912556f951802618',
        units: 'm',
    }
    request({url, qs, json: true}, (error, _, body) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
            return
        } else if (body.error) {
            callback(body.error.info, undefined)
            return;
        }

        callback(undefined, `It's currently ${body.current.temperature} degrees out. ` + 
            `It feels like ${body.current.feelslike} degrees. ` + 
            `The humidity is ${body.current.humidity}%`)
    })
    
}

module.exports = forecast