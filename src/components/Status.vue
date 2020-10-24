<template>
  <div class="status" :style="{ borderColor: color, color: color }">
    <div>{{ txt }}</div>
  </div>
</template>

<script>
export default {
  name: "Status",
  props: {
    txt: String,
    color: String
  }
};
</script>

<style lang="less" scoped>
.status {
  display: inline-flex;
  align-items: center;
  color: #fff;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid;
  height: 32px;
  padding: 0 8px;
  font-size: 16px;
}
</style>
