const eventSource = new EventSource('http://localhost:3000')

function updateMessage(message) {
    const list = document.getElementById('messages')
    const item = document.createElement('p')
    item.textContent = message
    list.appendChild(item)
}

eventSource.onopen = function() {
    startTime = Date.now()
    updateMessage('Connection opened at', startTime)
}

eventSource.onmessage = function(event) {
    updateMessage(event.data)
}

eventSource.onerror = function(){
    updateMessage('Server closed connection')
    eventSource.close()
} 