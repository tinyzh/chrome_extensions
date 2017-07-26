var  url = '';
var domain = '';
var $body = '';
var staticDomain = '';
var staticUrl = '';


location.href = "javascript:document.body.setAttribute('data-static', JS_IMG_URL);";
setTimeout(function() {
    var tempUrl = window.location.href;
    var tempDomain = '';
    var regex = /^\w+\:\/\/([^＼/]*).*/;
    var match = tempUrl.match(regex);
    if(typeof match != "undefined" && null != match) {
        var host = match[1];
        tempDomain = host.split('.');
        tempDomain.shift();
        tempDomain = '.' + tempDomain.join('.');
    }
    setCdnCookie(document.body.getAttribute('data-static'),tempDomain);
}, 0);




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

    chrome.cookies.set({
        domain: staticDomain,
        expirationDate: 1505720700,
        httpOnly: false,
        name:"cssstaging",
        path: "/",
        secure: false,
        url: staticUrl,
        value: "true"
    },function(cookie){});
}

function removeCookie(url){
	chrome.cookies.remove({
		'url':url,
		'name':'staging'
	},function () {
		chrome.extension.getBackgroundPage().outYuFaBu();
	});

    chrome.cookies.remove({
        'url':staticUrl,
        'name':'cssstaging'
    },function () {});
}

function initCookie(url) {
  var str="";
  chrome.cookies.get({"name": "staging","url":url },function(cookie){
	  if(cookie){
		  str=cookie.value;
	  }
		if(""!=str){
			$('#savehm').attr("checked",true);
		}
  });

    chrome.cookies.get({"name": "cdnname","url":url},function(cookie){
        var temp = cookie.value;
        var regex = /^\w+\:\/\/([^＼/]*).*/;
        var match = temp.match(regex);
        if(typeof match != "undefined" && null != match) {
            var host = match[1];
            staticDomain = host.split('.');
            staticDomain.shift();
            staticDomain = '.' + staticDomain.join('.');
        }
        staticUrl = 'http://' + host;
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

// 写入cdn cookie
function setCdnCookie(value,domain) {
    document.cookie = "cdnname="+value+";path=/;expires=1505720700;domain="+domain;
};


  var stagingStatus = document.cookie;
	if(stagingStatus.indexOf('staging=') != -1){
		
		var notice = document.createElement('div');
			notice.innerHTML = '预发布';
			notice.style.padding = '5px';
			notice.style.position = 'fixed';
			notice.style.left = 0;
			notice.style.top = 0;
			notice.style.color = '#fff';
			notice.style.background = '#ff0000';
			notice.style.fontSize = '12px';
			notice.style.zIndex = 9999999999;
            notice.style.borderRadius = '15px';
			notice.className = 'yufabu';
			document.body.appendChild(notice);
	}


