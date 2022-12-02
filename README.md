# Retro-Gadgets-Image-Streamer
This is a project made by myself(Hungy in the discord server) and InvertedOwl in the Retro Gadgets Discord.

The intended use is to get images from the web and display them in game.
Currently, the server ip and the url of the image must be entered in the code, but we plan to make it into a module soon.
Loading images is rather slow, though, as loading an image onto a 512x288 screen takes 6.5 seconds per frame

Technical explanation:
The server is node.js running express. The serverip has the desired image's url, the width of the screen, and the height of the screen added to it as queries, which is then used as the address for a WebGet. The server reads the image url, uses Jimp to download the image and then resize it to the largest size that can fit on the screen(or a set size if you change the values of screen width and height variables), and breaks it down into a string of numbers, with the first 2 being the width and height of the image and the rest being sets of 4 numbers indicating rgb values for the pixels.
This string is sent back to RG where it is split into values in a list of numbers. The first 2 in this list are removed and assigned to width and height. Then, it goes to every fourth list item and calls it and the next three points as rgba colors to set a pixel.
