<template>
  <div class="user-item-card">
    <div class="user-item-card__row">
      <span class="user-item-card__label">Id:&nbsp;</span>{{ id }}
    </div>
    <div class="user-item-card__row">
      <span class="user-item-card__label">FullName:&nbsp;</span>{{ name }}
    </div>
    <div class="user-item-card__row">
      <span class="user-item-card__label">E-mail:&nbsp;</span>{{ email }}
    </div>
  </div>
</template>

<script>
export default {
  name: "UserItemCard",
  props: {
    id: Number,
    name: String,
    email: String
  }
};
</script>

<style lang="less">
.user-item-card {
  padding: 16px;
  border-radius: 3px;
  border: 1px solid #c3c3c3;
  cursor: pointer;
  transition: 0.3s;
  background-color: #fff;
  &:hover {
    border-color: #8f8f8f;
  }
  &__row {
    margin-bottom: 4px;
  }
  &__label {
    font-size: 14px;
    color: #808080;
  }
}
</style>
