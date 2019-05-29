const im = require('imagemagick');
const fs = require('fs')
const path = require('path')
const spinner = require('ora')()
spinner.spinner = {
  'interval': 100,
  'frames': [
    '╭(′▽`)╯  ',
    '╯(′▽`)╭  '
  ]
}

let photos = fs.readdirSync(path.resolve(__dirname, '../photos')).filter(item => item !== '.DS_Store');

(async() => {
    for (let photo of photos) {
        spinner.text = `${photo} 压缩中...  ${photos.indexOf(photo) + 1}/${photos.length}`
        spinner.start()
        await resize(path.resolve(__dirname, '../photos/', photo), path.resolve(__dirname, '../public/photos/', photo))
    }
    spinner.succeed('压缩完成！')
})();

function resize(path, distpath) {
    return new Promise((resolve, reject) => {
        im.readMetadata(path, function(err, metadata){
            if (err) throw err;
            // macos imageMagick exifImageWidth => pixelXDimension
            let rate = (metadata.exif.exifImageWidth || metadata.exif.pixelXDimension) / (metadata.exif.exifImageLength || metadata.exif.pixelYDimension)
            im.resize({
                srcPath: path,
                dstPath: distpath,
                quality: 0.8,
                progressive: false,
                width: 1080 * rate,
                height: 1080,
                strip: false
              }, function(err, stdout){
                if (err) throw err;
                resolve(stdout)
            })
        })
    })
}