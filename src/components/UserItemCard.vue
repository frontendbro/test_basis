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
  &__row {
    margin-bottom: 4px;
  }
  &__label {
    font-size: 12px;
    color: #3e3e3e;
  }
}
</style>
