const video = document.getElementById('video');
var start = new Date();   
var dateStart = start.getHours() + ":" + start.getMinutes() + ":" + start.getSeconds() + ":" + start.getMilliseconds();
console.log("Start Time = "+ dateStart)
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
]).then(startVideo)

function startVideo() {
  // navigator.getUserMedia(
  //   { video: {} },
  //   stream => video.srcObject = vpath,
  //   err => console.error(err)
  // )
  
  video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      faceapi.draw.drawDetections(canvas, resizedDetections)
      var end = new Date(); 
      var dateEnd = end.getHours() + ":" + end.getMinutes() + ":" + end.getSeconds() + ":" + end.getMilliseconds();
      console.log("End Time = " + dateEnd)
    }, 100)
  })
}

