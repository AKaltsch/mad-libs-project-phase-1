const templates = "http://localhost:3000/templates"
const playButton = el('play-button')
const pageBody = el('main-content')

function el(id){
    return document.getElementById(id)
}

fetch(templates)
.then(resp => resp.json())
.then(data => console.log(data))


playButton.addEventListener('click', () => {
    showDropdown()
})

function showDropdown() {
    const label = document.createElement('label')
    label.innerText = 'Choose Your Template'
    const dropDown = document.createElement('select')
    pageBody.append(label, dropDown)
}