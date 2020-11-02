<template>
  <div class="status" :style="{ color: color }">
    <div class="status__circle" :style="{ backgroundColor: color }"></div>
    <div>{{ txt }}</div>
  </div>
</template>

<script>
export default {
  name: 'Status',
  props: {
    txt: String,
    color: String,
  },
}
</script>

<style lang="less" scoped>
.status {
  display: inline-flex;
  flex-shrink: 0;
  align-items: baseline;
  color: #fff;
  font-size: 14px;
  &__circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
  }
}
</style>
