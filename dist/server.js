var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname));
app.get('/.well-known/acme-challenge/:content', function(req, res) {
  res.send('ueBUqEao6r5W90kS2jTvOOMk4kjYdrV_pjBCDdxfuBw.Vf0hm5biDb_O0X6nZjmsPin5O_8GdOhK5ynsw30TBsQ')
})
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);
