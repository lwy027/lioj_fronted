import WYrequest from '../requests'

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
