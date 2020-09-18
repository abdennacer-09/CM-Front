const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy:{
            '/':{
                target: 'http://backend.storeino.info'
                //target: 'http://localhost:5000'
                //var url ='localhost:5000';
                //var url ='backend.storeino.info'
            }
        }
    }
};