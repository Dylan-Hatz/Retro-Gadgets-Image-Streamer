import Express from 'express';
import Jimp from 'jimp';
import Axios from 'axios';

const app = Express();
const port = 3000

app.get('/', async (req, res) =>
{

    let result = '';
    let width = +req.query.width
    let height = +req.query.height
    let url = decodeURI(req.query.url)

    console.log(req.ip)
    console.log(url)

    Axios(
    {
        method: 'get',
        url: url,
        responseType: 'arraybuffer'
    }).then(function ({data: imageBuffer}) {
        Jimp.read(imageBuffer, function (err, image)
        {
            console.log(err)
            
            let xscalefactor = width/image.getWidth();
            let yscalefactor = height/image.getHeight();
            let scaledx
            let scaledy
            if (xscalefactor > yscalefactor) {
                scaledx = image.getWidth()*yscalefactor
                scaledy = image.getHeight()*yscalefactor
            } else {
                scaledx = image.getWidth()*xscalefactor
                scaledy = image.getHeight()*xscalefactor
            }
            image=image.resize(scaledx, scaledy)
            result += image.getHeight() + ", " + image.getWidth() + ", ";
            
            
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
                let red = this.bitmap.data[idx + 0];
                let blue = this.bitmap.data[idx + 1];
                let green = this.bitmap.data[idx + 2];
                let alpha = this.bitmap.data[idx + 3];
                result += + red + ", " + blue + ", " + green + ", " + alpha + ", ";
            });
            
            console.log(result.substring(0, result.length - 2).length)
            res.send(result.substring(0, result.length - 2));
        });
    })
})

app.listen(port, () => {
    console.log('server started')
})
