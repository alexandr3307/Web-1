import store from '@/store/index.js'
import * as BOARD from '@/store/actions/boards'
import * as CARD from '@/store/actions/cards'
import * as NAVIGATOR from '@/store/actions/navigator'
import router from '@/router'

export function updateBoard (obj) {
  const board = obj.obj
  const lastNavStack = store.state.navbar.navStack[store.state.navbar.navStack.length - 1]

  // Обновляем доску в стейте
  store.commit(BOARD.PUSH_BOARD, [board])

  // И если находимся в текущей доске - раскидываем карточки по колонкам
  if (lastNavStack.greedPath === 'boards_children' && lastNavStack.uid === board.uid) {
    const cards = []
    for (let i = 0; i < store.state.cards.cards.length; i++) {
      cards.push(...store.state.cards.cards[i].cards)
    }
    store.commit(CARD.BOARD_CARDS_SUCCESS, {
      boardUid: board.uid,
      rootState: store.state,
      data: {
        cards: cards
      }
    })
  }
}

export function removeBoard (obj) {
  store.commit(NAVIGATOR.NAVIGATOR_REMOVE_BOARD, obj)
  // Переносим на роут doitnow, если находились в доске, когда нас удалили из доступа к ней
  if (router.currentRoute.value.fullPath === `/board/${obj.uid}`) {
    router.push('/doitnow')
  }
}

export function addBoard (obj) {
  store.commit(NAVIGATOR.NAVIGATOR_PUSH_COMMON_BOARD, obj)
}
