// const { response } = require("express")

console.log('clinet side java script loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)

    })

})




const weatherform = document.querySelector('form')

const search=document.querySelector('input')

const messageOne=document.querySelector("#message-1")
messageOne.textContent = "From JavaScript"
const messageTwo= document.querySelector("#message-2")

weatherform.addEventListener('submit',(e)=>{

    e.preventDefault()

    messageOne.textContent = "Loading ..."
    messageTwo.textContent = ''
    const location = search.value
    console.log(location)

    const url = '/weather?address='+location
    console.log(url)

    fetch(url).then((response)=>{

    response.json().then((data)=>{

        if(data.error)
        {
            messageOne.textContent = data.error
            console.log(data.error)
        }
        else
        {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        console.log(data.location)
        console.log(data.forecast)
      
        }
    })
  
        
})

  
})