<template>
  <div class="users">
    <h1 class="users__title">Список пользователей:</h1>
    <div v-if="userListLoading" class="users__loading">...Загрузка</div>
    <div v-else class="users-list">
      <router-link
        v-for="itemUser of usersList"
        :key="itemUser.id"
        tag="div"
        class="users-list__item"
        :to="`user/${itemUser.id}`"
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
import { mapState } from 'vuex'
import UserItemCard from '@/components/UserItemCard'
export default {
  name: 'UsersList',
  components: { UserItemCard },
  computed: {
    ...mapState(['usersList', 'userListLoading']),
  },
}
</script>

<style lang="less">
.users {
  padding: 16px;
  &__title {
    font-size: 20px;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    @media only screen and (max-width: 1200px) {
      width: 100%;
    }
    &__item {
      width: calc(50% - 8px);
      margin-right: 16px;
      margin-bottom: 16px;
      &:nth-child(2n) {
        margin-right: 0;
      }
      @media only screen and (max-width: 768px) {
        width: 100%;
        margin-right: 0;
      }
    }
  }
  &__loading {
    text-align: center;
  }
}
</style>
