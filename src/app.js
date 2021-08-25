const path =require('path')
const express = require('express')
const hbs= require('hbs')

const geocode=require('./utils/geocode')
const forecast= require('./utils/forecast')
const app= express()

//Define paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialPath)

//set up directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'ASR'
    })
})

app.get('/About',(req,res)=>{

    res.render('about',{title:'About Weather App',name:'ASR'})
})

app.get('/help',(req,res)=>{
    res.render('help',{title:'Help about weather app',name:'ASR'})
})
// app.get('/help',(req,res)=>{
//     res.send([{name:'ASR',
// Age:36},
// {name:'Vasu',Age:34}])
// })

// app.get('/About',(req,res)=>{

//     res.send('<h1> About Page </h1>')
// })

app.get('/weather', (req,res)=>{

    if(!req.query.address){

        return res.send({error:'please provide the address'})

    }

    geocode(req.query.address,(err,{latitude,longitude}={})=>{

        if(err)
        {
            return res.send({err:'failed to get coordinates for the provided - address '+req.query.address + ' with the error '+err})
        }

        forecast(latitude,longitude,(err,{temparature,feelsLike}={})=>{

            if(err)
            {
                return res.send({error:'failed to get weather forcast for provided { latitude - ' + latitude + 'longitude- }' + longitude+ 'with the error '+err})
            }

      
          res.send({ temparature: 'temparature - ' + temparature , feelsLike: ' feels like - '+feelsLike })

        })

    })
 
   // res.send({location:'India',forecast:'32F'})
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
       return  res.send({
           error:'you must provide a search '
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{errormessage:'Help article not found - 404'})
})

app.get('*',(req,res)=>{
    res.render('error',{errormessage:'Page Not found 404'})
})
app.listen('3000',()=>{

    console.log('server is up  at port 3000')
})