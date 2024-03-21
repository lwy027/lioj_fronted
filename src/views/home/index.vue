<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useQuestionStore } from '@/stores/question'
import { storeToRefs } from 'pinia'
import QueryForm from '@/components/QueryForm.vue'
import TableView from '@/components/TableView.vue'
import type { IQuestionQuery } from '@/types'
const questionStore = useQuestionStore()

const { questionList } = storeToRefs(questionStore)
//获取问题列表

let questionQuery = reactive<IQuestionQuery>({})

const fetchQuestionListData = async () => {
  await questionStore.fetchQuestionList(questionQuery)
}

onMounted(async () => {
  fetchQuestionListData()
})

//更改值的状态

const questionQueryHandle = async (value: IQuestionQuery) => {
  questionQuery = value
  await fetchQuestionListData()
}
</script>
<template>
  <div class="home">
    <!-- 查询表单 -->
    <QueryForm @question-query="questionQueryHandle" />
    <!-- 题目展示 -->
    <TableView :question-list="questionList" />
  </div>
</template>

<style scoped lang="less">
.home {
  width: 80%;
  margin-top: 50px;
  margin-left: 100px;
}
</style>
