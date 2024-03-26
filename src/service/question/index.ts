import type { Question } from '@/types'
import WYrequest from '../requests'

//获取问题
export function getQuestionRequest(
  pageNo?: number,
  pageSize?: number,
  id?: number,
  title?: string,
  tags?: string
) {
  return WYrequest.get({
    url: '/question/search',
    params: {
      pageNo,
      pageSize,
      id,
      title,
      tags
    }
  })
}

//更新题目
export function updateQuestion(questionInfo: Question) {
  return WYrequest.put({
    url: '/question/update',
    data: {
      id: questionInfo.id,

      title: questionInfo.title,

      content: questionInfo.content,

      tags: questionInfo.tags,

      answer: questionInfo.answer,

      judgeCase: questionInfo.judgeCase,

      judgeConfig: questionInfo.judgeConfig
    }
  })
}

//删除题目
export function deleteQuestion(questionid: number) {
  console.log(questionid)
  return WYrequest.delete({
    url: '/question/delete',
    params: {
      id: questionid
    }
  })
}
//创建题目
export function addQuestion(questioninfo: Question) {
  return WYrequest.post({
    url: '/question/add',
    data: {
      userId: questioninfo.userId,
      title: questioninfo.title,
      content: questioninfo.content,
      tags: questioninfo.tags,
      answer: questioninfo.answer,
      judgeCase: questioninfo.judgeCase,
      judgeConfig: questioninfo.judgeConfig
    }
  })
}
