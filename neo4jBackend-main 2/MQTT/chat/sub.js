// MQTT subscriber

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')

var topic = 'chat'

client.on('message', (topic, message)=> {
    message = message.toString()
    console.log("A message was received: " + message)
})

client.on('connect', ()=>{
    client.subscribe(topic)
})