<script setup lang="ts">
import { reactive } from 'vue'
import type { Question } from '../types/question'

const props = defineProps<{
  questionList: Question
}>()
const emits = defineEmits(['submitEditInfo', 'cancelEdit'])

const form = reactive<Question>({
  id: props.questionList.id,
  title: props.questionList.title,
  content: props.questionList.content,
  tags: props.questionList.tags,
  answer: props.questionList.answer,
  judgeCase: props.questionList.judgeCase,
  judgeConfig: props.questionList.judgeConfig
})

//处理提交
const submitHandle = () => {
  //发出事件让外界处理这里的请求
  emits('submitEditInfo', form)
}

const cancelHandle = () => {
  emits('cancelEdit')
}
</script>

<template>
  <div class="editView">
    <a-form :model="form" layout="horizontal">
      <a-form-item field="title" label="title">
        <a-input v-model="form.title" placeholder="请输入题目标题" />
      </a-form-item>
      <a-form-item field="content" label="content">
        <a-input v-model="form.content" placeholder="请输入题目内容" />
      </a-form-item>
      <a-form-item field="tags" label="tags">
        <a-input v-model="form.tags" placeholder="请输入题目标签" />
      </a-form-item>
      <a-form-item field="answer" label="answer">
        <a-input v-model="form.answer" placeholder="请输入题目答案" />
      </a-form-item>
      <a-form-item label="判题用例" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" fill>
          <template v-for="item of form.judgeCase" :key="item.input">
            <a-form-item field="input" label="输入">
              <a-input v-model="item.input" />
            </a-form-item>
            <a-form-item field="output" label="输入">
              <a-input v-model="item.output" />
            </a-form-item>
          </template>
        </a-space>
      </a-form-item>
      <a-form-item label="题目限制" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" fill>
          <a-form-item field="timeLimit" label="时间限制">
            <a-input-number v-model="form.judgeConfig!.timeLimit" />
          </a-form-item>
          <a-form-item field="output" label="内存限制">
            <a-input-number v-model="form.judgeConfig!.memoryLimit" />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-button @click="submitHandle">Submit</a-button>
        <a-button @click="cancelHandle" class="cancel">Cancel</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.editView {
  width: 600px;
  padding: 20px;
  position: absolute;
  top: -20%;
  left: 30%;
  border-radius: 11px;

  background-color: #eee;

  .cancel {
    margin-left: 50px;
  }
}
</style>
