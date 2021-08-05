const templates = "http://localhost:3000/templates"
const playButton = el('play-button')
const pageBody = el('main-content')
const dropDownForm = el('dropdown-form')
const dataSet = []
const boxForm = el('blank-boxes')
const submitForm = el('submit-form')
let sentenceArray = []
const paragraph = el('paragraph')
const resetForm = el("reset")
let madlib = []
let counter = 0


function el(id){
    return document.getElementById(id)
}

function loadData(dataset) {
    dataset.forEach(data => {
        dataSet.push(data)
        appendTitle(data)})
}

playButton.addEventListener('click', () => {
    dropDownForm.innerHTML = ""
    showDropdown()  
})

function showDropdown() {
    const label = document.createElement('label')
    label.innerText = 'Choose Your Template  '
    const dropDown = document.createElement('select')
    dropDown.addEventListener('change', e => {
        boxForm.innerHTML = ''
        getBoxBlanks(e.target.value)
        createSubmitButton()
    })
    dropDown.id = 'drop-templates'
    dropDown.name = templates
    dropDownForm.append(label, dropDown)
    fetch(templates)
    .then(resp => resp.json())
    .then(dataset => loadData(dataset))
}

function appendTitle(template) {
    const option = document.createElement('option')
    const dropDown = el('drop-templates')
    option.innerText = template.title
    option.value = template.title
    dropDown.append(option)
}

function getBoxBlanks(tempTitle) {
    dataSet.forEach(set => {
        if(tempTitle === set.title) {
            iterateBlanksAndRenderBox(set.blanks);
            getSentences(set.value)
        }
    })   
}

function iterateBlanksAndRenderBox(blanks){
    blanks.forEach(blank => {
        const input = document.createElement('input')
        input.className = 'box-values'
        input.type = 'text'
        input.value = ""
        input.placeholder = `${blank}`
        boxForm.append(input)
    })
}

function createSubmitButton(){
    submitForm.innerHTML = ""
    // const submit = document.createElement('input')
    const submit = document.createElement('button')
    submit.id = "submit-button"
    submit.type = 'submit'
    submit.value = 'Show Me My MAD-LIBS!!!'
    submitForm.append(submit)
}

submitForm.addEventListener('submit', e => {
    e.preventDefault()
    collectBoxValues()
    if (boxValueArray.includes(null || "")){
        alert("Please fill out all boxes");
    } else {
    createParagraph(sentenceArray, boxValueArray)
    renderReset()
    counter += 1
}})

function collectBoxValues() {
    boxValueArray = []
    const inputArray = document.querySelectorAll('input.box-values')
    inputArray.forEach(input => boxValueArray.push(input.value)) 
    return boxValueArray
}

function getSentences(sentences) {
    sentenceArray = []
    sentences.forEach(sentence => {
        sentenceArray.push(sentence)
    })
    return sentenceArray
}

function createParagraph(sentenceArray, boxValueArray) {
    const paragraphP = document.createElement('p')
    madlib = []
    for (let i = 0; i < boxValueArray.length; i++){
        madlib.push(sentenceArray[i] + boxValueArray[i]);
    }
    const endSentence = sentenceArray.slice(boxValueArray.length, -1)
    madlib.push(endSentence)
    paragraphP.append(madlib.join(' '))
    paragraph.append(paragraphP)
}

function renderReset() {
    const reset = document.createElement('button')
    reset.innerText = "Play Again?"
    reset.id = "reset-button"
    reset.type = 'button'
    resetForm.append(reset)
}

resetForm.addEventListener('click', () => {
    boxForm.innerHTML = ""
    submitForm.innerHTML = ""
    paragraph.innerHTML = ""
    resetForm.innerHTML = ""
})

