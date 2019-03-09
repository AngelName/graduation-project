import { queryPageList } from '@/services/api';

export default {
    namespace: 'page',
    state: {
        pagelist: []
    },
    effects: {
        *fetchList({ payload }, { call, put }) {
          console.log(payload)
            const data = yield call(queryPageList,payload);
            yield put({
              type:"saveList",
              payload:data
            })
        }
    },
  reducers: {
    saveList(state,{payload}){
      console.log(payload)
      return {
        ...state,
        pagelist:payload
      }
    }
  }
}