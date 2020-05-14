const request = require('postman-request')

const geoCode = (address , callback) => {
	const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json';
	const geoCodekey = 'pk.eyJ1IjoiY2hhbmRhbmciLCJhIjoiY2thNTRocHJyMDJiNjNscXRmZjJrOGEzeCJ9.jnMOo9J0kmW1vF3LbehwDA';
	const limit = 1

	request({url : geoCodeUrl+'?access_token='+geoCodekey+'&limit='+limit, json:true}, (error, response, body) =>{
		
		if(error){
			callback('Unable to connect the location service', undefined)
		}else if (body.features.length === 0) {
			callback('Unable to find location, Try another search')
		}else{
			callback(undefined, {
				lat : body.features[0].center[1], 
				lang : body.features[0].center[0]  
			})
		}
	})
}

module.exports = geoCode