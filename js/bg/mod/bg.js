define(["dojo/dom"],function(dom){

	var _hello = function(){
		console.log("hello from mod_bg._hello");
	}

	var _setBrowserAction = function(){
		chrome.browserAction.onClicked.addListener(_browserAction_onClick);
	}
	
	var _browserAction_onClick = function(e){
		chrome.tabs.create({
			 url		: "/html/tab.html"
//			 url		: "/html/claro.html"
			,selected	: true
		});
	}

	return {
		 hello 			: _hello
		,setBrowserAction	: _setBrowserAction
	}
})