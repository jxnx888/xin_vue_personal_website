<template>
  <div class='container'>
    <h2 class='title'>Math Operation</h2>
    <div class='subtitle'>Generate Addition and Subtraction</div>
    <el-form ref="form" class='form' :model="form" label-width="80px">
      <el-form-item class='form-item' label="最小值">
        <el-input-number v-model='num1' @change='handleChange' :min='1' label='最小值'></el-input-number>
      </el-form-item>
      <el-form-item class='form-item' label="最大值">
        <el-input-number v-model='num2' @change='handleChange' :min='1' label='最大值'></el-input-number>
      </el-form-item>
      <el-input-number v-model='numOfOperands' @change='handleChange' :min='1' label='几个数字的加减法'></el-input-number>
      <el-button type='primary' @click='generateQuestions'>生成</el-button>
    </el-form>
    <el-row :gutter='20' class='results'>
      <el-col
        v-for='(item, index) in problems'
        :span='6'
        :key='index'>
        {{ item }} <br>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      num1: 20,
      num2: 50,
      numOfOperands: 3,
      numberOfProblems: 100,
      problems: []
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    generateRandomNumber (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    generateQuestion (firstNum, secondNum) {
      const _this = this
      const operands = [];
      const operators = [];
      // 生成随机操作数
      for (let i = 0; i < _this.numOfOperands; i++) {
        const operand = _this.generateRandomNumber(1, i === 0 ? firstNum : secondNum);
        operands.push(operand);
      }
      // 生成随机运算符
      for (let i = 0; i < _this.numOfOperands - 1; i++) {
        const operator = Math.random() < 0.5 ? '+' : '-';
        operators.push(operator);
      }

      // 组合操作数和运算符
      let question = `${operands[0]}`;
      for (let i = 0; i < operators.length; i++) {
        question += `${operators[i]}${operands[i + 1]}`;
      }
      return `${question}=`;


      // const operand1 = _this.generateRandomNumber(1, firstNum)
      // const operand2 = _this.generateRandomNumber(1, secondNum)
      // const operator = Math.random() < 0.5 ? '+' : '-'
      // if (operand1 > operand2) {
      //   return `${operand1}${operator}${operand2}=`
      // }
      // return `${operand2}${operator}${operand1}=`
    },
    generateQuestions () {
      const _this = this
      const newQuestions = []

      for (let i = 0; i < _this.numberOfProblems; i++) {
        const question = _this.generateQuestion(_this.num1, _this.num2)
        newQuestions.push(question)
      }
      _this.problems = newQuestions
    }
  }
}
</script>

<style scoped lang='stylus'>
.container
  padding 15px 0
  .title
    margin auto
    font-size 25px
    font-weight bold
  .subtitle
    margin auto
    font-size 15px
  .form
    width: fit-content;
    margin: auto;
    padding: 15px;
    display: flex;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
    gap: 15px;
    .form-item
      margin: 0
  .results
    min-height 400px;
</style>
