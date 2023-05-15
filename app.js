const http = require('http');
var fs = require('fs');
const findRemoveSync = require('find-remove')



const PORT = 4000;

http.createServer(function (request, response) {
    console.log('request starting...', new Date());

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
    };
    if (request.method === 'OPTIONS') {
        respose.writeHead(204, headers);
        response.end();
        return;
    }

    //  './videos' + 
    var filePath ='./videos' + request.url;
    console.log(filePath);;
    fs.readFile(filePath, function (error, content) {
        response.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        }
        else {
            response.end(content, 'utf-8');

            // './videos',

            setInterval(() => {
              var result = findRemoveSync('./videos', { age: { seconds: 30 }, extensions: '.ts' });
              console.log(result);
          }, 3000);


        }
    });


    (function() {
        var childProcess = require("child_process");
        var oldSpawn = childProcess.spawn;
        function mySpawn() {
            console.log('spawn called');
            console.log(arguments);
            var result = oldSpawn.apply(this, arguments);
            return result;
        }
        childProcess.spawn = mySpawn;
    })();





}).listen(PORT);
console.log(`Server listening PORT ${PORT}`);

//------------------------------------------------------------------------------


// const express = require("express");
// const morgan =require('morgan')


// // Middlewares
// const app = express();
// app.use(express.json());

// app.use(morgan('tiny'))

// const router = express.Router();

// router.get("/", async (req, res, next) => {
//   console.log('hello')
//   return res.status(200).json({
//     title: "Express Testing",
//     message: "The app is working properly!",
//   });
// });




//const Stream = require('node-rtsp-stream');

// const streamUrl = [
    
//     "rtsp://185.217.90.19:554/11",
    

//     // "rtsp://210.99.70.120:1935/live/cctv009.stream",

// ]

// let stream0 = new Stream({
//   name: 'foscam_stream',
//   streamUrl: streamUrl[0],
//   wsPort: 4000,
  


//   wsPath: '/stream',
//   ffmpegOptions: { 
//     '-stats': '', 
//     '-r': 30
// }

// //   width: ,
// //   height: 100
// });






// connection
// const port = process.env.PORT || 9001;
// app.listen(port, () => console.log(`Listening to port ${port}`));



// ffmpeg -rtsp_transport tcp -i rtsp://210.99.70.120:1935/live/cctv009.stream -vcodec libx264 -hls_flags delete_segments  test.m3u8

// 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

//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

/*

this.spawnOptions = [
    "-rtsp_transport", "tcp", "-i",
    this.url,
    '-f',
    'mpeg1video',
    '-b:v', '1000k',
    '-maxrate', '1000k',
    '-bufsize', '1000k',
     '-an', '-r', '24',
    // additional ffmpeg options go here
    ...this.additionalFlags,
    '-'
  ]

  */



  //--------------------------------------------------------------------

//   const ffmpeg = require('fluent-ffmpeg')
//   const fs = require('fs')
//   const ffmpegPath = './ffmpeg.exe'
//   ffmpeg.setFfmpegPath(ffmpegPath)

//  // Now read from the test-video .webm file
//    const inputFile = 'test-video.webm'
//    var inputStream = fs.createReadStream(inputFile)
//    inputStream.on('error', function(error) {
//        console.log(`\tError with reading from input stream: ${error}`)
//    })

//    // And write that data to the .pcm audio file
//    var outputFileName = 'test.m3u8'
//    var outputStream = fs.createWriteStream(outputFileName)

//    var ffmpeg = child_process.spawn('ffmpeg', ['-y', '-i', '-vn', '-ac', '1', '-ar', '16000', 'pcm_s16le'])
//    inputStream.pipe(ffmpeg.stdin)
//    ffmpeg.stdout.pipe(outputStream)

//    ffmpeg.stderr.on('data', function (data) {
//        // console.log(data.toString())
//        console.log(`DATA FROM FFMPEG: ${data}`)
//    })

//    ffmpeg.stderr.on('end', function () {
//        console.log('\tWebm -> PCM File has been converted succesfully')
//    })
   
//    ffmpeg.stderr.on('exit', function () {
//        console.log('\tFFMPEG child process exited')
//    })
   
//    ffmpeg.stderr.on('close', function() {
//        console.log('\t...Closing time! Bye')
//    })
