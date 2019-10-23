const si = require('systeminformation');
const wifi = require('node-wifi')

const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/info', (req, res) => {

  res.send({ application: 'sample-app', version: '1' });

});

app.get('/api/system', async (req, res) => {

  // let networkData = si.wifiNetworks()
  // .then(data => { return data })
  // .catch(error => console.error(error));

  // res.send(await networkData)

  // console.log("This should be network data", await networkData)

  let cpuInfo =  si.cpu()
    .then(data => {
      return data
    })
    .catch(error => console.error(error));
    res.send(await cpuInfo)
    res.end()

});

app.get('/api/networkscanone', async(req, res) => {

  let networkData =  si.wifiNetworks()
   .then(data => {
       return data
   })
   .catch(error => console.error(error));
   console.log(await networkData)
   res.send(await networkData)
})

app.get('/api/networkscantwo', async (req, res) => {
  wifi.init({
     iface: null // network interface, choose a random wifi interface if set to null
   });
    
   // Scan networks
  const networkData =  wifi.scan()
  .then(data => {
      return data
  })
  .catch(err => console.error(err))
  console.log("Loggin /api/networkscantwo", await networkData)
   res.send(await networkData)
   res.end()
})


app.post('/api/v1/getback', (req, res) => {
  res.send({ ...req.body });
});
//app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);