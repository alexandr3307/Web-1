import axios from 'axios'
import { notify } from 'notiwind'
import * as BOARD from '../actions/boards'

function uuidv4 () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}

const state = {
  boards: {},
  selectedBoard: undefined
}
const getters = {}
// const getDefaultState = () => {
//   return {
//     boards: false,
//     status: '',
//     computedNavigator: false,
//     hasLoadedOnce: false,
//     selectedBoard: undefined
//   }
// }

const actions = {
  [BOARD.CREATE_BOARD_REQUEST]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_LEADERTASK_API + '/api/v1/board'
      axios({ url: url, method: 'POST', data: data })
        .then((resp) => {
          resolve(resp)
        })
        .catch((err) => {
          notify(
            {
              group: 'api',
              title: 'REST API Error, please make screenshot',
              action: BOARD.CREATE_BOARD_REQUEST,
              text: err.response.data
            },
            15000
          )
          reject(err)
        })
    })
  },
  [BOARD.UPDATE_BOARD_REQUEST]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_LEADERTASK_API + '/api/v1/board'
      axios({ url: url, method: 'PATCH', data: data })
        .then((resp) => {
          resolve(resp)
        })
        .catch((err) => {
          notify(
            {
              group: 'api',
              title: 'REST API Error, please make screenshot',
              action: BOARD.UPDATE_BOARD_REQUEST,
              text: err.response.data
            },
            15000
          )
          reject(err)
        })
    })
  },
  [BOARD.REMOVE_BOARD_REQUEST]: ({ commit, dispatch }, uid) => {
    return new Promise((resolve, reject) => {
      const url =
        process.env.VUE_APP_LEADERTASK_API + '/api/v1/board?uid=' + uid
      axios({ url: url, method: 'DELETE' })
        .then((resp) => {
          resolve(resp)
        })
        .catch((err) => {
          notify(
            {
              group: 'api',
              title: 'REST API Error, please make screenshot',
              action: BOARD.REMOVE_BOARD_REQUEST,
              text: err.response.data
            },
            15000
          )
          reject(err)
        })
    })
  },
  [BOARD.QUIT_BOARD_REQUEST]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_LEADERTASK_API + '/api/v1/board/exit'
      axios({ url: url, method: 'POST', data: data })
        .then((resp) => {
          resolve(resp)
        })
        .catch((err) => {
          notify(
            {
              group: 'api',
              title: 'REST API Error, please make screenshot',
              action: BOARD.REMOVE_BOARD_REQUEST,
              text: err.response.data
            },
            15000
          )
          reject(err)
        })
    })
  },
  [BOARD.ADD_STAGE_BOARD_REQUEST]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      const board = state.boards[data.boardUid]
      if (!board) return reject(new Error(`not find board ${data.boardUid}`))
      const newStage = {
        Color: '',
        Name: data.newStageTitle,
        Order: board.stages.length,
        UID: uuidv4()
      }
      board.stages.push(newStage)
      dispatch(BOARD.UPDATE_BOARD_REQUEST, board)
        .then((resp) => {
          resolve(newStage)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  [BOARD.RENAME_STAGE_BOARD_REQUEST]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      const board = state.boards[data.boardUid]
      if (!board) return reject(new Error(`not find board ${data.boardUid}`))
      const index = board.stages.findIndex(
        (stage) => stage.UID === data.stageUid
      )
      if (index === -1) {
        return reject(
          new Error(`not find stage ${data.stageUid} at board ${data.boardUid}`)
        )
      }
      const stage = board.stages[index]
      const newStage = { ...stage }
      newStage.Name = data.newStageTitle
      // заменяем
      board.stages.splice(index, 1, newStage)
      // отправляем на сервер изменения
      dispatch(BOARD.UPDATE_BOARD_REQUEST, board)
        .then((resp) => {
          resolve(newStage)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  [BOARD.DELETE_STAGE_BOARD_REQUEST]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      const board = state.boards[data.boardUid]
      if (!board) return reject(new Error(`not find board ${data.boardUid}`))
      const index = board.stages.findIndex(
        (stage) => stage.UID === data.stageUid
      )
      if (index === -1) {
        return reject(
          new Error(`not find stage ${data.stageUid} at board ${data.boardUid}`)
        )
      }
      // удаляем
      board.stages.splice(index, 1)
      // пересчитываем порядок
      board.stages.forEach((stage, index) => {
        stage.Order = index
      })
      // отправляем на сервер изменения
      dispatch(BOARD.UPDATE_BOARD_REQUEST, board)
        .then((resp) => {
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [BOARD.PUSH_BOARD]: (state, boards) => {
    for (const board of boards) {
      state.boards[board.uid] = board
    }
  },
  [BOARD.SELECT_BOARD]: (state, board) => {
    state.selectedBoard = board
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
