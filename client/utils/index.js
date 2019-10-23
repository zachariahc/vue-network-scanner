let wifi = require('node-wifi');

const dog = () => {
            wifi.init({
            iface: null // network interface, choose a random wifi interface if set to null
          });
           
          // Scan networks
         const networkData =  wifi.scan()
         .then(data => {
             return data
         })
         .catch(err => console.error(err))

   
}

export default dog

// module.exports = dog