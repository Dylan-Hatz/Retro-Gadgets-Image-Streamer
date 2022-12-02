import Express from 'express';
import Jimp from 'jimp';

const app = Express();
const port = 3000

app.get('/', async (req, res) => {

    let result = '';
    let width = +req.query.width
    let height = +req.query.height

    console.log(req.ip)
    console.log(decodeURI(req.query.url))

    Jimp.read(decodeURI(req.query.url), function (err, image) {
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
        image=image.resize(scaledx,scaledy)

        result += image.getHeight() + ", " + image.getWidth() + ", ";

        for (let y = 0; y < image.getHeight(); y++) {
            for (let x = 0; x < image.getWidth(); x++) {
                let pixel = image.getPixelColor(x, y); // returns the colour of that pixel e.g. 0xFFFFFFFF
                let hexPixel = pixel.toString(16);
                let red = parseInt(hexPixel.substring(0, 2), 16);
                let blue = parseInt(hexPixel.substring(2, 4), 16);
                let green = parseInt(hexPixel.substring(4, 6), 16);
                let alpha = parseInt(hexPixel.substring(6, 8), 16);
                
                result += + red + ", " + blue + ", " + green + ", " + alpha + ", ";
            }
        }
        console.log(result.substring(0, result.length - 2).length)
        res.send(result.substring(0, result.length - 2));
    });
})

app.listen(port, () => {
    console.log('server started')
})