<template>
  <div>
    <el-form v-bind:rules="rules" ref="loginForm" v-bind:model="loginForm" class="loginContainer">
      <h3 class="loginTitle">VHR</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="test" v-model="loginForm.username" autocomplete="off" placeholder="do it!"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"
                  aria-placeholder="do it now!"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember"></el-checkbox>
      <el-button type="primary" style="width: 100%" class="loginButton" v-on:click="submitLogin">log in</el-button>
    </el-form>
  </div>

</template>

<script>
import {postKeyValueRequest} from "../utils/api";
export default {
  name: "Login",
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          postKeyValueRequest('/doLogin', this.loginForm).then(value => {
            if (value) {
              alert(JSON.stringify(value))
            }
          })
        } else {
          console.log('error submit!!');
          this.$message.error("Please input all field!")
          return false;
        }
      });
    }
  },
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123'
      },
      checked: false,
      rules: {
        username: [{required: true, message: "请输入用户名！", trigger: "blur"}],
        password: [{required: true, message: "Please input password！", trigger: "blur"}]
      }
    }
  }
}
</script>

<style scoped>
.loginContainer {
  border-radius: 15px;
  background-clip: content-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: white;
  border: 1px solid #b0b0b0;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 15px auto 40px auto;
  text-align: center;
  color: black;
}

.loginRemember {
  text-align: left;
  margin: 0 0 15px 0;
}

.loginButton {
  margin: 0 0 10px 0;
}
</style>
