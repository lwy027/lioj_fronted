/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeConfig } from './JudgeConfig';
export type AddQuestionDto = {
    userId: number;
    title: string;
    content: string;
    tags: string;
    answer: string;
    judgeCase: Array<string>;
    judgeConfig: JudgeConfig;
};

