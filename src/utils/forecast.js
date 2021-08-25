const request= require('request')

const forcast = (latitude,longitude, callback)=>{


    const url = 'http://api.weatherstack.com/current?access_key=1c4cbaa9bb64c12bc1ee7c4eb0c26c52&query='+latitude+','+longitude+'&units=f'
    request({url:url,json:true},(err,response)=>{

        if(err)
        {
            callback('unable to connect to weather app service ',undefined)
        }
        else if(response.body.error)
        {

            callback('unable to find location',undefined)
        }
        else
        {
            //callback(undefined,{temparature: response.body.current.temperature,feelsLike:response.body.current.feelslike})
            callback(undefined,response.body.current.weather_descriptions[0] + " . It is curently " + response.body.current.temperature + " degrees out.It feels like  "+
            response.body.current.feelslike + " degrees out. The humidity is "+ response.body.current.humidity + "%"
            )
        }
    })
}

module.exports = forcast
