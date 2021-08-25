const request = require('request')

const geocode = (address,callback)=>{

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+'.json?access_token=pk.eyJ1IjoiYXR1a3VyaXNyaW51IiwiYSI6ImNrc2EyM213YzA1NjYyb29ocWpna2U1Z2wifQ.BFTUEkBlisILuQVowpJy8A&limit=1'

    request({url:url,json:true},(error,response) =>{

        if(error){
            callback('unable to connect to location service',undefined)
        }
        else if(response.body.features.length==0){

            callback('unable to find location service',undefined)

        }
        else{

            // const data={
            //     latitude:response.body.features[0].center[0],
            //     longitude:response.body.features[0].center[1]
            // }
            // callback(undefined,data)
            callback(undefined,{latitude:response.body.features[0].center[0],longitude:response.body.features[0].center[1],
            location:response.body.features[0].place_name})
        }

    })

    
}
module.exports = geocode