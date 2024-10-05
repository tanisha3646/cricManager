const express = require('express');
const path = require('path');
var cors = require('cors')
const app = express()

app.use(cors())
const port = 5001

app.use(express.json());

app.use('/api/team', require('./routes/Team'));
app.use('/api/user', require('./routes/Users'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.listen(port, '0.0.0.0', () => {
  console.log(`iNoteBook backend listening on port ${port}`)
})