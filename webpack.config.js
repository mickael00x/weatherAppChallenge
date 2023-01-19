// webpack.config.js
import { DefinePlugin } from 'webpack'
require('dotenv').config()

const Dotenv = require('dotenv-webpack');
require('dotenv').config({ path: './.env' }); 

module.exports = {
  plugins: [
    new DefinePlugin({
        'process.env': JSON.stringify(Dotenv.config().parsed)
      })
  ]
  
};