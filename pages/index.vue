<template>
  <div>
    <h1>Posts List</h1>
    <template v-if="$fetchState.pending">
      <content-placeholders>
        <content-placeholders-text :lines="100" />
      </content-placeholders>
    </template>
    <template v-else-if="$fetchState.error">
      <p>Error while fetching posts: {{ $fetchState.error.message }}</p>
    </template>
    <template v-else>
      <ul>
        <li v-for="post of state.posts" :key="post.id">
          <n-link :to="`/posts/${post.id}`">
            {{ post.title }}
          </n-link>
        </li>
      </ul>
      <n-link :to="`/users`">
        ユーザーリストへ
      </n-link>
      <div>
        <button @click="logout">ログアウト</button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useFetch,
  useContext,
  computed
} from "@nuxtjs/composition-api";
import { auth } from "../plugins/firebase";

export default defineComponent({
  setup(_, { root }) {
    const state = reactive({
      posts: []
    });

    const { fetch, fetchState } = useFetch(async () => {
      state.posts = await root.$axios
        .get("https://jsonplaceholder.typicode.com/posts/")
        .then((res: any) => {
          return res.data;
        });
    });

    const logout = () => {
      auth.signOut();
      root.$router.push("/login");
    };

    return {
      state,
      logout
    };
  }
});
</script>
<style scoped>
button {
  margin: 1rem 0;
  background-color: rgb(238, 85, 113);
  color: white;
}
</style>