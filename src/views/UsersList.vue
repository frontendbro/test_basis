<template>
  <div class="users">
    <h1>Список пользователей</h1>
    <div v-if="userListLoading" class="users__loading">...Загрузка</div>
    <div class="users-list" v-else>
      <router-link
        tag="div"
        class="users-list__item"
        :to="`user/${itemUser.id}`"
        v-for="itemUser of usersList"
        :key="itemUser.id"
      >
        <div>Id: {{ itemUser.id }}</div>
        <div>FullName: {{ itemUser.name }}</div>
        <div>E-mail: {{ itemUser.email }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "UsersList",
  components: {},
  computed: {
    ...mapState(["usersList", "userListLoading"])
  },
  methods: {
    ...mapActions(["GetUsersList"])
  },
  mounted() {
    this.GetUsersList();
  }
};
</script>

<style lang="less">
.users {
  padding: 16px;
  &-list {
    display: flex;
    flex-direction: column;
    &__item {
      width: 50%;
      padding: 16px;
      border-radius: 3px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      transition: 0.3s;
      background-color: #fff;
      &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
      }
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
  &__loading {
    text-align: center;
  }
}
</style>
