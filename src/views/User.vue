<template>
  <div class="user">
    <div class="user-breadcrumb">
      <router-link class="user-breadcrumb__link" to="/">
        ← Список пользователей
      </router-link>
    </div>
    <div class="user-info">
      <div>
        <span class="user-info__label">ID:&nbsp;</span>{{ userInfo.id }}
      </div>
      <div>
        <span class="user-info__label">Name:&nbsp;</span>{{ userInfo.name }}
      </div>
      <div>
        <span class="user-info__label">E-mail:&nbsp;</span>{{ userInfo.email }}
      </div>
      <div>
        <span class="user-info__label">Phone:&nbsp;</span>{{ userInfo.phone }}
      </div>
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
          class="filter__btn"
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
    <div v-if="tasksListLoading">...Загрузка</div>
    <div v-else-if="!tasksListFiltered.length">
      По вашему запросу ничего не найдено
    </div>
    <div v-else class="tasks-list">
      <TaskItemCard
        v-for="task of tasksListFiltered"
        :key="task.id"
        :title="task.title"
        :id="task.id"
        :status="task.completed"
        :important="importantTasksList.includes(task.id)"
        @setImportantTask="setImportant"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import MyButton from "@/components/MyButton";
import TaskItemCard from "@/components/TaskItemCard";
export default {
  name: "User",
  components: { TaskItemCard, MyButton },
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
    setImportant(id) {
      if (!this.importantTasksList.includes(id)) {
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
    margin-right: 16px;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    background-color: #fff;
    padding: 16px;
    margin-bottom: 16px;
    width: calc(50% - 32px);
    @media only screen and (max-width: 1200px) {
      width: calc(100% - 32px);
    }
    &__label {
      font-size: 14px;
      color: #808080;
    }
  }
  &-breadcrumb {
    margin-bottom: 16px;
    &__link {
      text-decoration: none;
      font-size: 12px;
      color: #0078d2;
    }
  }
}
.filter {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background-color: #fff;
  padding: 16px 16px 8px 16px;
  margin-bottom: 16px;
  width: calc(50% - 32px);
  @media only screen and (max-width: 1200px) {
    width: calc(100% - 32px);
  }
  &-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  &-search-field {
    display: inline-flex;
    align-items: center;
    position: relative;
    margin-right: 8px;
    margin-bottom: 8px;
    flex-shrink: 0;
    &__input {
      border: 1px solid #6c6c6c;
      height: 28px;
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
  &__btn {
    margin-bottom: 8px;
    margin-right: 8px;
  }
  &-sort-field {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    &__input {
      cursor: pointer;
    }
    label {
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
}
</style>
