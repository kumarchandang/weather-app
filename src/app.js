const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')

const app = express()

const publicDirPath = path.join(__dirname , '../public')
const viewDirPath = path.join(__dirname,'../templates/views')
const partialsDirPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewDirPath)
hbs.registerPartials(partialsDirPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
	res.render('index',{
		title : 'Weather',
		msg : 'Get your Weather',
		author : 'Chandan Kumar',
	})
})

app.get('/help', (req, res) => {
	res.render('help',{
		title : 'Help',
		msg : 'Help Page',
		author : 'Chandan Kumar',
	})
})

app.get('/about', (req, res) => {
	res.render('about',{
		title : 'About',
		msg : 'About Page',
		author : 'Chandan Kumar',
	})
})


app.get('/weather', (req, res) => {
	if(!req.query.address){
		return res.send({
			error : 'You must have provide address'
		})
	}
	geoCode( req.query.address , (err, {lat, lang} = {}) =>{
		if(err){
			return res.send({
				error : err
			})
		}

		forecast( lat, lang, (error, {location,temperature,desc} = {}) =>{
			if(err){
				return res.send( {error} )
			}
			res.send({
				location,
				temperature,
				weather : desc
			})
		})
	})
})
	



app.listen(3000, () => {
	console.log('Server is running with 3000 port')
})