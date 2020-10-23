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
        <UserItemCard
          :id="itemUser.id"
          :name="itemUser.name"
          :email="itemUser.email"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserItemCard from "@/components/UserItemCard";
export default {
  name: "UsersList",
  components: { UserItemCard },
  computed: {
    ...mapState(["usersList", "userListLoading"])
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
