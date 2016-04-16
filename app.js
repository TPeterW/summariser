var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

// var pdfUtil = require('pdf-to-text');
var pdf_path = __dirname +"/pdfs/";
var PythonShell = require('python-shell');
var multer  = require('multer');
var upload = multer({ dest: 'pdfs/' });



var tmp = require('tmp');
const fs = require('fs');
var num_sentences = 10;


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/home.html",function(req,res){
  res.sendFile(path + "home.html");
});

app.use(express.static(__dirname + '/views/static'));

app.use("/",router);

app.post("/upload_pdf", upload.single('pdf'), function(req,res){

  // PythonShell.run('convert.py', function (err) {
  //   if (err) throw err;
  //   console.log('finished');
  // });

  // fs.readFile(req.files.pdf.path, function (err, data) {
  //   // ...
  //   var newPath = __dirname + "pdfs/";
  //   fs.writeFile(newPath, data, function (err) {
  //     //res.redirect("back");
  //     });
  // });

  console.log(req.file);

    var options = {
      mode: 'text',
      args: [req.file.path]

    };

    PythonShell.run('convert.py', options, function (err, results) {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      var text = results.join("\n");
      var tmpobj = tmp.fileSync();
      // console.log("File: ", tmpobj.name);
      // console.log("Filedescriptor: ", tmpobj.fd);
      var filename = tmpobj.name;
      fs.writeFile(filename, text, function(err) {
        if(err) throw err;
        //rename
        var summarizeOptions = {
          mode: 'text',
          args: [filename, num_sentences]
        };

        PythonShell.run('summarize.py', summarizeOptions, function (err, results) {
          if (err) throw err;
          var summaryString = results.join("\n");
          var summary = {
            "summary":summaryString
          };
          res.send(summary);
          //string
          //turn into json
          //respond to req
          //res.send json object
        });
      });
    });
  //pyshell.run();
});


app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});



app.listen(3000,function(){
  console.log("Live at Port 3000");
});