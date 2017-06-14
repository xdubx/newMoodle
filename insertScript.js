
document.addEventListener("DOMContentLoaded", function(event) { 
  insertBtn();
});
function insertBtn(){


	var btn = document.createElement("div");              
	btn.innerHTML = "<button id='changeStyle' onClick = 'loadNewStyle()'>Change</button>";    
	document.getElementsByClassName("container-fluid")[0].appendChild(btn);
}

function loadNewStyle(){
	
	var backupDiv = document.createElement('div');
	document.body.childNodes.forEach(function(entry) {
//	backupDiv.appendChild(entry);
	});

    //DISABLE mos css;
    var list= document.getElementsByTagName('link');
    for ( i=0; i<document.styleSheets.length; i++) {
        void(document.styleSheets.item(i).disabled=true);
    }


	// Clear body and load new html
	var newSide = document.createElement('iframe');
    newSide.setAttribute("id", "test");
	newSide.style = 'position: absolute; top: 0px; bottom: 0px;left: 0px;right: 0px;z-index: 9999;width: 100%;height: 100%;';
	document.body.appendChild(newSide);

var doc = document.getElementById('test').contentWindow.document;
doc.open();
doc.write(httpGet('https://localhost/newMoodle/index.html'));
doc.close();


//    setTimeout(loadjscssfile("https://localhost/newMoodle/js/jquery-3.2.1.min.js", "js"), 2000);
//    setTimeout(loadjscssfile("https://localhost/newMoodle/js/scripts.js", "js"), 5000);

//	setTimeout(loadjscssfile("https://localhost/newMoodle/js/knockout-3.4.2.js", "js"), 3000);
//    setTimeout(loadjscssfile("https://localhost/newMoodle/js/bootstrap.min.js", "js"), 3000);
   

    //css loading in html
  
}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}


// Search for Cookie if style is changed and set iframe as overlay