<template>
  <div>
    <h1>ユーザーリスト</h1>
    <template v-if="$fetchState.pending">
      <content-placeholders>
        <content-placeholders-text :lines="10" />
      </content-placeholders>
    </template>
    <template v-else-if="$fetchState.error">
      <p>Error while fetching users: {{ $fetchState.error.message }}</p>
    </template>
    <template v-else>
      <ul>
        <li v-for="user of state.users" :key="user.id">
          <n-link :to="`/users/${user.id}`">
            {{ user.username }}
          </n-link>
        </li>
      </ul>
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
      users: []
    });

    const { fetch, fetchState } = useFetch(async () => {
      state.users = await root.$axios
        .get("https://jsonplaceholder.typicode.com/users/")
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
