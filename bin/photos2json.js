const ExifImage = require('exif').ExifImage;
const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat)

let photos = fs.readdirSync(path.resolve(__dirname, '../photos'));

let photoJSON = {};

(async() => {
    for (let photo of photos) {
        let info = await getExif(path.resolve(__dirname, '../photos/', photo), photo)

        // day detail
        let year = new Date(info.timestamp).getFullYear()
        let month = new Date(info.timestamp).getMonth() + 1
        let date = new Date(info.timestamp).getDate() // 日
        let day = new Date(1556857340000).getDay() // 星期

        photoJSON[year] || (photoJSON[year] = {})
        photoJSON[year][month] || (photoJSON[year][month] = {})
        photoJSON[year][month][date] || (photoJSON[year][month][date] = [])

        // save
        photoJSON[year][month][date].push(info)
    }

    fs.writeFileSync(path.resolve(__dirname, './../public/photos.json'), JSON.stringify(photoJSON))
    console.log(`照片数量: ${photos.length}   数据保存成功！ ${path.resolve(__dirname, './../public/photos.json')}`)
})();

function getExif(path, filename) {
    return new Promise((resolve, reject) => {
        new ExifImage({ image : path}, function (error, exifData) {
            if (error) {
                reject(error)
                return
            }
            let info = {
                File: filename,
                Make: exifData.image.Make,                              // 产商
                Model: exifData.image.Model,                            // 型号
                FocalLength : exifData.exif.FocalLength,                // 焦距
                FNumber : `f/${exifData.exif.FNumber}`,                 // 光圈
                ExposureTime : transform(exifData.exif.ExposureTime),   // 快门速度
                ISO: exifData.exif.ISO,                                 // ISO
                time: exifData.exif.CreateDate,
                timestamp: +new Date(dayjs(exifData.exif.CreateDate, 'YYYY:MM:DD HH:mm:ss')['$d'])
            }
            resolve(info)
        })
    })
}

// 快门速度 小数转分数
function transform(number) {
    let num = number
    let x = String(num).indexOf('.') + 1;   //小数点的位置
    let y = String(num).length - x;  //小数的位数
    if(y > 0){
        return `1/${1 / num}`
    } else {
        return num.toString()
    }
}

