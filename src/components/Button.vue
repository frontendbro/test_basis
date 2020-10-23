<template>
  <button class="btn" :style="{ backgroundColor: color, color: txtColor }">
    {{ txt }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    txt: String,
    color: String,
    txtColor: String
  }
};
</script>

<style lang="less">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 10px;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
}
</style>
