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
        console.log(image.getWidth()/image.getHeight())
	console.log(image.getWidth())
	console.log(image.getHeight())
	let scaledx
        let scaledy
        if (xscalefactor > yscalefactor) {
            scaledx = image.getWidth()*yscalefactor
            scaledy = image.getHeight()*yscalefactor
        } else {
            scaledx = image.getWidth()*xscalefactor
            scaledy = image.getHeight()*xscalefactor
        }
        image=image.normalize();
        image=image.dither565();
        image=image.resize(scaledx,scaledy, Jimp.RESIZE_NEAREST_NEIGHBOR);
	image.quality(100)
        result += image.getHeight() + ", " + image.getWidth() + ", ";



	image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
	  // x, y is the position of this pixel on the image
	  // idx is the position start position of this rgba tuple in the bitmap Buffer
	  // this is the image
	
	  var red = this.bitmap.data[idx + 0];
	  var green = this.bitmap.data[idx + 1];
	  var blue = this.bitmap.data[idx + 2];
	  var alpha = this.bitmap.data[idx + 3];
	  result += + red + ", " + blue + ", " + green + ", " + alpha + ", ";
	  // rgba values run from 0 - 255
	  // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
	});

        console.log(result.substring(0, result.length - 2).length)
        res.send(result.substring(0, result.length - 2));
    });
})

app.listen(port, () => {
    console.log('server started')
})
