const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const app = express()

// Define paths for express config
const publicFolder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup a public folder that browser can access for static resource
app.use(express.static(publicFolder))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wealther App',
        name: 'Yongcong Lei'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Yongcong',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a custom help message',
        title: 'Help',
        name: 'Yongcong Lei',
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address

    if(!address) {
        res.status(400).send({
            error: 'Address must be provided'
        })
        return
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            res.send({error})
            return
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                res.send({error})
                return
            }
    
            res.send({
                address,
                location,
                forecastData
            })
        })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: '404 Help',
        name: 'Yongcong Lei',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404',
        name: 'Yongcong Lei',
        errorMsg: 'My 404 Not Found'
    })
})

app.listen(3000, () => {
    console.log('Express web server is up on port 3000')
})