const request = require('request')

const forecast = (latitude, longitude, callback) => {
	//const proxy = "http://palmaf:isabella88@138.132.88.109:8080";
    const url = 'https://api.darksky.net/forecast/4114b21ca098549eb5e3c2e5381f7142/' + latitude + ',' + longitude +'?lang=it&units=si'

    //request({ url: url, json: true,proxy: proxy}, (error, response) => {
	request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' Attualmente la temperatura è di  ' + response.body.currently.temperature + ' gradi. C\'è una probabilità del ' + response.body.currently.precipProbability + '% di pioggia.')
        }
    })
}

module.exports = forecast