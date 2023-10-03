
// ELEMENTS
const colorPicker = document.getElementById("color-picker")
const selectEl = document.getElementById("mode-picker")
const submitBtn = document.getElementById("submit-btn")

// PICK A RANDOM FIRST COLOR FOR THE COLOR PICKER
const starterColor = '#' + (0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
colorPicker.value = starterColor

// PICK A RANDOM FIRST MODE
const options = selectEl.children
const random  = Math.floor(Math.random() * options.length)
selectEl.value = options[random].value

// COLOR DIVS
const div0 = document.getElementById("col0-container")
const div1 = document.getElementById("col1-container")
const div2 = document.getElementById("col2-container")
const div3 = document.getElementById("col3-container")
const div4 = document.getElementById("col4-container")
const divArr = [div0, div1, div2, div3, div4]


// SET INITIAL COLORS BASED ON FIRST RANDOM COLOR CHOSEN
updateColors()


// USE FETCH TO GET FOUR ADDITIONAL SCHEME COLORS BASED ON SUPPLIED COLOR
function updateColors() {
    const cleanHex = colorPicker.value.slice(1)
    const queryStr = `https://www.thecolorapi.com/scheme?hex=${cleanHex}&mode=${selectEl.value}&count=4`
    fetch(queryStr)
        .then(res => res.json())
        .then(data => {
            let colorsArray = []
            colorsArray.push(colorPicker.value)
            for (let color of data.colors) {
                colorsArray.push(color.hex.value)
            }
            populateColContainers(colorsArray)
        })
}

// POPULATE ALL THE COLOR COLUMNS AND HEX VALUES
function populateColContainers(colorsArray) {
    divArr.forEach(function(div, i) {
        const colStr = colorsArray[i]
        div.style.backgroundColor = colStr
        div.dataset.color = colStr
        const hexdiv = document.getElementById(`hex${i}-container`)
        hexdiv.textContent = colStr
        hexdiv.dataset.color = colStr
    })
}

// UPDATE COLORS WHEN BTN CLICKED
submitBtn.addEventListener("click", function() {
    updateColors()
})


// COPY COLOR TO CLIPBOARD
const copyMsgEl = document.getElementById("copied-msg")
const colsContainer = document.getElementById("color-containers")
let timeout

colsContainer.addEventListener("click", function(e) {
    if (!e.target.dataset.color) {
        return
    } 
    clearTimeout(timeout)
    navigator.clipboard.writeText(e.target.dataset.color);
    copyMsgEl.hidden = false
    copyMsgEl.textContent = `Color ${e.target.dataset.color.toUpperCase()} copied to clipboard!`
    window.scrollTo(0, document.body.scrollHeight)
    timeout = setTimeout(function() {
        copyMsgEl.hidden = true
    }, 2000)
})








