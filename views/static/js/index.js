function handleFileSelect(evt) {
    var f;
    var reader = new FileReader();
    
    var file = evt.target.files[0];
    
    document.getElementById("file-info").innerHTML=file.name;
    
    reader.onloadend = function(file) {
        
        var url = "/upload_pdf/",
            method = "POST",
            request = new XMLHttpRequest();
        
        request.onload = function() {
            var status = request.status;
            var data = request.responseText;
            
            // TODO: response
        }
        
        request.open(method, url, true);
        request.setRequestHeader("Content-Type", "application/pdf;charset=UTF-8");
        
        console.log(evt.target.files[0]);
        
//        request.send({'body':evt.target.files[0]});
        request.send({pdf:evt.target.files[0]});
        
    };
    
    if (evt.stopPropagation) {
        evt.stopPropagation();
        evt.preventDefault();
        f = file;
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

function dropWrap(evt) {
    var file = evt.dataTransfer.files[0];
    evt.target = {};
    evt.target.files = [];
    evt.target.files.push(file);
    handleFileSelect(evt);
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', dropWrap, false);