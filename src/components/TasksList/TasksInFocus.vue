<template>
  <div class="mr-3">
    <TasksListNew />
    <propertiesRight />
  </div>
</template>

<script>
import TasksListNew from '../TasksListNew.vue'
import PropertiesRight from '../PropertiesRight.vue'
import { UID_TO_ACTION } from '@/store/helpers/functions'

export default {
  components: {
    TasksListNew,
    PropertiesRight
  },
  data () {
    return {
      date: new Date(),
      uid: '6fc44cc6-9d45-4052-917e-25b1189ab141'
    }
  },
  mounted () {
    if (UID_TO_ACTION[this.uid]) {
      this.$store.dispatch(UID_TO_ACTION[this.uid])
      const navElem = {
        name: 'Задачи в фокусе',
        key: 'taskListSource',
        value: { uid: this.uid, param: new Date(this.date) },
        typeVal: new Date(this.date),
        type: 'date'
      }
      this.$store.commit('setCalendarLastPicked', null)
      this.$store.commit('updateStackWithInitValue', navElem)
      this.$store.commit('basic', { key: 'taskListSource', value: { uid: this.uid, param: null } })
      this.$store.commit('basic', { key: 'mainSectionState', value: 'tasks' })
    }
  }
}
</script>
