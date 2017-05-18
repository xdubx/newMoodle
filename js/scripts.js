
/* swap open/close side menu icons */
$('[data-toggle=collapse]').click(function(){
  	// toggle icon
  	$(this).find("i").toggleClass("glyphicon-chevron-right glyphicon-chevron-down");
});

/*
function getCourses(){
	var moodle =  $('#page', window.parent.document);
	var couse = $('.course_list', window.parent.document);
	console.warn(couse);
	$('.usertext', window.parent.document).text;
}*/

// knockout load course_list
function AppViewModel() {
    this.username = $("span.usertext", top.document).text();
    this.lastName = "Bertington";
}
// Activates knockout.js
$( document ).ready( function() {
	ko.applyBindings(new AppViewModel());
});


/* LOAD CONTENT JS with button click */

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}