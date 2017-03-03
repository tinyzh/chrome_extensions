var  url = '';
var domain = '';
var $body = '';


function getHost(url)
{
	var host = "null";
	if(typeof url == "undefined"|| null == url) {
		url = window.location.href;
		$body = $('body');
	}
	var regex = /^\w+\:\/\/([^＼/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match) {
		host = match[1];
		domain = host.split('.');
		domain.shift();
		domain = '.' + domain.join('.');
	}
	return 'http://'+host;
}

function setCookie() {
  chrome.cookies.set({
	  domain: domain,
	  expirationDate: 1505720700, 
	  httpOnly: false,
	  name:"staging",
	  path: "/",
	  secure: false, 
	  url: url,
	  value: "true"
  },function(cookie){
	  chrome.extension.getBackgroundPage().inYuFaBu();
  });
}

function removeCookie(url){
	chrome.cookies.remove({
		'url':url,
		'name':'staging'
	},function () {
		chrome.extension.getBackgroundPage().outYuFaBu();
	});
}

function initCookie(url) {

  var str="";
  chrome.cookies.get({"name": "staging","url":url },function(cookie){
	  if(cookie){
		  str=cookie.value;
	  }
		if(""!=str){
			$('#savehm').attr("checked",true);
			chrome.extension.getBackgroundPage().inYuFaBu();

		}
  });
}

function init(){
	chrome.tabs.getSelected(null, function(tab) {
		if(tab){
			url = getHost(tab.url);
			initCookie(url);
		}
	});

  $('#savehm').click(function() {
	  if($('#savehm').attr('checked')) {
		  setCookie();
	  }else{
		 
		  removeCookie(url);
	  }
	
  });

  $('#savemm').click(function() {
	 if($('#savemm').attr('checked')){
		$('#savehm').attr("checked",true);
	 }else{
		$('#savehm').attr("checked",false);
	 }
  });
  
}
document.addEventListener('DOMContentLoaded', function () {
  init();
});

 
  
  var stagingStatus = document.cookie;
	if(stagingStatus.indexOf('staging=') != -1){
		
		var notice = document.createElement('div');
			notice.innerHTML = '处于预发布环境';
			notice.style.padding = '5px';
			notice.style.position = 'fixed';
			notice.style.left = 0;
			notice.style.top = 0;
			notice.style.color = '#fff';
			notice.style.background = '#ff0000';
			notice.style.fontSize = '14px';
			notice.style.zIndex = 9999999999;
			notice.className = 'yufabu';
			document.body.appendChild(notice);
	}


