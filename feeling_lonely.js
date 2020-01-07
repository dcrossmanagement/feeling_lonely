let form = document.querySelector("form")
let counter = 1
let deleteButtons = document.querySelectorAll(".delete")
let button = document.querySelector("button")
const url = "http://api.icndb.com/jokes/random"

form.addEventListener("submit", (e) => handleSubmit(e))
button.addEventListener("click", chuckNorrisJoke)

function handleSubmit(e){
    let arr = ["Me", "Myself", "I"]
    let index = Math.floor(Math.random() * 3)
    senderVar = arr[index]
    e.preventDefault()
    let input = document.querySelector("input[type=text]")
    let inputValue = input.value
    createMessage(inputValue, senderVar)
    input.value = ""
}

function createMessage(str, sender){
    let today = new Date();
    let time = today.getMinutes() < 10 ? today.getHours() + ": 0" + today.getMinutes() : today.getHours() + ":" + today.getMinutes()
    let chatboxDiv = document.querySelector("#chatbox")
    
    chatboxDiv.innerHTML += `<div class="message" id="${counter}">
    <span>${time}</span>
    <span class="sender">${sender}:</span>
    <span>${str}</span>
    <span class="delete" onClick="deleteMessage(${counter})">❌</span>
  </div>`
  counter++
}

function deleteMessage(id) {
  let element = document.getElementById(id);
  element.parentNode.removeChild(element);
}

function chuckNorrisJoke(){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    createMessage(`${data.value.joke}`,"Fact")
  })
}