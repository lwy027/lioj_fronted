import { getQuestionRequest, updateQuestion, deleteQuestion } from '@/service/question'
import type { Question, QuestionListVo } from '@/types'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

import type { IQuestionQuery } from '../types/index'
import { Message } from '@arco-design/web-vue'
import { errorResponse } from '@/utils/errorResponse'

export const useQuestionStore = defineStore('question', () => {
  const questionList = reactive<QuestionListVo>({
    questions: [],
    totalCount: 0
  })
  //获取题目信息
  const fetchQuestionList = async (quesQuer: IQuestionQuery) => {
    const res = await getQuestionRequest(
      quesQuer.pageNo,
      quesQuer.pageSize,
      quesQuer.id,
      quesQuer.title,
      quesQuer.tags
    )
    if (res.code === 200) {
      questionList.questions = res.data.questions
      questionList.totalCount = res.data.totalCount
    }
  }
  //更新题目信息
  const updateQuestionById = async (question: Question) => {
    const res = await updateQuestion(question)
    if (res.code === 200) {
      Message.success('更改题目成功')
    } else {
      Message.error(errorResponse(res))
    }
  }
  //删除题目
  const deleteQuestionById = async (questionId: number) => {
    const res = await deleteQuestion(questionId)
    console.log(res)
    if (res.code === 200) {
      Message.success('删除题目成功')
    } else {
      Message.error('删除题目失败')
    }
  }

  return {
    questionList,
    fetchQuestionList,
    updateQuestionById,
    deleteQuestionById
  }
})
