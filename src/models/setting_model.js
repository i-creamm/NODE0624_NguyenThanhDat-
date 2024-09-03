const { Schema, model } = require('mongoose');

const ConnectionDocument = 'settings'
const ModelDocument = 'setting'


const SettingSchema = new Schema({
    name: String
  }, {
      collection : ConnectionDocument, 
      timestamps: true,
  });

  

  module.exports = model(ModelDocument, SettingSchema)









