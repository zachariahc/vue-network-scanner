const si = require("systeminformation");
const wifi = require("node-wifi");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser());
app.use(cors());

/*
Available endpoints: 
http://localhost:3000/
http://localhost:3000/networkscanone
http://localhost:3000/networkscantwo
http://localhost:3000/currentconnection
http://localhost:3000/connect
*/
app.get("/", (req, res) => {
  res.send({ message: "Hello From Network Scanner Server" });
});

app.get("/networkscanone", async (req, res) => {
  let networkData = si
    .wifiNetworks()
    .then(data => {
      return data;
    })
    .catch(error => console.error(error));
  res.send(await networkData);
});

app.get("/networkscantwo", async (req, res) => {
  wifi.init({
    iface: null
  });

  const networkData = wifi
    .scan()
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));
  res.send(await networkData);
  res.end();
});

app.get("/currentconnection", async (req, res) => {
  wifi.init({
    iface: null
  });

  const currentConnection = wifi.getCurrentConnections().then(data => {
    return data;
  });
  res.send(await currentConnection);
  res.end();
});

app.post("/connect", async (req, res) => {
  if (!req.body.ssid && !req.body.password) {
    res.send({ message: "No SSID or Password" });
    return;
  } else if (!req.body.ssid) {
    res.send({ message: "No SSID" });
  } else if (!req.body.password) {
    res.send({ message: "No Password" });
  }
  wifi.init({
    iface: null
  });
  const connection = wifi
    .connect({ ssid: req.body.ssid, password: req.body.password })
    .then(data => {
      return { message: "Connection successful", data };
    })
    .catch(err => {
      return { message: "Sorry there was a problem connecting", err };
    });
  res.send(await connection);
  res.end();
});

app.listen(port, () => console.log(`Server on wayne ${port}!`));
