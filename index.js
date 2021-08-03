const templates = "http://localhost:3000/templates"
const playButton = el('play-button')
const pageBody = el('main-content')
const dropDownForm = el('dropdown-form')
const dataSet = []
const boxForm = el('blank-boxes')
const submitForm = el('submit-form')
const boxValueArray = []
const sentenceArray = []
const paragraph = el('paragraph')

function el(id){
    return document.getElementById(id)
}

function loadData(dataset) {
    //console.log(dataset)
    dataset.forEach(data => {
        dataSet.push(data)
        appendTitle(data)})
}

playButton.addEventListener('click', () => {
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
    // console.log(dropDown)
    option.innerText = template.title
    option.value = template.title
    dropDown.append(option)
}

function getBoxBlanks(tempTitle) {
    dataSet.forEach(set => {
        if(tempTitle === set.title) {
            iterateBlanks(set.blanks)
            getSentences(set.value)
        }
    })   
}

function iterateBlanks(blanks){
    blanks.forEach(blank => {
        renderBoxFromBlank(blank)
    })
}

function renderBoxFromBlank(blank) {
    const input = document.createElement('input')
    input.className = 'box-values'
    input.type = 'text'
    input.value = ""
    input.placeholder = `${blank}`
    boxForm.append(input)
}

function createSubmitButton(){
    const submit = document.createElement('input')
    submit.type = 'submit'
    submit.value = 'Show Me My MAD-LIBS!!!'
    submitForm.append(submit)
}

submitForm.addEventListener('submit', e => {
    e.preventDefault()
    collectBoxValues()
    createParagraph(sentenceArray, boxValueArray)
})

// this function creates an array with all of the box values
function collectBoxValues() {
    //const boxValueArray = []
    const inputArray = document.querySelectorAll('input.box-values')
    inputArray.forEach(input => boxValueArray.push(input.value)) 
    //console.log(boxValueArray)
    return boxValueArray
}

function getSentences(sentences) {
    //const sentenceArray = []
    sentences.forEach(sentence => {
        sentenceArray.push(sentence)
    })
    //console.log(sentenceArray)
    return sentenceArray
}

//console.log(sentenceArray)

function createParagraph(sentenceArray, boxValueArray) {
    i = 0
    let madLib = []
    do {
        madLib.push(sentenceArray[i] + boxValueArray[i]);
        i++
    }
    while(boxValueArray.length > i)
    const endSentence = sentenceArray.slice(boxValueArray.length, -1)
    console.log(endSentence)
    madLib = madLib + endSentence
    //madLib = madLib.join(' ')
    paragraph.append(madLib)
}
