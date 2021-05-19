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
convert('./assets/sample.srt', outputdir + '/output.vtt', function (err) {
    if (!err) {
        console.log('conversion complete');
        //...

    }
});