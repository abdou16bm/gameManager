const express = require('express');
const fs = require('fs');
const api = express.Router();

const doc_controller = require("../../admin_app/controller/doc")

api.get('/client/:id/*',doc_controller.doc_read);

module.exports = api;
