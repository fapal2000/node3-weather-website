const request = require('request')

const geocode = (address, proxy , callback) => {
	//const proxy = "http://palmaf:isabella88@138.132.88.109:8080"
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +
	'.json?access_token=pk.eyJ1IjoiZmFwYWwiLCJhIjoiY2szZnduaHg5MDhxczNjcDd1Y240eTNlcCJ9.nhFcKkRrKcqoL2nMqOfHEg&limit=1'

    //request({ url: url, json: true,proxy: proxy }, (error, response) => {
	request({ url: url, json: true, proxy}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
		} else if (response.body.features.length === 0) {
            callback('Località non trovata. Prova con un altra ricerca.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode