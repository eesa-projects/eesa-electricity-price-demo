<script>
import { ref } from 'vue'
import { electricityPrice } from "../api";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      requestCode: 0,
      requestResult: "请求中———",
    };
  },
  mounted() {
    this.debugElectricalPriceRequest()
  },
  methods: {
    debugElectricalPriceRequest() {
      electricityPrice().then(res =>{
        this.requestCode = res.resp_code
        this.requestResult = res.resp_msg
      })
    },
  }
}

const count = ref(0)

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="debugElectricalPriceRequest">点击调用：获取地区和用电类型I</button>
    <p>
      调用结果：
      <span class="a">{{ requestResult }}</span>
    </p>
  </div>

  <p class="read-the-docs">Click on the EESA logos to learn more about us</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
