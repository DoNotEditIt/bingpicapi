const express = require('express')
const request = require('superagent')
// var fs = require('fs')
const app = express()
const port = 3008

let num = 7
let bingapi = `https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=${num}&mkt=zh-CN`
let imgurlfront = 'https://cn.bing.com'

async function getimg() {
    await request.get(bingapi).then((resa) => {
        data = resa.text
        var jsondata = JSON.parse(data)
        images = jsondata.images
        image = images[Math.floor(Math.random() * images.length)]
        imageitem = {
            startdata: image.startdata,
            fullstartdate: image.fullstartdate,
            img: imgurlfront + image.url,
            title: image.title,
            copyright: image.copyright,
            copyrightlink: image.copyrightlink,
        }
    })
    return imageitem
}

app.get('/api', (req, res) => {
    getimg().then((item) => {
        res.json(item)
    })
    // fs.writeFile('b.json', JSON.stringify(image), (e) => {})
})

app.get('/imgapi', (req, res) => {
    getimg().then((item) => {
        res.redirect(item.img)
    })
})

app.use((req, res) => {
    res.json({ status: 0, data: '请检查链接是否正确' })
})

app.listen(port, () => {
    console.log('3008项目启动')
})
