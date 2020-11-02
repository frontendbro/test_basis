<template>
  <button
    class="btn"
    :style="{ borderColor: color, color: color }"
    @click="onClick"
  >
    {{ txt }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    txt: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style lang="less">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 30px;
  padding: 0 10px;
  background-color: #ffffff;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
  outline: none;
  &:hover {
    cursor: pointer;
  }
}
</style>
