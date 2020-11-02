<template>
  <div
    class="tasks-item-card"
    :class="{
      'tasks-item-card_important': important,
    }"
  >
    <div>
      <Status
        class="tasks-item-card__status"
        :txt="status ? 'готово' : 'в работе'"
        :color="status ? '#22C38E' : '#F38B00'"
      />
      <div class="tasks-item-card__title">
        <span class="tasks-item-card__label">Title:&nbsp;</span>{{ title }}
      </div>
      <MyButton
        v-if="!important"
        :on-click="setImportant"
        color="#EB5757"
        txt="Важное"
      />
      <MyButton v-else :on-click="setImportant" color="#6c6c6c" txt="Обычное" />
    </div>
    <div class="tasks-item-card__id">Id:&nbsp;{{ id }}</div>
  </div>
</template>

<script>
import MyButton from '@/components/MyButton'
import Status from '@/components/Status'
export default {
  name: 'TaskItemCard',
  components: {
    MyButton,
    Status,
  },
  props: {
    id: Number,
    title: String,
    status: Boolean,
    important: Boolean,
  },
  methods: {
    setImportant() {
      this.$emit('setImportantTask', this.id)
    },
  },
}
</script>

<style lang="less" scoped>
.tasks-item-card {
  display: flex;
  width: calc(50% - 8px);
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 3px;
  border: 1px solid #dbdbdb;
  background-color: #fff;
  padding: 16px;
  box-sizing: border-box;
  margin-right: 16px;
  margin-bottom: 16px;
  &:nth-child(2n) {
    margin-right: 0;
  }
  &__id {
    color: #808080;
    font-size: 14px;
    flex-shrink: 0;
  }
  &__title {
    margin-bottom: 16px;
    font-size: 18px;
  }
  &__label {
    font-size: 14px;
    color: #808080;
  }
  &__status {
    margin-bottom: 8px;
  }
  &_important {
    background-color: #fde6e6;
    border-color: #ffabab;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
}
</style>
