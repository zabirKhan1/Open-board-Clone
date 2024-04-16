let canvas=document.querySelector("canvas")
canvas.width=window.innerWidth
canvas.height=window.innerHeight

let pencilcolor=document.querySelectorAll(".pencil-color")
let pencilwidthele=document.querySelector(".pencil-width")
let eraserwidthele=document.querySelector(".eraser-width")
let download=document.querySelector("#download")
let undo=document.querySelector("#undo")
let redo=document.querySelector("#redo")



let pencolor="red"
let erasercolor="white"
let penwidth=pencilwidthele.value
let eraserwidth=eraserwidthele.value

let undoredotracker=[];
let track=0
//api
let mousedown=false
let tool=canvas.getContext("2d")
// tool.lineWidth="8"
// tool.strokeStyle="blue"
// tool.beginPath()
// tool.moveTo(10,10)//start
// tool.lineTo(100,150)//end
// tool.stroke()//fill color
tool.strokeStyle=pencolor
tool.lineWidth=penwidth

//mouse down satrt
canvas.addEventListener("mousedown",(e)=>{
    mousedown=true
    beginpath({
        x:e.clientX,
        y:e.clientY
    })
 
})
canvas.addEventListener("mousemove",(e)=>{
    if(mousedown){
        drawstock({
            x:e.clientX,
            y:e.clientY,
            color:eraserFlag?erasercolor:pencolor,
            width:eraserFlag?eraserwidth:penwidth
        })

    }
   
})
canvas.addEventListener("mouseup",(e)=>{
    mousedown=false

    let url=canvas.toDataURL()
    undoredotracker.push(url)
    track=undoredotracker.length-1

})

undo.addEventListener("click", (e) => {
    if (track > 0) track--;
    // track action
    let data = {
        trackValue: track,
        undoredotracker
    }
      undoredocanvas(data)
})
redo.addEventListener("click", (e) => {
    if (track < undoRedoTracker.length-1) track++;
    // track action
    let data = {
        trackValue: track,
        undoredotracker
    }
    undoredocanvas(data)
})


    function undoredocanvas(trackobj){
        track=trackobj.trackValue;
        let url=undoredotracker[track]
        undoredotracker=trackobj.undoredotracker
        let img=new Image()
        img.src=url;
        img.onload=(e)=>{
            tool.drawImage(img,0,0,canvas.width,canvas)
        }



    }


function beginpath(strokeobj){
    tool.beginPath();
    tool.moveTo(strokeobj.x,strokeobj.y)
}
function drawstock(strokeobj){
    tool.strokeStyle=strokeobj.color;
    tool.lineWidth=strokeobj.width;
    tool.lineTo(strokeobj.x,strokeobj.y)
    tool.stroke();
}


pencilcolor.forEach((colorele)=>{
colorele.addEventListener("click",(e)=>{
    let color=colorele.classList[0]
    pencolor=color
    tool.strokeStyle=pencolor

})
})


pencilwidthele.addEventListener("change",(e)=>{
    penwidth=pencilwidthele.value
    tool.lineWidth=penwidth

})

eraserwidthele.addEventListener("change",(e)=>{
    eraserwidth=eraserwidthele.value
    tool.lineWidth=eraserwidth

})
eraser.addEventListener("click",(e)=>{
    if(eraserFlag){
        tool.strokeStyle=erasercolor
        tool.lineWidth=eraserwidth
    }else{
        tool.strokeStyle=pencolor;
        tool.lineWidth=penwidth;
    }
})



download.addEventListener("click",(e)=>{
    let url=canvas.toDataURL();
    let a=document.createElement("a")
    a.href=url
    a.download="board.jpg"
    a.click();
})




