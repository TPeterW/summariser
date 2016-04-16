function changeText(evt) {
    document.getElementById('file-info').innerHTML = evt.target.files[0].name;
    onSubmit(evt);
}

function onSubmit(evt) {


  var file =  evt.target.files[0];
  var xhr = new XMLHttpRequest();
  var formData = new FormData();

  xhr.addEventListener("onload",function(res){
  });
  xhr.onreadystatechange = function(e) {
                if ( 4 == this.readyState ) {
                    console.log(['xhr upload complete', e]);
                    console.log(e.srcElement.response);
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

document.getElementById('files').addEventListener('change', changeText, false);
var upload = document.getElementById('upload');
upload.addEventListener('click', onSubmit, true);

var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', dropWrap, false);

$(function() {
    $('form[name=pdf]').submit(function() {
        //alert("Happening...");

        onSubmit();
        return false;
    });
});
