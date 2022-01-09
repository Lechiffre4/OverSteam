require('dotenv').config();

const secret = process.env.WEBHOOK_SECRET;
const repo = process.env.WEBHOOK_REPO;

const http = require('http')
const crypto = require('crypto')
const exec = require('child_process').exec

http.createServer(function (req, res) {
  req.on('data', function (chunk) {
    let signature = crypto.createHmac('sha1', secret).update(chunk).digest('hex')

    if (req.headers['x-hub-signature'] === 'sha1=' + signature) {
      exec('cd ' + repo + ' && git pull', (err, stdout, stderr) => {
        if (err) {
          console.log(err)
        }
        console.log(stdout)
      })
    }
  })

  res.end();
}).listen(3000);