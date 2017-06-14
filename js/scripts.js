
/* swap open/close side menu icons */
$('[data-toggle=collapse]').click(function(){
  	// toggle icon
  	$(this).find("i").toggleClass("glyphicon-chevron-right glyphicon-chevron-down");
});

/*
function getCourses(){
	var moodle =  $('#page', window.parent.document);
	var couse = $('.course_list', top.document);
	console.warn(couse);
	$('.usertext', window.parent.document).text;
}*/

// knockout load course_list
function AppViewModel() {
    this.username = $("span.usertext", top.document).text();
	var couse = ko.observableArray([]);
	var couse1 = $('.coursebox', top.document);
	//console.warn(couse1);
	couse1.children().each(function() {
		var title = $(this).find('a');
		if(title.text() != ""){
			var task = $(this).find('.activity_overview');
			var data = {"header": "<h4>"+title.text()+"</h4></a>",
						"content": searchForContent(title.attr('href')),
						"task": task.html()
						};
			couse.push(data);
		}
		
	}, this);
	
	this.couses = couse;
    this.lastName = "Bertin";
}
// Activates knockout.js
$( document ).ready( function() {
	ko.applyBindings(new AppViewModel());
	// now update the moodle style
	//remove change button | remove accesshide text
	$("#changeStyle").remove();
	$(".accesshide").remove();
	$("#loadingAnimation").remove();
	//remove buggy list style
	$(".topics").css("list-style", "none");
	$(".left.side").remove();
	var selection = $(".section .img-text");
	selection.css("list-style","none");
	selection.css("padding-left","0px");
	var containerDesc= $(".contentafterlink");
	containerDesc.css("margin-top","15px");
	containerDesc.css("margin-bottom","25px");
	// add new icons
	var iconsActivity = $('.iconlarge.activityicon');
	iconsActivity.each(function(){
			var parent = $(this).parent();
			parent.css("cursor","pointer");
			var text = parent.find("span").text();
			var css = "";
			var href = $(this).attr('src');
			if(href.includes('forum')){
				css = "glyphicon glyphicon-comment text-success";
			}else if(href.includes('archive')){
				css = "glyphicon glyphicon-compressed text-muted";
			}else if(href.includes('pdf')){
				css = "glyphicon glyphicon-file text-danger";
			}else if(href.includes('sourcecode')){
				css = "glyphicon glyphicon-cog text-muted";
			}else if(href.includes('folder')){
				css = "glyphicon glyphicon-folder-open text-danger";
			}
			parent.children().remove();
			parent.append("<span><i class='"+css+"'></i> "+text+"</span>");
		}
	)
	// remove a href from h3 content  !! dont remove from ankündigungen but load it to new tab <---
	//$(".content").find('a').removeAttr("href");
});


/* LOAD CONTENT JS with button click */
function searchForContent(url){
	var content = {};
	var html = httpGet(url);
	var an = html.search('<section id="region-main"');
	//console.warn(an);
	html = html.substr(an,html.length);
	html = html.replace('class="span8 pull-right"');
	var end = html.search('</section>');
	html = html.substr(0,end);
	html = html+"</section>";
	//console.warn();
	return html;
}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function FindAndCountDiv(html){
	
}