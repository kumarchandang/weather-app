const request = require('postman-request')

const forecast = (lat, lang, callback) => {
	const url = 'http://api.weatherstack.com/current';
	const key = '9e1790db673e8c506ae06e45cce946fa';
	
	request({url : url+'?access_key='+key+'&query='+lat+','+lang, json:true} , (err, res , body) => {
		if(err){
			callback('Unable to connect the weather service', undefined)
		}else if(body.location === 0){
			callback('Unable to fetch details from given latitude and langitude')
		}else{
			callback(undefined, {
				temperature : body.current.temperature,
				location : body.location.name,
				desc : body.current.weather_descriptions[0]
			})
		}
	})	
}

module.exports = forecast