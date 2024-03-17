/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddQuestionDto } from '../models/AddQuestionDto'
import type { LoginUserDto } from '../models/LoginUserDto'
import type { RegisterUserDto } from '../models/RegisterUserDto'
import type { SubmitQuestionDto } from '../models/SubmitQuestionDto'
import type { updateQuestionDto } from '../models/updateQuestionDto'
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
export class Service {
  /**
   * @param requestBody
   * @returns any 注册成功/失败
   * @throws ApiError
   */
  public static userControllerRegister(requestBody: RegisterUserDto): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/user/register',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `当前用户已存在，请重新输入用户名`
      }
    })
  }
  /**
   * @param requestBody
   * @returns any 登录成功
   * @throws ApiError
   */
  public static userControllerLogin(requestBody: LoginUserDto): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/user/login',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `当前用户不存在/密码不正确`
      }
    })
  }
  /**
   * @param requestBody 添加题目信息
   * @returns any 创建题目成功
   * @throws ApiError
   */
  public static questionControllerCreate(requestBody: AddQuestionDto): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/question/add',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `当前题目已存在/当前用户不存在`
      }
    })
  }
  /**
   * @param pageNo 第几页
   * @param pageSize 每页多少条
   * @param id 题目id
   * @param title 题目标题
   * @param tags 题目标签
   * @returns any 创建题目成功
   * @throws ApiError
   */
  public static questionControllerSearchQuestion(
    pageNo: number,
    pageSize: number,
    id: number,
    title: string,
    tags: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/question/search',
      query: {
        pageNo: pageNo,
        pageSize: pageSize,
        id: id,
        title: title,
        tags: tags
      },
      errors: {
        400: `当前题目已存在/当前用户不存在`
      }
    })
  }
  /**
   * @param requestBody
   * @returns any 修改题目成功
   * @throws ApiError
   */
  public static questionControllerUpdate(requestBody: updateQuestionDto): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/question/update',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `当前题目不存在/当前为做任何修改`
      }
    })
  }
  /**
   * @param id 查询题目id
   * @returns any 修改题目成功
   * @throws ApiError
   */
  public static questionControllerFind(id: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/question/{id}',
      path: {
        id: id
      },
      errors: {
        400: `当前题目不存在/当前为做任何修改`
      }
    })
  }
  /**
   * @param id 删除题目id
   * @returns any 删除题目成功
   * @throws ApiError
   */
  public static questionControllerDelete(id: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/question/delete',
      query: {
        id: id
      },
      errors: {
        400: `当前题目不存在`
      }
    })
  }
  /**
   * @param requestBody
   * @returns any 提交成功
   * @throws ApiError
   */
  public static judgeQuestionControllerSubmitQuestion(
    requestBody: SubmitQuestionDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/judge-question/submitQuestion',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `当前题目/用户不存在,请重新提交`
      }
    })
  }
  /**
   * @param pageNo 第几页
   * @param pageSize 每页多少条
   * @param userId 用户id
   * @param questionId 题目id
   * @param status 题目状态
   * @returns any 创建题目成功
   * @throws ApiError
   */
  public static judgeQuestionControllerSearchQuestion(
    pageNo: number,
    pageSize: number,
    userId: number,
    questionId: number,
    status: number
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/judge-question/search',
      query: {
        pageNo: pageNo,
        pageSize: pageSize,
        userId: userId,
        questionId: questionId,
        status: status
      },
      errors: {
        400: `当前题目已存在/当前用户不存在`
      }
    })
  }
}
