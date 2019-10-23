<template>
  <div>
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay">
          <div class="modal">
            <h3>You are attempting to connect to:</h3>
            <h4>{{selectedNetwork.ssid}}</h4>
            <p>Please enter a password and click connect</p>
            <div>
              <input v-model="password" @keyup="capturePassword" />
            </div>
            <button @click="closeModal" class="cancel-button">{{ isOpen ? "Close" : "Open" }}</button>
            <button @click="connectToNetwork" class="connect-button">Connect</button>
            <p class="error-message">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    isOpen: {
      type: Boolean
    },
    selectedNetwork: {
      type: Object
    }
  },
  data() {
    return {
      ssid: "",
      password: "",
      errorMessage: "",
      connectionsRes: "",
    };
  },
  methods: {
    closeModal(value) {
      this.$emit("closedFromModal");
    },
    capturePassword(e) {
      this.password = e.target.value;
    },
    connectToNetwork() {
      if (this.password !== "") {
        return
      } else {
        this.errorMessage = "Must include a password";
      }

      fetch("http://localhost:3000/connect", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          ssid: this.ssid,
          password: this.password
        })
      })
        .then(response => response.json())
        .then(responseJson => this.connectionsRes = responseJson)
        .catch(error => console.log(error));

      this.password = "";
    }
  },
  mounted() {
    //   TODO: Use calculated value next
    this.ssid = this.selectedNetwork.ssid;
  },
  updated() {
    this.ssid = this.selectedNetwork.ssid;
  }
};
</script>

<style scoped>
.modal {
  width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}
.cancel-button {
  padding: 7px;
  margin: 10px;
  margin-top: 10px;
  background-color: rgb(206, 82, 0);
  color: white;
  font-size: 1.1rem;
}
.connect-button {
  padding: 7px;
  margin: 10px;
  margin-top: 10px;
  background-color: green;
  color: white;
  font-size: 1.1rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}
.error-message {
  color: red;
}
</style>