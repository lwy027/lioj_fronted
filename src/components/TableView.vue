<script setup lang="ts">
import ACCESS_ENUM from '@/access/AccessMenu'
import { useUserStore } from '@/stores/user'
import type { Question, QuestionListVo } from '@/types/index'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import EditView from './EditView.vue'
import { useQuestionStore } from '@/stores/question'

const emits = defineEmits(['reFetchQuestionList'])

const router = useRouter()
//控制编辑页面展示
const editIsShow = ref<boolean>(false)
//记录删除题目的id
const quesId = ref<number>(0)

//控制提示信息展示
const isShow = ref(false)

//控制当前editView功能是创建还是更新，用来发送不同的网络请求
const isCreate = ref<boolean>(false)

//使用userStore获取用户当前的身份，进行权限控制
const userStore = useUserStore()

const userRole = userStore.userInfo.userRole
const questionStore = useQuestionStore()

const propos = defineProps<{
  questionList: QuestionListVo
}>()

let editQuestionList: Question = reactive({
  id: 0,
  userId: 0,
  title: '',
  content: '',
  tags: '',
  answer: '',
  judgeCase: [
    {
      input: '',
      output: ''
    }
  ],
  judgeConfig: {
    //时间限制
    timeLimit: 0,
    //内存限制
    memoryLimit: 0,
    stackLimit: 0
  }
})

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

//编辑题目,打开编辑表单
const editHandler = (record: Question) => {
  editQuestionList = reactive(record)

  //展示组件
  editIsShow.value = true
}

//处理编辑/创建题目信息之后的操作
const editInfoHandler = async (form: Question) => {
  //当前是更新表单发送的网络请求
  if (!isCreate.value) {
    //发送网络请求,更新题目信息,并且关闭当前页面
    await questionStore.updateQuestionById(form)
  } else {
    //创建表单发送的网络请求
    await questionStore.createQuestion(form)
  }

  //关闭页面
  editIsShow.value = false

  //发出一个事件通知父组件重新请求question数据
  emits('reFetchQuestionList')
}

//取消编辑
const cancelEditHandle = () => {
  editIsShow.value = false
  isCreate.value = false
}

//删除题目
const dleteHandler = async (id: number) => {
  isShow.value = true
  quesId.value = id
}
const confirmDelete = async () => {
  await questionStore.deleteQuestionById(quesId.value)
  emits('reFetchQuestionList')
  isShow.value = false
}
//取消删除
const cancelDelete = () => {
  isShow.value = false
}

//创建题目
const createQuestion = () => {
  //清空传递给表单组件的数据
  editQuestionList = reactive({
    id: 0,
    userId: 0,
    title: '',
    content: '',
    tags: '',
    answer: '',
    judgeCase: [
      {
        input: '',
        output: ''
      }
    ],
    judgeConfig: {
      //时间限制
      timeLimit: 0,
      //内存限制
      memoryLimit: 0,
      stackLimit: 0
    }
  })
  //打开编辑菜单
  editIsShow.value = true
  //设置创建题目value为true，表示当前表单为创建题目
  isCreate.value = true
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
        <a-table-column title="选项" align="center">
          <template #cell="{ record }">
            <a-button type="primary" @click="doQuestion(record.id)" size="mini">开始做题</a-button>
            <template v-if="userRole == ACCESS_ENUM.ADMIN">
              <a-button size="mini" @click="dleteHandler(record.id)" class="delete"
                >删除题目</a-button
              >
              <a-button type="outline" size="mini" class="edit" @click="editHandler(record)"
                >编辑题目</a-button
              >
            </template>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <!-- 展示编辑页面 -->
    <template v-if="editIsShow">
      <EditView
        :question-list="editQuestionList"
        @submit-edit-info="editInfoHandler"
        @cancel-edit="cancelEditHandle"
        :is-create="isCreate"
      />
    </template>
    <!-- 控制删除提示页面 -->
    <template v-if="isShow">
      <div class="deleteAlert">
        <a-alert banner center>
          确定要删除吗
          <template #action>
            <a-button size="small" @click="confirmDelete" type="primary">确定</a-button>
            <a-button size="small" @click="cancelDelete" type="primary">取消</a-button>
          </template>
        </a-alert>
      </div>
    </template>
    <!-- 创建题目 -->
    <div class="createQuestion">
      <a-button type="primary" size="large" @click="createQuestion">创建题目</a-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tableView {
  width: 100%;
  height: 100%;
  position: relative;
}

.delete {
  margin-left: 10px;
}
.edit {
  margin-left: 10px;
}

.deleteAlert {
  position: absolute;

  top: -170px;
  left: 40%;
  button {
    margin-left: 10px;
  }
}
.createQuestion {
  position: absolute;
  right: -100px;
  top: -80px;
}
</style>
