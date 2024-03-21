<script setup lang="ts">
import type { QuestionListVo } from '@/types/index'
import { useRouter } from 'vue-router'
const router = useRouter()

const propos = defineProps<{
  questionList: QuestionListVo
}>()

const colors = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray'
]
const randomIndex = Math.floor(Math.random() * (colors.length - 1))

//跳转到做题页面,携带当前题目得id进行跳转，页面拿到id时，根据id进行题目数据查询展示
const doQuestion = (id: number) => {
  router.push({
    path: `/onlineDoQuestion/`,
    query: {
      id
    }
  })
}
</script>

<template>
  <div class="tableView">
    <a-table :data="propos.questionList.questions" class="a_table">
      <template #columns>
        <a-table-column title="id" data-index="id"></a-table-column>
        <a-table-column title="标题" data-index="title"></a-table-column>
        <a-table-column title="通过率">
          <template #cell="{ record }">
            {{ (record.submitNum > 0 ? record.acceptNum / record.submitNum : 0) + '%' }}
          </template>
        </a-table-column>
        <a-table-column title="标签">
          <template #cell="{ record }">
            <template v-for="tag of record.tags.split() as string" :key="tag">
              <a-tag :color="colors[randomIndex]">{{ tag }}</a-tag>
            </template>
          </template>
        </a-table-column>
        <a-table-column title="选项">
          <template #cell="{ record }">
            <a-button type="primary" @click="doQuestion(record.id)" size="mini">开始做题</a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<style lang="less" scoped></style>
