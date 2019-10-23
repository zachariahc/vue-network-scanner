<template>
  <div class="home">
    <HeaderBar
      v-for="current in currentConnData"
      :key="current.id"
      title="Network Scanner"
      :currentSsid="current.ssid"
      :currentBssid="current.bssid"
      :currentSecurity="current.security"
      :currentSignalLevel="current.signal_level"
      :currentChannel="current.channel"
    />
    <NetworkInformation />
  </div>
</template>

<script>
// import dog from '../../utils'
import NetworkInformation from "@/components/NetworkInformation.vue";
import HeaderBar from "@/components/HeaderBar.vue";

export default {
  name: "home",
  components: {
    NetworkInformation,
    HeaderBar
  },
  data() {
    return {
      currentConnData: []
    };
  },
  methods: {
    async currentNetwork() {
      try {
        const response = await fetch("http://localhost:3000/currentconnection");
        const data = await response.json();
        this.currentConnData = data;
      } catch (err) {
        console.error(err);
      }
    }
  },
  mounted() {
    this.currentNetwork();
  }
};
</script>
