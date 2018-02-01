#! /usr/local/bin/node
var shell = require('shelljs')

shell.exec('rm -rf ./prod')
shell.exec('mkdir prod')
shell.exec('cp web-static/* prod/')

shell.exec('yarn webpack --config webpack.prod.js')

shell.exec('aws s3 sync prod/ s3://tokens-not-cat/ --acl public-read --profile tokens --region us-west-2')