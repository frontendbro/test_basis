<template>
  <div class="user">
    <h1>Карточка сотрудника со списком задач</h1>
    <div class="user-info">
      <div>ID:&nbsp;{{ userInfo.id }}</div>
      <div>Name:&nbsp;{{ userInfo.name }}</div>
      <div>E-mail:&nbsp;{{ userInfo.email }}</div>
      <div>Phone:&nbsp;{{ userInfo.phone }}</div>
    </div>
    <div class="filter">
      <div class="filter-search-field">
        <label>
          Поиск:
          <input
            class="filter-search-field__input"
            type="text"
            v-model="searchTxt"
          />
        </label>
        <svg
          class="filter-search-field__icon"
          width="15"
          height="14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.61761 10.0317C7.73155 10.6424 6.65754 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.65746 10.6425 7.73141 10.0318 8.61744L14.0011 12.5868L12.5869 14.001L8.61761 10.0317ZM9 5.5C9 7.433 7.433 9 5.5 9C3.567 9 2 7.433 2 5.5C2 3.567 3.567 2 5.5 2C7.433 2 9 3.567 9 5.5Z"
            fill="#00395C"
            fill-opacity=".8"
          />
        </svg>
      </div>
      <MyButton
        :on-click="clearSearchTxt"
        txt="Сбросить фильтр"
        color="#0078D2"
        txt-color="#fff"
      />
      <div class="filter-sort-field">
        <label>
          Сортировать по статусу:
          <input
            class="filter-sort-field__input"
            type="checkbox"
            v-model="sortTaskStatus"
          />
        </label>
      </div>
    </div>

    {{ importantTasksList }}

    <div v-if="tasksListLoading">...Загрузка</div>
    <div v-else-if="!tasksListFiltered.length">Пусто</div>
    <div v-else class="tasks-list">
      <!--      TODO: вынести в компонент-->
      <div
        class="tasks-list-item"
        v-for="task of tasksListFiltered"
        :key="task.id"
        :class="{
          'tasks-list-item_important': importantTasksList.find(
            item => Number(item) === Number(task.id)
          )
        }"
      >
        <div :id="task.id">
          <div class="tasks-list-item__id">Id:&nbsp;{{ task.id }}</div>
          <div class="tasks-list-item__title">Title:&nbsp;{{ task.title }}</div>
          <MyButton
            :on-click="setImportant"
            color="#EB5757"
            txt="Важное"
            txt-color="#fff"
          />
        </div>
        <Status
          :txt="task.completed ? 'Готово' : 'В работе'"
          :color="task.completed ? '#22C38E' : '#F38B00'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Status from "@/components/Status";
import MyButton from "@/components/MyButton";
export default {
  name: "User",
  components: { MyButton, Status },
  data() {
    return {
      userId: this.$route.params.id,
      searchTxt: "",
      sortTaskStatus: false,
      tasksListFiltered: [],
      importantTasksList: []
    };
  },
  methods: {
    ...mapActions(["GetTasksList"]),
    clearSearchTxt() {
      this.searchTxt = "";
    },
    searchTaskFilter() {
      return this.tasksList
        .filter(item => {
          return item.title.indexOf(this.searchTxt.toLowerCase().trim()) > -1;
        })
        .filter(item => {
          if (this.sortTaskStatus) {
            return item.completed === this.sortTaskStatus;
          }
          return item;
        });
    },
    setImportant(e) {
      const id = e.target.parentNode.id;
      if (this.importantTasksList.indexOf(id) === -1) {
        this.importantTasksList.push(id);
      } else {
        this.importantTasksList = this.importantTasksList.filter(item => {
          return item !== id;
        });
      }
    }
  },
  computed: {
    ...mapState(["usersList", "tasksList", "tasksListLoading"]),
    ...mapGetters(["getUserById"]),
    userInfo() {
      return this.getUserById(Number(this.userId));
    }
  },
  watch: {
    searchTxt() {
      this.tasksListFiltered = this.searchTaskFilter();
    },
    sortTaskStatus() {
      this.tasksListFiltered = this.searchTaskFilter();
    },
    importantTasksList() {
      const parsed = JSON.stringify(this.importantTasksList);
      localStorage.setItem(`user-${this.userId}`, parsed);
    }
  },
  mounted() {
    this.GetTasksList(this.userId).then(() => {
      this.tasksListFiltered = this.tasksList;
    });

    if (localStorage.getItem(`user-${this.userId}`)) {
      try {
        this.importantTasksList = JSON.parse(
          localStorage.getItem(`user-${this.userId}`)
        );
      } catch (e) {
        localStorage.removeItem(`user-${this.userId}`);
      }
    }
  }
};
</script>

<style lang="less" scoped>
h1 {
  margin: 0;
}
.user {
  padding: 16px;
  &-info {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    background-color: #fff;
    padding: 16px;
    margin-bottom: 16px;
  }
}
.filter {
  display: flex;
  align-items: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  background-color: #fff;
  padding: 16px;
  margin-bottom: 16px;
  &-search-field {
    position: relative;
    margin-right: 16px;
    flex-shrink: 0;
    &__input {
      border: 1px solid rgba(0, 66, 105, 0.28);
      width: 260px;
      height: 30px;
      outline: none;
      border-radius: 4px;
      padding: 0 40px 0 12px;
      font-size: 16px;
    }
    &__icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 12px;
    }
  }
  &-sort-field {
    display: flex;
    align-items: center;
    margin-left: 16px;
    &__input {
      cursor: pointer;
    }
  }
}
.tasks-list {
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    background-color: #fff;
    padding: 16px;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
    &__id {
      margin-bottom: 8px;
    }
    &__title {
      margin-bottom: 8px;
    }
    &_important {
      background-color: red;
    }
  }
}
</style>
