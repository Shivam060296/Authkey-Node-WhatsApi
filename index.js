//NODE MODULES
const express = require('express');
const cors = require('cors');
const app = express();

//CORS:OPTIONAL
const corsOptions = {
  origin: '*',
  credentials: false
};

app.use(cors(corsOptions));

//FOR SENDING JSON DATA
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API ROUTE
const apiRoutes = require('./modules/api');

app.use('/authkey-message', apiRoutes);

//SERVER PORTS
const PORT = 1091;
const STATIC_IP = '0.0.0.0';

app.listen(PORT, STATIC_IP, () => {
  console.log(`Server is running on http://${STATIC_IP}:${PORT}`);
});