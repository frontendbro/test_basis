<template>
  <div class="user">
    <h1>Карточка сотрудника со списком задач</h1>
    <div>ID:&nbsp;{{ userInfo.id }}</div>
    <div>Name:&nbsp;{{ userInfo.name }}</div>
    <div>E-mail:&nbsp;{{ userInfo.email }}</div>
    <div>Phone:&nbsp;{{ userInfo.phone }}</div>

    <div v-if="tasksListLoading">...Загрузка</div>
    <div v-else class="tasks-list">
      <div class="tasks-list__item" v-for="task of tasksList" :key="task.id">
        <div>Id:&nbsp;{{ task.id }}</div>
        <div>Title:&nbsp;{{ task.title }}</div>
        <div>Status:&nbsp;{{ task.completed }}</div>
        <div>
          <div v-if="task.completed">Готово</div>
          <div v-else-if="!task.completed">В работе</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "User",
  data() {
    return {
      userId: this.$route.params.id
    };
  },
  methods: {
    ...mapActions(["GetTasksList"])
  },
  computed: {
    ...mapState(["usersList", "tasksList", "tasksListLoading"]),
    ...mapGetters(["getUserById"]),
    userInfo() {
      return this.getUserById(Number(this.userId));
    }
  },
  mounted() {
    this.GetTasksList(this.userId);
  }
};
</script>

<style lang="less" scoped>
h1 {
  margin: 0;
}
.user {
  padding: 16px;
}
.tasks-list {
  &__item {
    border: 1px solid #3e3e3e;
    border-radius: 3px;
    padding: 8px;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>
