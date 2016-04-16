function changeText(evt) {
    document.getElementById('file-info').innerHTML = evt.target.files[0].name;
}

function onSubmit(evt) {
    evt.stopPropagation();
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
        alert("Happening...");
        $.post($(this).attr('action'), $(this).serialize(), function(json) {
            console.log(json);
        }, 'json');
        return false;
    });
});