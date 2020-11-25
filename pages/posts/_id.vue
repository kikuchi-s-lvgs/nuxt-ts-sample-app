<template>
  <div>
    <button @click="$fetch">
      Refresh(fetch test)
    </button>
    <template v-if="$fetchState.pending">
      <content-placeholders>
        <content-placeholders-heading />
        <content-placeholders-text :lines="10" />
      </content-placeholders>
    </template>
    <template v-else-if="$fetchState.error">
      <h1>Post #{{ $route.params.id }} not found</h1>
    </template>
    <template v-else>
      <h1>【{{ post.title }}】</h1>
      <h3>{{ post.body }}</h3>
      by
      <n-link :to="{ name: 'users-id', params: { id: parseInt(user.id) } }">
        {{ user.username }}
      </n-link>
      <div>
        <h3>コメント一覧</h3>
        <ul>
          <li v-for="comment of comments" :key="comment.id">
            <n-link :to="`/comments/${comment.id}`">
              {{ comment.name }}
            </n-link>
          </li>
        </ul>
      </div>
      <p>
        <n-link
          :to="{
            name: 'posts-id',
            params: { id: parseInt(post.id) + 1 }
          }"
        >
          次の投稿へ
        </n-link>
      </p>
    </template>
    <p>
      <n-link to="/">
        Homeへ
      </n-link>
    </p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  useFetch,
  useContext
} from "@nuxtjs/composition-api";

export default defineComponent({
  setup(_, { root }) {
    const post = ref();
    const user = ref();
    const comments = ref([]);
    const { params } = root.$route;
    useFetch(async () => {
      post.value = await root.$axios
        .get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
        .then((res: any) => {
          return res.data;
        });
      user.value = await root.$axios
        .get(`https://jsonplaceholder.typicode.com/users/${post.value.userId}`)
        .then((res: any) => {
          return res.data;
        });
      comments.value = await root.$axios
        .get(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`)
        .then((res: any) => {
          return res.data;
        });
    });

    return {
      post,
      user,
      comments
    };
  }
});
</script>
