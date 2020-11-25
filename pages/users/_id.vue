<template>
  <div>
    <h1>ユーザー詳細</h1>
    <template v-if="$fetchState.pending">
      <content-placeholders>
        <content-placeholders-text :lines="10" />
      </content-placeholders>
    </template>
    <template v-else-if="$fetchState.error">
      <p>Error while fetching user: {{ $fetchState.error.message }}</p>
    </template>
    <template v-else>
      <ul>
        <li>Name: {{ state.user.name }}</li>
        <li>User Name: {{ state.user.username }}</li>
        <li>Email: {{ state.user.email }}</li>
        <li>Address: {{ state.user.address.city }}</li>
        <li>Phone: {{ state.user.phone }}</li>
        <li>Company: {{ state.user.company.name }}</li>
      </ul>
      <n-link :to="`/users`">
        ユーザーリストへ
      </n-link>
      <n-link :to="`/`">
        Homeへ
      </n-link>
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

export default defineComponent({
  setup(_, { root }) {
    const state = reactive({
      user: {}
    });
    const { params } = root.$route;

    const { fetch, fetchState } = useFetch(async () => {
      state.user = await root.$axios
        .get(`https://jsonplaceholder.typicode.com/users/${params.id}`)
        .then((res: any) => {
          return res.data;
        });
    });

    return {
      state
    };
  }
});
</script>
