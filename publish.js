const http = require('http');
const fs = require('fs');

fs.stat('./sample.html', (err, stats) => {
  let request = http.request({
    hostname: "127.0.0.1",
    port: 8082,
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  }, response => {
    console.log('response', response);
  });
  
  const file = fs.createReadStream('./sample.html');
  
  file.pipe(request); // 快捷处理方式
  
  file.on('end', () => request.end());
})



// file.on('data', chunk => { // 先把文件打开，然后写进request流里面
//   console.log('data chunk', chunk.toString());
//   request.write(chunk);
// })
// file.on('end', chunk => {
//   console.log('read finished');
//   request.end(chunk);
// })