(function(){
var text_color = [
	{
		"code":"§0",
		"background_color":"#000",
		"color":"#FFF",
		"name":"Đen"
	},
	{
		"code":"§1",
		"background_color":"#00A",
		"color":"#FFF",
		"name":"Xanh"
	},
	{
		"code":"§2",
		"background_color":"#0A0",
		"color":"#FFF",
		"name":"Xanh"
	},
	{
		"code":"§3",
		"background_color":"#0AA",
		"color":"#FFF",
		"name":"Xanh"
	},
	{
		"code":"§4",
		"background_color":"#A00",
		"color":"#FFF",
		"name":"Đỏ"
	},
	{
		"code":"§5",
		"background_color":"#A0A",
		"color":"#FFF",
		"name":"Tím"
	},
	{
		"code":"§6",
		"background_color":"#FA0",
		"color":"#000",
		"name":"Vàng"
	},
	{
		"code":"§7",
		"background_color":"#AAA",
		"color":"#000",
		"name":"Bạc"
	},
	{
		"code":"§8",
		"background_color":"#555",
		"color":"#FFF",
		"name":"Xám"
	},
	{
		"code":"§9",
		"background_color":"#55F",
		"color":"#000",
		"name":"Xanh"
	},
	{
		"code":"§a",
		"background_color":"#5F5",
		"color":"#000",
		"name":"Xanh"
	},
	{
		"code":"§b",
		"background_color":"#5FF",
		"color":"#000",
		"name":"Xanh"
	},
	{
		"code":"§c",
		"background_color":"#F55",
		"color":"#000",
		"name":"Đỏ"
	},
	{
		"code":"§d",
		"background_color":"#F5F",
		"color":"#000",
		"name":"Hồng"
	},
	{
		"code":"§e",
		"background_color":"#FF5",
		"color":"#000",
		"name":"Vàng"
	},
	{
		"code":"§f",
		"background_color":"#FFF",
		"color":"#000",
		"name":"Trắng"
	}
	];
	var text_type = [
	{
		"code":"§k",
		"background_color":"#330066",
		"color":"#FFF",
		"name":"Chạy loạn",
		"html_code": ""
	},
	{
		"code":"§l",
		"background_color":"#330066",
		"color":"#FFF",
		"name":"<b>In đậm</b>",
		"html_code": "<b>"
	},
	{
		"code":"§m",
		"background_color":"#330066",
		"color":"#FFF",
		"name":"<s>Gạch ngang</s>",
		"html_code": "<s>"	
	},
	{
		"code":"§n",
		"background_color":"#330066",
		"color":"#FFF",
		"name":"<u>Gạch chân</u>",
		"html_code": "<u>"
	},
	{
		"code":"§o",
		"background_color":"#330066",
		"color":"#FFF",
		"name":"<i>Nghiêng</i>",
		"html_code": "<i>"
	},
	{
		"code":"§r",
		"background_color":"#330066",
		"color":"#FFF",
		"name":"Bình thường"
	},
	{
		"code":"\\n",
		"background_color":"#330066",
		"color":"#FFF",
		"name":"Thêm dòng"
	}
];

window.addEventListener('DOMContentLoaded', () => {
	tao_nut();
	document.getElementById('text').addEventListener('keydown', out);
	document.getElementById('button').addEventListener('click', (e) => {
		if (e.target.nodeName === "BUTTON")
			format(e.target.dataset["format"]);
	});
});

function tao_nut() {
	var x = 0;

	function asodnasodn(abc) {

		var output = "";

		for (i = 0; i < abc.length; i++,x++) {

			output += 
			'<button class="fc" style="background-color:'+abc[i].background_color+
			';color:'+abc[i].color+';"\
			data-format="'+x+'">\
			'+abc[i].name+'</button>';
		}	

		return output;
	}

	document.getElementById('button').innerHTML = 
	asodnasodn(text_color)+''+asodnasodn(text_type);		
}

var curPos = 0;

function format(n) {

	var tmp   = document.getElementById('text');
	var a     = tmp.value;

	curPos = getCursor('text');
	if (n >= 16) {
		a = insert(a,text_type[n-16].code,curPos);
	}else {
		a = insert(a,text_color[n].code,curPos);
	}
	
	tmp.value = a;
	curPos   += 2;
	tmp.focus();
	tmp.setSelectionRange(curPos, curPos);
}

function out() {

	var s 		 = document.getElementById('text').value;

	while (true) {

		x = s.indexOf('\\n');

		if (x == -1) {break;}

		s = s.substring(0, x) + '<br>' + s.substring(x+2);	
	}

	var a 		 = s.split('§');
	var first	 = true;
	var curStyle = '';
	var output	 = a[0]; 
	var rip		 = false;

	for (i=1;i<a.length;i++) {

		for (j=0;j<text_color.length;j++) {

			if (a[i][0] == text_color[j].code[1]) {

				if (!first) {
					output += '</span>'	;
				}				
				first = false;

				output += curStyle;
				output += '<span style="color:'+text_color[j].background_color+'">';
			}
		}	

		for (j=0;j<text_type.length-1;j++) {

			if (a[i][0] == text_type[j].code[1]) {

				output += curStyle; 

				if (j != 0 && j != 5) {

					curStyle = text_type[j].html_code;

					output  += curStyle;

					curStyle = insert(curStyle, '/', 1);

				} else if (j == 5) {

					if (!first) {

						output += '</span>'
						first   = true;

					}					
				} else {
					rip = true;
				}			
			}
		}

		if (!rip) {
			output += a[i].substring(1);
		} else {
			for (j=0;j<a[i].substring(1).length;j++) {
				output +=  String.fromCharCode(random(97,103));
			}
			rip = false;
		}
	}

	document.getElementById('out').innerHTML = output;
}


function insert(me, what, index) {
    return me.substring(0, index) + what + me.substring(index);    
}

function random(a, b) {
	if (b == null) {
		return Math.floor(Math.random()*a);
	} else {
		return Math.floor(Math.random()*(b-a))+a;
	}
}

function getCursor(id) {
	element = document.getElementById(id);
    var val = element.value;
    var tmp = val.slice(0, element.selectionStart).length;
    return tmp;
}

})();