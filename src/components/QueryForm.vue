<script setup lang="ts">
import type { IQuestionQuery } from '@/types'
import { reactive } from 'vue'

//在点击查询按钮时，需要发出emit事件传递
let questionQuery = reactive<IQuestionQuery>({
  pageNo: 1,
  pageSize: 5,
  id: undefined,
  title: '',
  tags: ''
})

const emits = defineEmits(['questionQuery'])

//提交事件
const handleSubmit = () => {
  //传递给父组件，由父组件进行查询查询操作
  emits('questionQuery', questionQuery)
}

//重返事件
const resetHandle = () => {
  questionQuery = {}

  emits('questionQuery', questionQuery)
}
</script>

<template>
  <div class="query_form">
    <a-form :model="questionQuery" @submit="handleSubmit" class="form">
      <a-row>
        <a-col :span="6">
          <a-form-item field="id" label="id">
            <a-input-number v-model="questionQuery.id" placeholder="请输入题目id" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item field="title" label="标题">
            <a-input v-model="questionQuery.title" placeholder="请输入题目标题" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item field="tags" label="标签">
            <a-input v-model="questionQuery.tags" placeholder="请输入题目标签" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item class="button">
            <a-button html-type="submit" type="secondary">Submit</a-button>
            <a-button html-type="reset" type="secondary" class="reset" @click="resetHandle"
              >reset</a-button
            >
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.reset {
  margin-left: 10px;
}
</style>
