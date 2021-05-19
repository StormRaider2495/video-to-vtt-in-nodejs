// https://stackoverflow.com/questions/30842316/video-to-audio-file-convert-save-through-ffmpeg-in-node-js

const fs = require('fs');

const ffmpeg = require('fluent-ffmpeg');

// ffmpegPath and ffprobePath are needed for progress percent
const ffmpegPath  = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);


const outputdir = './tmp';

/**
 *    input - string, path of input file
 *    output - string, path of output file
 *    callback - function, node-style callback fn (error, result)
 */
function convert(input, output, callback) {
    ffmpeg(input)
        .output(output)
        .on('progress', function (progress) {
            console.log('Processing: ' + Math.round(progress.percent) + '% done');
        })
        .on('stderr', function (line) {
            if (line.trim().startsWith('Duration')) {
                var match = line.trim().match(/Duration:\s\d\d\:\d\d:\d\d/).toString().split('Duration:').slice(1).toString().split(':');
                duration = +match[0] * 60 * 60 + +match[1] * 60 + +match[2];
            } else if (line.trim().startsWith('size=')) {
                match = line.trim().match(/time=\d\d\:\d\d:\d\d/).toString().split('time=').slice(1).toString().split(':');
                var seconds = +match[0] * 60 * 60 + +match[1] * 60 + +match[2];
                percent = seconds / duration;
                percent = (percent * 100).toFixed()
                console.log(`stderr: ${line}`)
                console.log(`${percent}%`)
            }
        })
        .on('end', function () {
            console.log('conversion ended');
            callback(null);
        }).on('error', function (err) {
            console.log('error: ', err);
            callback(err);
        }).run();
}

// Create outputdir if not present
if (!fs.existsSync(outputdir)) {
    console.log('Output folder created ', outputdir);
    fs.mkdirSync(outputdir);
}

// wav conversions are faster than mp3
convert('./assets/sample.mp4', outputdir + '/output.wav', function (err) {
    if (!err) {
        console.log('conversion complete');
        //...

    }
});