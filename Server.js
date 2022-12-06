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
        image=image.resize(width, height);
	console.log(width, height)
	console.log(image.bitmap.width, image.bitmap.height)
	console.log(image.getWidth(), image.getHeight())
	image=image.rotate(-90)
	image=image.flip(true,false)
    image.quality(100)
    // image=image.dither565()
    // image=image.normalize()
        console.log(err)
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

app.listen(port, () => {
    console.log('server started')
})
