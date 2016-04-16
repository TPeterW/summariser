function changeText(evt) {
    document.getElementById('file-info').innerHTML = evt.target.files[0].name;
    onSubmit(evt);
}

function onSubmit(evt) {
    // Turn on animation
    document.getElementById('drop_zone').style.display = "none";
    document.getElementById('loading').style.display = "flex";
    
    var file = evt.target.files[0];
    var xhr = new XMLHttpRequest();
    var formData = new FormData();

    xhr.addEventListener("onload",function(res){
        
    });
    
    xhr.onreadystatechange = function(e) {
        if ( 4 == this.readyState ) {
            console.log(['xhr upload complete', e]);
            console.log(e.target.response);
            document.getElementById('drop_box').style.display = "none";
            document.getElementById('loading').style.display = "none";
            document.getElementById('browse').style.display = "none";
            
            // display information now
            displayInfo(e.target.response);
        }
    };
    xhr.open('post', "upload_pdf", true);
    formData.append("pdf", file);
    xhr.send(formData);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function dropWrap(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];
    evt.target = {};
    evt.target.files = [];
    evt.target.files.push(file);
    changeText(evt);
}

function displayInfo(response) {
    document.getElementById('statistics').style.display = "";
    
    var sum = document.getElementById('summary');
    var stat = document.getElementById('stats');
    
    var jsonObj = JSON.parse(response);
    
    sum.innerHTML += "Summary: \n\n<small>" + jsonObj['LsaSummary'] + "</small>\n\n\n";
    
    stat.innerHTML += "<div class=\"panel panel-default\"><div class=\"panel-heading\">Word Count</div><div class=\"panel-body\"><p>" + jsonObj['wordCount'] + "</p></div></div><br><br>";
    
    var links = jsonObj['wikiLinks'];
    console.log("links: " + links);
    console.log("keywords: " + jsonObj['keywords']);
    
    jsonObj.keywords.forEach(function(keyword) {
        stat.innerHTML += "<div class=\"panel panel-default\"><div class=\"panel-heading\">" + keyword + "</div><div class=\"panel-body\"><p><a href=\"" + links[keyword] + "\" target=\"_blank\">" + links[keyword] + "</a></p></div></div><br><br>";
    })
}

document.getElementById('files').addEventListener('change', changeText, false);

var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', dropWrap, false);

$(function() {
    $('form[name=pdf]').submit(function() {
        onSubmit();
        return false;
    });
});
