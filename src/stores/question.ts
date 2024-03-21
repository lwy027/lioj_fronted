import { getQuestionRequest } from '@/service/question'
import type { QuestionListVo } from '@/types'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

import type { IQuestionQuery } from '../types/index'

export const useQuestionStore = defineStore('question', () => {
  const questionList = reactive<QuestionListVo>({
    questions: [],
    totalCount: 0
  })

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

  return {
    questionList,
    fetchQuestionList
  }
})
