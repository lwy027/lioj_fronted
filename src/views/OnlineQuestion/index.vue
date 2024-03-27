<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useQuestionStore } from '@/stores/question'
import { onMounted, ref } from 'vue'
import type { Question, QuestionSubmitAddRequest } from '@/types'

const questionStore = useQuestionStore()
const question = ref<Question>()

const route = useRoute()
const quesId: any = route.query.id

//发起网络请求根据id获取当前题目信息
onMounted(async () => {
  const res = await questionStore.findQuestionById(quesId)
  question.value = { ...res?.data?.questions[0] }

  console.log(question)
})

//输入数据

const form = ref<QuestionSubmitAddRequest>({
  language: 'java',
  code: ''
})

//获取输入
const changeCode = (value: string) => {
  form.value.code = value
}

//提交代码
const doSubmit = () => {}
</script>

<template>
  <div class="onlineQuestion">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions title="判题条件" :column="{ xs: 1, md: 2, lg: 3 }">
                <a-descriptions-item label="时间限制">
                  {{ question?.judgeConfig?.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question?.judgeConfig?.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question?.judgeConfig?.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />

              <template #extra>
                <a-space wrap>
                  <a-tag color="green"> {{ question.tags }} </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item field="language" label="编程语言" style="min-width: 240px">
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>html</a-option>
              <a-option>javascript</a-option>
              <a-option>typescript</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code as string"
          :language="form.language"
          :handle-change="changeCode"
        />
        <a-divider :size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"> 提交代码 </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<style></style>
