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
            callback(undefined,{temparature: response.body.current.temperature,feelsLike:response.body.current.feelslike})
        }
    })
}

module.exports = forcast
