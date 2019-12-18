$.fn.img2blob = function (a) {
    var b = {
        watermark: '',
		fontStyle: 'Arial',
		fontSize: '30',
		fontColor: 'black',
		fontX: 10,
		fontY: 50
    }
	if (typeof a === 'object') {
		a.watermark = (a.watermark == undefined ? b.watermark : a.watermark)
		a.fontStyle = (a.fontStyle == undefined ? b.fontStyle : a.fontStyle)
		a.fontSize = (a.fontSize  == undefined ? b.fontSize : a.fontSize)
		a.fontColor = (a.fontColor == undefined ? b.fontColor : a.fontColor)
		a.fontX = (a.fontX == undefined ? b.fontX : a.fontX)
		a.fontY = (a.fontY == undefined ? b.fontY : a.fontY)
	} else {
		a = b
	}
	// console.log($(this))
    $(this).each((i, c) => {
		// console.log(a)
        var d = $(this).eq(i).attr('src'),
            e = '.' + $(this).attr('class'),
			f = new Image()
			// f.width = 400
			// f.height = 500 
		f.onload = () => {
            var g = document.createElement('canvas')
            g.width = 400
            g.height = 500
            // g.width = f.naturalWidth
            // g.height = f.naturalHeight
			var h = g.getContext('2d')
			h.drawImage(f, 0, 0, 400, 500)
			// console.log(a)
			if (a.watermark !== '') {
				h.font = a.fontSize + 'px ' + a.fontStyle
				h.fillStyle = a.fontColor
				h.fillText(a.watermark, a.fontX, a.fontY)
			}
			// console.log(1111)
            var j = g.toDataURL('image/png'),
                k = DataUriToBinary(j),
                l = new Blob([k], {
					type: 'image/png'
				})
				// console.log(j, '2453')
			let m = window.URL.createObjectURL(l);
			$(e).eq(i).attr('src', m);
		};
			f.src = d
    })

    function DataUriToBinary(n) {
        var o = ';base64,',
			p = n.indexOf(o) + o.length,
			q = n.substring(p),
			r = window.atob(q),
			s = r.length,
			t = new Uint8Array(new ArrayBuffer(s));
			// console.log(s)
        for ( let ind = 0; ind < s; ind++ ) {
            t[ind] = r.charCodeAt(ind);
		}
        return t
    }
}
