<template>
  <div>
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay">
          <div class="modal">
            <p class="close-modal-x" @click="closeModal">X</p>
            <h3>You are attempting to connect to:</h3>
            <h4>{{selectedNetwork.ssid}}</h4>
            <span v-if="selectedNetwork.security[0]">
              <p>Please enter a password and click connect</p>
              <div class="password-input">
                <input v-model="password" :type="inputType" @keyup="capturePassword" />
                <i
                  :class="{'far fa-eye-slash': !showPass, 'far fa-eye' : showPass}"
                  @click="showPassword"
                ></i>
              </div>
              <SmallLoader class="small-loader-position" v-if="showSmallLoader" />
            </span>
            <button @click="connectToNetwork" class="connect-button">Connect</button>
            <p class="error-message">{{ errorMessage }}</p>
            {{connectionRes.message}}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SmallLoader from "./SmallLoader.vue";
export default {
  props: {
    isOpen: {
      type: Boolean
    },
    selectedNetwork: {
      type: Object
    }
  },
  components: {
    SmallLoader
  },
  data() {
    return {
      ssid: "",
      password: "",
      errorMessage: "",
      connectionRes: {},
      showPass: false,
      inputType: "password",
      showSmallLoader: false
    };
  },
  methods: {
    showPassword() {
      if (this.showPass === false) {
        this.showPass = true;
        this.inputType = "text";
      } else {
        this.showPass = false;
        this.inputType = "password";
      }
    },
    closeModal(value) {
      console.log(value);
      this.$emit("closedFromModal");
      this.password = "";
    },
    capturePassword(e) {
      this.password = e.target.value;
    },
    async connectToNetwork() {
      if (this.password === "") {
        this.errorMessage = "Must include a password";
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
        return;
      }
      if(this.showPass === true){
            this.showPassword()
      }
      this.showSmallLoader = true;

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
        .then(res => res.json())
        .then(resJson => {
          this.connectionRes = resJson;
          if (resJson.message === "Connection successful") {
            this.showSmallLoader = false;
            this.connectionRes = "";
            this.closeModal({ successMessage: resJson.message });
          }
        })
        .catch(error => console.log(error));
    }
  },
  calculated: {
    connectionMessage: function() {
      return this.connectionRes;
    }
  },
  mounted() {
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
.password-input {
  margin-left: 25px;
}
.password-input > i {
  margin-left: 10px;
  cursor: pointer;
}
.password-input > i:hover {
  opacity: 0.75;
}
.small-loader-position {
  margin: 0 auto;
  margin-top: 10px;
}
.close-modal-x {
  float: right;
  margin-top: 10px;
  cursor: pointer;
}
</style>