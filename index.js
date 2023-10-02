
// PICK A RANDOM FIRST COLOR FOR THE COLOR PICKER

const colorPicker = document.getElementById("color-picker")
const starterColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
colorPicker.value = starterColor



// ALL THIS BELOW IS PLACEHOLDER STUFF TO GENERATE RANDOM COLORS
const div1 = document.getElementById("col1-container")
const div2 = document.getElementById("col2-container")
const div3 = document.getElementById("col3-container")
const div4 = document.getElementById("col4-container")
const div5 = document.getElementById("col5-container")

const divArr = [div2, div3, div4, div5]

div1.style.backgroundColor = starterColor
div1.dataset.color = starterColor

const hex1 = document.getElementById(`hex1-container`)
hex1.textContent = starterColor
hex1.dataset.color = starterColor

divArr.forEach(function(div, i) {
    const colStr = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
    div.style.backgroundColor = colStr
    div.dataset.color = colStr
    const hexdiv = document.getElementById(`hex${i+2}-container`)
    hexdiv.textContent = colStr
    hexdiv.dataset.color = colStr
})




// ACTUAL JS HERE

// COPY COLORS
const copyMsgEl = document.getElementById("copied-msg")
const colsContainer = document.getElementById("color-containers")
let timeout

colsContainer.addEventListener("click", function(e) {
   clearTimeout(timeout)
   navigator.clipboard.writeText(e.target.dataset.color);
   copyMsgEl.hidden = false
   copyMsgEl.textContent = `Color ${e.target.dataset.color.toUpperCase()} copied to clipboard!`
   window.scrollTo(0, document.body.scrollHeight)
   timeout = setTimeout(function() {
    copyMsgEl.hidden = true
   }, 2000)
})








