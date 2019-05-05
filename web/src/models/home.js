import { queryPageList } from '@/services/api';

export default {
  namespace: 'page',
  state: {
    pagelist: [],
    currentTag: {},
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      console.log(payload)
      const data = yield call(queryPageList, payload);
      yield put({
        type: "saveList",
        payload: data
      })
    },
    *changeStorage({ payload }, { call, put }) {
      yield put({
        type: "setStorage",
        payload: payload
      })
    },
  },
    reducers: {
      setStorage(state,{payload}){
        return {
          ...state,
          ...payload
        }
      },
      saveList(state, { payload }) {
        console.log(payload)
        return {
          ...state,
          pagelist: payload
        }
      }
    }
  }