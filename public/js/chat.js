"use strict"
const socket = io()

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")
const displayContainer = document.querySelector(".display-container")


chatInput.addEventListener("keypress", (event) => {
    if(event.keyCode === 13) {
        send()
        chatInput.value = ""
    }
})

function send(){
    const param = {
        name : nickname.value,
        msg : chatInput.value
    }
    socket.emit("chatting", param)
}

sendButton.addEventListener("click", send)

//socket.emit("chatting", "from front")


socket.on("chatting", (data) => {
    console.log(data)

    // const li = document.createElement("li");
    // li.innerText = `${data.name} 님이 - ${data.msg}`
    // chatList.appendChild(li)

    const { name, msg, time } = data
    const item = new LiModel(name, msg, time)
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
})


function LiModel(name, msg, time) {
    this.name = name
    this.msg = msg
    this.time = time
    this.makeLi = () => {
        const li = document.createElement("li")
        li.classList.add(nickname.value === this.name ? "sent" : "received")
        const str = `
            <span class="profile">
                <span class="user">${this.name}</span>
                <img class="image" src="https://avatars.githubusercontent.com/u/2931591?v=4" width="50" height="50" alt="any">
            </span>
            <span class="message" >${this.msg}</span>
            <span class="time">${this.time}</span>`
        li.innerHTML = str
        chatList.appendChild(li)
    }
}

console.log(socket)