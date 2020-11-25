<template>
  <div>
    <h2>ログイン</h2>
    <p>UserName</p>
    <input v-model="state.mail" name="username" type="text" />
    <p>password</p>
    <input v-model="state.pass" name="password" type="password" />
    <div>
      <button class="login" @click="login">ログイン</button>
    </div>
    <hr />
    <div>
      <button @click="googleLogin">Googleログイン</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@nuxtjs/composition-api";
import firebase, { auth } from "../../plugins/firebase";

export default defineComponent({
  setup(_props, { root }) {
    const state = reactive({
      mail: "",
      pass: ""
    });
    const login = () => {
      auth
        .signInWithEmailAndPassword(state.mail, state.pass)
        .then(user => root.$router.push("/"))
        .catch(e => console.error(e));
    };
    const googleLogin = () => {
      auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(user => root.$router.push("/"))
        .catch(e => console.error(e));
    };
    return { state, login, googleLogin };
  }
});
</script>
<style scoped>
button {
  margin: 1rem 0;
  background-color: rgb(85, 195, 238);
  color: white;
}
</style>
