(function(){

	var config = {
		waitTime: 1000,
		maxScrollTop: 10000000
	};

	window.onload = function(){
		initialiseChatBot();
		var d = new Date();
		var min = d.getMinutes();
		var hour = d.getHours();
		document.getElementById('time').innerHTML = hour%12 + ":" + (min < 9 ? '0'+min : min) + " " + (hour >= 12 ? "pm" : "am");
	};

	var initialiseChatBot = function(){
		var waitFlag, text = "";
		document.getElementById('input').onkeyup = function(event){
			if(event.keyCode != 13)
				return;
			if(waitFlag)
				text += this.value;
			else
				text = this.value	;
			clearTimeout(waitFlag);
			waitFlag = setTimeout(function(){
				if(waitFlag)
					reply(text);
			}, config.waitTime);
			insertChat(this.value, 0);
			beep(1);
			this.value = "";

		};
		document.getElementsByClassName('close')[0].onclick = function(event){
			window.location = "http://bharathraja.in/"
		};
	};

	var beep = function(n){
		var b1 = document.getElementById('beep-1');
		var b2 = document.getElementById('beep-2');
		if(n == 1){
			b1.currentTime = 0.85;
			b1.play();
			setTimeout(function(){
				b1.pause();
				b1.currentTime = 0;
			}, 700);
		} else {
			b2.currentTime = 2.4;
			b2.play();
		}
	};

	var insertChat = function(text, side){
		var dummy = document.createElement('div');
		dummy.innerText = text;
		document.getElementById('chat-list').innerHTML += '\
			<div class="line">\
				<div class="' + (side ? "left" : "right") + '">'+ dummy.innerHTML +'</div>\
			</div>\
		';
		document.getElementsByClassName('chat-area')[0].scrollTop = config.maxScrollTop;
	}

	var reply = function(text){
		insertChat("okay", 1);
		beep(2);
	}
})();
