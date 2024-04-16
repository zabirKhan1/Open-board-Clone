let optioncont = document.querySelector(".opt-cont")
let toolscont = document.querySelector(".tool-cont")
let penciltoolcont = document.querySelector(".pencil-tool-cont")
let erasertoolcont = document.querySelector(".eraser-tool-cont")
let pencil = document.querySelector("#pencil")
let eraser = document.querySelector("#eraser")
let pencilFlag = false
let eraserFlag = false
let sticky = document.querySelector("#sticky")
let updload = document.querySelector("#upload")

let optionFlag = true
optioncont.addEventListener("click", (e) => {
    optionFlag = !optionFlag
    if (optionFlag) {
        opentools();
    } else {
        closetools()
    }



})
function opentools() {
    let iconele = optioncont.children[0]
    iconele.classList.remove("fa-times")
    iconele.classList.add("fa-bars")
    toolscont.style.display = "flex"


}
function closetools() {
    let iconele = optioncont.children[0]
    iconele.classList.remove("fa-bars")
    iconele.classList.add("fa-times")
    toolscont.style.display = "none"
    penciltoolcont.style.display = "none"
    erasertoolcont.style.display = "none"
}
pencil.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag
    if (pencilFlag) {
        penciltoolcont.style.display = "block"
    } else {
        penciltoolcont.style.display = "none"

    }
})
eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag
    if (eraserFlag) {
        erasertoolcont.style.display = "block"
    } else {
        erasertoolcont.style.display = "none"

    }
})

updload.addEventListener("click", (e) => {
    let input = document.createElement("input")
    input.setAttribute("type", "file")
    input.click()

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file)

        let stickyTemplateHTML=` <div class="header-cont">
        <div class="remove"></div>
        <div class="minimize"></div>
        </div>
        <div class="note-cont">
        <img src="${url}"/>
        
        </div>`
        createsticky(stickyTemplateHTML)

    })

})




sticky.addEventListener("click", (e) => {
    let stickyTemplateHTML = `    <div class="header-cont">
    <div class="remove"></div>
    <div class="minimize"></div>
</div>
<div class="note-cont">
    <textarea spellcheck="false" ></textarea>

</div>`;
createsticky(stickyTemplateHTML)

   
})


function draganddrop(element, event) {

    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;


    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}

function createsticky(stickyTemplateHTML){

    let stickycont = document.createElement("div")
    stickycont.setAttribute("class", "sticky-cont")
    stickycont.innerHTML = stickyTemplateHTML
    document.body.appendChild(stickycont);
    let minimize = stickycont.querySelector(".minimize")
    let remove = stickycont.querySelector(".remove")
    noteaction(minimize, remove, stickycont)



    stickycont.onmousedown = function (event) {
        draganddrop(stickycont, event)
    };
    stickycont.ondragstart = function () {
        return false;
    };
}


function noteaction(minimize, remove, stickycont) {
    remove.addEventListener("click", (e) => {
        stickycont.remove();
    })
    minimize.addEventListener("click", () => {
        let notecont = stickycont.querySelector(".note-cont")
        let display = getComputedStyle(notecont).getPropertyValue("display")
        if (display == "none") {
            notecont.style.display = "block"
        } else {
            notecont.style.display = "none "
        }
    })
}
