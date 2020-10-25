<template>
  <div class="user">
    <div class="user-info">
      <div>ID:&nbsp;{{ userInfo.id }}</div>
      <div>Name:&nbsp;{{ userInfo.name }}</div>
      <div>E-mail:&nbsp;{{ userInfo.email }}</div>
      <div>Phone:&nbsp;{{ userInfo.phone }}</div>
    </div>
    <div class="filter">
      <div class="filter-wrap">
        <div class="filter-search-field">
          <label>
            <input
              class="filter-search-field__input"
              type="text"
              placeholder="Поиск..."
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
              fill="#6c6c6c"
              fill-opacity=".8"
            />
          </svg>
        </div>
        <MyButton
          :on-click="clearSearchTxt"
          txt="Сбросить фильтр"
          color="#6c6c6c"
        />
      </div>
      <div class="filter-sort-field">
        <label>
          <input
            class="filter-sort-field__input"
            type="checkbox"
            v-model="sortTaskStatus"
          />
          - сортировать по статусу
        </label>
      </div>
    </div>

    <!--    {{ importantTasksList }}-->

    <div v-if="tasksListLoading">...Загрузка</div>
    <div v-else-if="!tasksListFiltered.length">
      По вашему запросу ничего не найдено
    </div>
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
          <Status
            class="tasks-list-item__status"
            :txt="task.completed ? 'готово' : 'в работе'"
            :color="task.completed ? '#22C38E' : '#F38B00'"
          />
          <div class="tasks-list-item__title">
            <span class="tasks-list-item__label">Title:&nbsp;</span
            >{{ task.title }}
          </div>
          <MyButton
            v-if="
              !importantTasksList.find(item => Number(item) === Number(task.id))
            "
            :on-click="setImportant"
            color="#EB5757"
            txt="Важное"
          />
          <MyButton
            v-else
            :on-click="setImportant"
            color="#6c6c6c"
            txt="Обычное"
          />
        </div>
        <div class="tasks-list-item__id">Id:&nbsp;{{ task.id }}</div>
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
    width: 50%;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    background-color: #fff;
    padding: 16px;
    margin-bottom: 16px;
  }
}
.filter {
  display: inline-block;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background-color: #fff;
  padding: 16px;
  margin-bottom: 16px;
  &-wrap {
    display: flex;
    margin-bottom: 8px;
  }
  &-search-field {
    display: inline-flex;
    align-items: center;
    position: relative;
    margin-right: 16px;
    flex-shrink: 0;
    &__input {
      border: 1px solid #6c6c6c;
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
    &__input {
      cursor: pointer;
    }
  }
}
.tasks-list {
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
  &-item {
    display: flex;
    width: calc(50% - 8px);
    min-width: 284px;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 3px;
    border: 1px solid #dbdbdb;
    background-color: #fff;
    padding: 16px;
    box-sizing: border-box;
    margin-right: 16px;
    &:not(:last-child) {
      margin-bottom: 16px;
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
    &__id {
      color: #a9a9a9;
      font-size: 14px;
    }
    &__title {
      margin-bottom: 16px;
      font-size: 18px;
    }
    &__label {
      font-size: 14px;
      color: #a9a9a9;
    }
    &__status {
      margin-bottom: 8px;
    }
    &_important {
      background-color: #ffcfcf;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
      margin-right: 0;
    }
  }
}
</style>
<!--@media only screen and (max-width : 1200px) {-->

<!--}-->

<!--/* Medium Devices, Desktops */-->
<!--@media only screen and (max-width : 992px) {-->

<!--}-->

<!--/* Small Devices, Tablets */-->
<!--@media only screen and (max-width : 768px) {-->

<!--}-->

<!--/* Extra Small Devices, Phones */-->
<!--@media only screen and (max-width : 480px) {-->

<!--}-->

<!--/* Custom, iPhone Retina */-->
<!--@media only screen and (max-width : 320px) {-->

<!--}-->
