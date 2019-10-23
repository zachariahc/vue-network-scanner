<template>
  <div>
    <div class="header-info">
      <p>Current SSID: {{ currentSsid || 'No current connection'}}</p>
      <p>Current BSSID: {{ currentBssid || 'No current connection'}}</p>
      <p>Current Channel: {{ currentChannel || 'No current connection'}}</p>
      <p>Signal Level: {{ currentSignalLevel || 'No current connection'}}</p>
      <p>Security: {{ currentSecurity }}</p>
    </div>
    <h2 class="header-bar-heading">{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    currentSsid: {
      type: String
    },
    currentBssid: {
      type: String
    },
    currentSecurity: {
      type: String
    },
    currentSignalLevel: {
      type: Number
    },
    currentChannel: {
      type: Number
    }
  },
  mounted() {}
};
</script>

<style scoped>
.header-info {
  display: flex;
  border-radius: 5px;
  color: white;
  background-color: rgba(70, 70, 105, .5);
  justify-content: space-around;
  border: 1px solid rgb(85, 85, 85);
}
.header-bar-heading {
  color: white;
}
</style>
