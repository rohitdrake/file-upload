const express = require('express');
const formidable  = require('formidable');

const app = express();
app.set('port', (process.env.PORT||3000));
app.listen(app.get('port'), ()=>{
  console.log("server is listening at "+app.get('port') );
});

app.use('/',express.static(__dirname+'/public'));

app.post('/uploads', (req, res)=>{
  let form = new formidable.IncomingForm();
  form.uploadDir = process.cwd();
  let name, size;
  form
  .on("file", (field, File)=>{
    req.FILE=File;
     name=File.name;
     size=File.size;
  })
  .on("end",  ()=>{
     res.send({name, size});
     return;
  })
  .parse(req);
});
