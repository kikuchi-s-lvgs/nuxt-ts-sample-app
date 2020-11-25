<template>
  <div>
    <template v-if="$fetchState.pending">
      <content-placeholders>
        <content-placeholders-heading />
        <content-placeholders-text :lines="10" />
      </content-placeholders>
    </template>
    <template v-else-if="$fetchState.error">
      <h1>Comments #{{ $route.params.id }} not found</h1>
    </template>
    <template v-else>
      <h1>コメント</h1>
      <h2>{{ comment.name }}</h2>
      <pre>{{ comment.body }}</pre>
      <h4>by {{ comment.email }}</h4>
      <p>
        <n-link :to="`/posts/${comment.postId}`">
          投稿詳細へ
        </n-link>
        <n-link to="/">
          Homeへ
        </n-link>
      </p>
    </template>
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
    const comment = ref();
    const { params } = root.$route;
    useFetch(async () => {
      comment.value = await root.$axios
        .get(`https://jsonplaceholder.typicode.com/comments/${params.id}`)
        .then((res: any) => {
          return res.data;
        });
    });

    return {
      comment
    };
  }
});
</script>
