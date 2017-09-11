// knockout load course_list
function AppViewModel() {
    this.username = $("span.usertext", top.document).text();
	this.logout = getLogout();
	var couse = ko.observableArray([]);
	var couse1 = $('.coursebox', top.document);
	//console.warn(couse1);
	couse1.children().each(function() {
		var title = $(this).find('a');
		if(title === undefined){
			return;
		}
		if(title.text() != "" && title.attr('href') != "#"){
			
			var task = $(this).find('.activity_overview');
			var data = {"header": "<h4>"+title.text() +"</h4></a>",
						"content": searchForContent(title.attr('href')),
						"href": title.attr('href')
						};
			couse.push(data);
		}
	}, this);
	saveCouses(couse);
	this.couses = couse;
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
			}else if(href.includes('powerpoint')){
				css = "glyphicon glyphicon-blackboard text-danger";
			}else if(href.includes('document')){
				css = "glyphicon glyphicon-duplicate text-primary";
			}else if(href.includes('icon')){
				css = "glyphicon glyphicon-wrench text-muted";
			}else if(href.includes('pdf')){
				css = "glyphicon glyphicon-file text-danger";
			}else if(href.includes('sourcecode')){
				css = "glyphicon glyphicon-cog text-muted";
			}else if(href.includes('1497445414')){
				css = "glyphicon glyphicon-folder-open text-warning";
				var link = parent.attr('href');
				parent.attr('onClick','downloadFolder("'+link+'","'+text+'")');
				parent.removeAttr("href");
			}
			parent.children().remove();
			parent.append("<span><i class='"+css+"'></i> "+text+"</span>");
		}
	)

	/* swap open/close side menu icons */
	$('[data-toggle=collapse]').click(function(){
		// toggle icon
		$(this).find("i").toggleClass("glyphicon-chevron-right glyphicon-chevron-down");
	});
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
function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function downloadFolder(url, name){
	var place = url.search("id");
	var idFromUrl = url.substr(place+3,url.length)
	var formData = {id: idFromUrl};
	$.ajax({
    url : "https://moodle.mosbach.dhbw.de/mod/folder/download_folder.php",
    type: "POST",
    data : formData,
	xhrFields: {
    	responseType: 'blob'
  	},
    success: function(blob){
            a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            // Give filename you wish to download
            a.download = name+".zip";
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
			a.remove();
		
        //console.warn("t:" + textStatus);
    },
    error: function (textStatus){
		console.warn(textStatus);
	}
	});
}
function getLogout(){
	var searchlogout = $(".logininfo",top.document).find("a");
	searchlogout.children().each(function(){
		var elem = $(this);
		if(elem.attr("href").includes("logout")){
			return elem.attr("href");
		}
	});
}
function saveCouses(couse){
	var data = {COURSES: couse};
    localStorage.setItem("DATA", JSON.stringify(data));
}
function fetchCouses(){
	this.couses.forEach(function(element) {
		element.content = searchForContent(element.href);
	}, this);
}