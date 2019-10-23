<template>
  <div>
    <button class="refresh-button" v-if="showButton" @click="closestNetworks">Try Again</button>
    <Loader v-if="!loaded || networks.length === 0" class="loader-position" />
    <table v-if="loaded && networks.length > 0" >
      <thead v-if="networks.length !== 0">
        <tr>
          <th>SSID</th>
          <th>BSSID</th>
          <th>Channel</th>
          <th>Security</th>
        </tr>
      </thead>
      <tbody>
        <tr 
        class="network-row"
        v-for="network in networks" 
        :key="network.id" 
        @click="getNetworkValues(network)">
          <td><DataColumn :list="network.ssid" /></td>
          <td><DataColumn :list="network.bssid" /></td>
          <td><DataColumn :list="network.channel.toString()" /></td>
          <td><DataColumn :list="network.security[0]" /></td>
        </tr>
      </tbody>
    </table>

    <Modal 
    :isOpen="openModal" 
    :selectedNetwork="selectedNetwork"
    @closedFromModal="closeModal"
     />

  </div>
</template>

<script>
// import wifi from "node-wifi";
// import si from "systeminformation";
import Modal from "./Modal.vue";
import DataColumn from "./DataColumn.vue";
import Loader from "./Loader.vue";
export default {
  components: {
    DataColumn,
    Loader,
    Modal
  },
  data() {
    return {
      networks: [],
      loaded: false,
      selectedNetwork: {},
      openModal: false,
      showButton: false
    };
  },
  computed: {
    showButton: function(){

      // const check = setTimeout(() => {
      //   return 'Hello'
      // }, 3000)
      // console.log(check)
      const networkCheck = this.networks.length > 0 ? true : false
      return networkCheck
    }
  },
  methods: {
        closeModal(value) {
          this.openModal = false
    },
    async closestNetworks() {
    
      try {
        const response = await fetch("http://localhost:3000/networkscanone");
        const data = await response.json();
        this.networks = data;
        this.loaded = true;
        this.networks.length > 0 ? this.showButton = false : this.showButton= true
      } catch (err) {
        console.error(err);
      }
    },
getNetworkValues(network){
  this.selectedNetwork = network
  this.openModal = true
}
  },
  mounted() {
    this.closestNetworks();
  }
};
</script>

<style scoped>
table {
  border: 1px solid rgb(85, 85, 85);
  background-color: rgba(65, 64, 64, .5);
  border-radius: 10px;
  width: 100%;
  color: white;
}
tr > th {
  color: white;
  width: 25%;
}
.loader-position {
  margin: 0 auto;
}
.network-row:hover {
  background-color: rgba(47, 75, 109, 0.5);
  cursor: pointer;
}
.refresh-button {
  cursor: pointer;
  padding: 7px;
  margin: 10px;
  margin-top: 10px;
  background-color: rgb(206, 82, 0);
  color: white;
  font-size: 1.1rem;
}
.refresh-button:hover {
  opacity: .75;
}
</style>
