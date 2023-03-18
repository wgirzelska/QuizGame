// MQTT publisher

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'chat'
var message = 'Hello'

client.on('connect', ()=> {
    setInterval(()=> {
        client.publish(topic,message)
        console.log('Message was sent: ')
        console.log(message)
    }, 5000)
})