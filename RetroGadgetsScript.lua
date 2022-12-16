local vid:VideoChip=gdt.VideoChip0
local net:Wifi=gdt.Wifi0
local screenheight=vid.Height
local screenwidth=vid.Width
local server="http://172.19.62.40:3000"
local url = "https://picsum.photos/"..(screenwidth*2).."/"..(screenheight*2)..""
local widthmessage = "&width="..screenwidth
local heightmessage = "&height="..screenheight

handle=net:WebGet(server.."?url="..url..widthmessage..heightmessage)
while net:GetWebDownloadProgress(handle)<100 do
  sleep(0.5)
end
print("download complete")

-- got a little help from https://stackoverflow.com/questions/1426954/split-string-in-lua
function mysplit (inputstr, sep)
    if sep == nil then
        sep = "%s"
    end
    local t={}
    for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
    	table.insert(t, str)
    end
    return t
end

function eventChannel1(sender:Wifi, arg:WifiWebResponseEvent)
	if(arg.ResponseCode~=200)then
		logError("Return Code not 200")
		return
	end
  list = mysplit(arg.Text, ", ")
  height = table.remove(list, 1)
  width = table.remove(list, 1)
  currentPixel = {0, 0, 0, 0}
  index = 1
	for pixely=1, height, 1 do
		for pixelx=1, width, 1 do
currentPixel={list[index],list[index+1],list[index+2],list[index+3]}
			vid:SetPixel(vec2(pixelx, pixely), ColorRGBA(currentPixel[1], currentPixel[2], currentPixel[3], currentPixel[4]))
			index+=4
		end
	end
end