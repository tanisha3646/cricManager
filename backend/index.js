const express = require('express');

var cors = require('cors')
const app = express()

app.use(cors())
const port = 5001

app.use(express.json());

// available routes
app.use('/api/team', require('./routes/Team'));
app.use('/api/user', require('./routes/Users'));

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`)
})