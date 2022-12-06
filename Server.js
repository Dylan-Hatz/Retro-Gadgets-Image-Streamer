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
        image=image.scale(0.1);
	console.log(width, height)
	console.log(image.bitmap.width, image.bitmap.height)
	console.log(image.getWidth(), image.getHeight())
	image=image.rotate(-90)
	image=image.flip(true,false)
    console.log(err)
    let result = {};
    result.height=image.getHeight();
    result.width=image.getWidth();
    result.pixels={};
    //result += image.getHeight() + ", " + image.getWidth() + ", ";



	image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
	  let red = this.bitmap.data[idx + 0];
	  let green = this.bitmap.data[idx + 1];
	  let blue = this.bitmap.data[idx + 2];
	  let alpha = this.bitmap.data[idx + 3];
      result.pixels[x][y] = {red,green,blue,alpha};
	//   result += + red + ", " + blue + ", " + green + ", " + alpha + ", ";
	});

        // console.log(result.substring(0, result.length - 2).length)
        res.send(JSON.stringify(result));
    });
})

app.listen(port, () => {
    console.log('server started')
})
