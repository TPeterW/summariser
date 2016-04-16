document.getElementById('files').addEventListener('change', handleFileSelect, false);
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', dropWrap, false);


function handleFileSelect(evt) {
    var f;
    var reader = new FileReader();
    
    document.getElementById("file-info").innerHTML=evt.target.files[0].name;
    
    reader.onloadend = (function(file) {
        
        var url = "/upload_pdf/";
        var method = "POST";
        
        var request = new XMLHttpRequest();
        
        request.onload = function() {
            var status = request.status;
            var data = request.responseText;
            
            // TODO: response
        }
        
        request.open(method, url, true);
        request.setRequestHeader("Content-Type", "application/pdf;charset=UTF-8");
        
        request.send(file);
        
    })(f);
    
    if (evt.stopPropagation) {
        evt.stopPropagation();
        evt.preventDefault();
        f = evt.target.files[0];
        reader.readAsDataURL(f);
    } else {
        reader.onloadend(evt);
    }
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function dropWrap(evt){
    var file = evt.dataTransfer.files[0];
    evt.target = {};
    evt.target.files = [];
    evt.target.files.push(file);
    handleFileSelect(evt);
}