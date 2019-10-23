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
              <div class="input-container">
                <i
                  :class="{'far fa-eye-slash icon': !showPass, 'far fa-eye icon' : showPass}"
                  @click="showPassword"
                ></i>
                <input
                  class="input-field"
                  placeholder="password"
                  v-model="password"
                  :type="inputType"
                  @keyup="capturePassword"
                />
              </div>
            </span>
            <button @click="connectToNetwork" :class="{'btn-disabled': !password, 'btn' : password}" :disabled="password === ''">
              <SmallLoader class="small-loader-position" v-if="showSmallLoader" />
              <span v-else class>Connect</span>
            </button>
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
      this.$emit("closedFromModal");
      this.password = "";
      this.showPass = false;
      console.log(this.showPass);
    },
    capturePassword(e) {
      this.password = e.target.value;
    },
    async connectToNetwork() {
      if (this.password === "") {
        this.errorMessage = "Must include a password";
        this.showPass = false;
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
        return;
      }
      if (this.showPass === true) {
        this.showPassword();
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
          } else {
            this.showSmallLoader = false;
            setTimeout(() => {
              this.connectionRes = "";
            }, 3000);
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

.test-class:after {
  content: '\002B'
}

.btn {
  height: 50px;
  font-size: 15px;
  background-color: dodgerblue;
  color: white;
  padding: 7.5px;
  border: none;
  cursor: pointer;
  width: 50%;
  opacity: 0.9;
}
.btn-disabled {
  height: 50px;
  font-size: 15px;
  background-color: rgb(199, 197, 197);
  color: white;
  padding: 7.5px;
  width: 50%;
  opacity: 0.9;
}
.btn:hover {
  opacity: 0.8;
}
.input-container {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 15px;
}

.icon {
  cursor: pointer;
  padding: 10px;
  background: dodgerblue;
  color: white;
  min-width: 50px;
  text-align: center;
}
.input-field {
  width: 100%;
  padding: 10px;
  outline: none;
}

.modal {
  width: 500px;
  height: 300px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
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
.button-group {
  display: flex;
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
.small-loader-position {
  margin: 0 auto;
}
.close-modal-x {
  float: right;
  margin-top: 10px;
  cursor: pointer;
}
</style>