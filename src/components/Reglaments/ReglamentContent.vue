<template>
  <ReglamentTestLimit
    v-if="showTestLimit"
    @cancel="showTestLimit = false"
    @ok="showTestLimit = false"
  />
  <ReglamentEditLimit
    v-if="showEditLimit"
    @cancel="showEditLimit = false"
    @ok="showEditLimit = false"
  />
  <ReglamentContentEditor
    v-if="isEditing"
    :is-editing="isEditing"
    :reglament="reglament"
    @exitEditMode="isEditing = false"
  />
  <div v-else>
    <!-- <div
      class="flex justify-end h-[30px]"
    >
      <div class="flex justify-center items-center">
        <NavBarButtonsReglament
          :reglament-uid="reglament.uid"
        />
      </div>
    </div> -->
    <div class="flex justify-between items-center mt-4">
      <h1
        v-if="!isTesting"
        class="font-roboto font-bold font-[18px] leading-[21px] text-[#424242] overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {{ reglamentTitle }}
      </h1>
      <div
        v-if="!showCompleteMessage && !isTesting"
        class="flex justify-end h-[30px]"
      >
        <router-link
          to="/reglaments"
        >
          <ReglamentSmallButton
            class="flex items-center px-[10px] py-[5px] mr-1"
          >
            <svg
              class="mr-1.5"
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.23531 6.86625L2.99406 4.625H13.8516V3.375H2.99406L5.23531 1.13375L4.35156 0.25L0.601562 4L4.35156 7.75L5.23531 6.86625Z"
                fill="#4C4C4D"
              />
            </svg>
            Назад
          </ReglamentSmallButton>
        </router-link>
        <ReglamentSmallButton
          v-if="canEdit && !showCompleteMessage && !isTesting"
          class="flex items-center px-[10px] py-[5px]"
          @click="setEdit"
        >
          <svg
            class="mr-1.5"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.9554 0.957031C13.6596 0.957031 13.3666 1.0153 13.0933 1.12851C12.82 1.24173 12.5717 1.40766 12.3625 1.61685L7.59032 6.389C7.24495 6.73402 7.00906 7.17388 6.91301 7.65253L6.47206 9.85979C6.42566 10.092 6.4984 10.3321 6.66589 10.4995C6.83338 10.6669 7.07346 10.7396 7.30568 10.6931L9.51225 10.2515C9.99085 10.1557 10.4302 9.92089 10.7759 9.57525L15.5484 4.80275C15.7576 4.59356 15.9235 4.34522 16.0367 4.0719C16.1499 3.79858 16.2082 3.50564 16.2082 3.2098C16.2082 2.91397 16.1499 2.62103 16.0367 2.3477C15.9235 2.07439 15.7576 1.82604 15.5484 1.61685C15.3392 1.40766 15.0908 1.24173 14.8175 1.12851C14.5442 1.0153 14.2513 0.957031 13.9554 0.957031ZM13.6355 2.43734C13.7369 2.39532 13.8456 2.3737 13.9554 2.3737C14.0652 2.3737 14.1739 2.39532 14.2754 2.43734C14.3768 2.47936 14.469 2.54095 14.5466 2.61859C14.6243 2.69623 14.6859 2.7884 14.7279 2.88984C14.7699 2.99128 14.7915 3.1 14.7915 3.2098C14.7915 3.3196 14.7699 3.42833 14.7279 3.52977C14.6859 3.63121 14.6243 3.72338 14.5466 3.80102L13.7033 4.64439L12.5206 3.46223L13.3642 2.61859C13.4418 2.54095 13.534 2.47936 13.6355 2.43734ZM11.5188 4.46397L12.7015 5.64612L9.77413 8.57352C9.62646 8.72119 9.43911 8.82137 9.23442 8.86231L8.0694 9.09549L8.30199 7.93125C8.34307 7.72679 8.44378 7.5388 8.59135 7.39144L11.5188 4.46397Z"
              fill="#7E7E80"
            />
            <path
              d="M2.32236 4.32105C2.50208 4.14133 2.74583 4.04036 3 4.04036H5.5C5.8912 4.04036 6.20833 3.72323 6.20833 3.33203C6.20833 2.94083 5.8912 2.6237 5.5 2.6237H3C2.37011 2.6237 1.76602 2.87392 1.32062 3.31932C0.875222 3.76472 0.625 4.36881 0.625 4.9987V14.1654C0.625 14.7953 0.875222 15.3993 1.32062 15.8447C1.76602 16.2901 2.37011 16.5404 3 16.5404H12.1667C12.7966 16.5404 13.4006 16.2901 13.846 15.8447C14.2914 15.3993 14.5417 14.7953 14.5417 14.1654V11.6654C14.5417 11.2742 14.2245 10.957 13.8333 10.957C13.4421 10.957 13.125 11.2742 13.125 11.6654V14.1654C13.125 14.4195 13.024 14.6633 12.8443 14.843C12.6646 15.0227 12.4208 15.1237 12.1667 15.1237H3C2.74583 15.1237 2.50208 15.0227 2.32236 14.843C2.14263 14.6633 2.04167 14.4195 2.04167 14.1654V4.9987C2.04167 4.74453 2.14263 4.50078 2.32236 4.32105Z"
              fill="#7E7E80"
            />
          </svg>

          Редактировать
        </ReglamentSmallButton>
      </div>
    </div>
    <div
      v-if="!isTesting"
      class="mt-[15px] p-7 bg-white rounded-[28px]"
    >
      <div class="flex justify-start leading-[30px] text-[13px] text-[#424242]">
        <div class="pr-2 border-r border-gray-200">
          <span class="font-medium pr-3">Отдел:</span><span class="text-[12px]">{{ reglamentDep }}</span>
        </div>
        <div class="ml-2 flex">
          <span class="font-medium pr-3">Автор:</span>
          <EmployeeProfile
            :photo="creatorFoto"
            :name="creatorName"
          />
        </div>
      </div>
      <div
        v-if="reglamentEditors.length"
        class="flex justify-start leading-[30px] text-[13px] text-[#424242] flex-wrap"
      >
        <span class="font-medium pr-3">Редакторы:</span>
        <EmployeeProfile
          v-for="editor in reglamentEditors"
          :key="editor"
          class="mr-3"
          :photo="editorFoto(editor)"
          :name="editorName(editor)"
        />
      </div>

      <div
        v-if="!isEditing && !isTesting && questions.length > 0 && !isContributor && shouldShowButton"
        class="flex justify-center"
      >
        <button
          class="flex items-end bg-[#FF912380] p-3 px-10 rounded-[8px] mt-2 text-black text-sm mr-1 hover:bg-[#F5DEB3]"
          @click="startTheReglament"
        >
          Пройти тест
        </button>
      </div>
    </div>
    <div
      v-if="!isTesting && contributors.length"
      class="mt-5"
    >
      <button
        class="flex items-center font-['Roboto'] text-[#424242] dark:bg-gray-700 dark:text-gray-100 rounded-lg text-[13px] font-medium hover:text-black transition"
        @click="showEmployees = !showEmployees"
      >
        <span class="mr-1.5">Сотрудники, прошедшие регламент</span>
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.750134 0.493017C0.397701 0.850149 0.40151 1.42536 0.758642 1.7778L5.17757 6.13858C5.51147 6.46809 6.04134 6.48919 6.40039 6.18728L11.1876 2.16194C11.5716 1.83903 11.6211 1.26594 11.2982 0.881909C10.9753 0.497881 10.4022 0.448338 10.0182 0.771252L5.86461 4.26382L2.03491 0.484509C1.67778 0.132076 1.10257 0.135885 0.750134 0.493017Z"
            fill="#4C4C4D"
          />
        </svg>
      </button>
      <div
        v-if="showEmployees"
        class="flex items-center mt-2.5 pb-2 flex-wrap gap-y-[10px]"
      >
        <button
          v-if="canEdit"
          class="flex items-center h-[30px] mr-3 px-[10px] py-[5px] bc-none border-none text-xs text-[#4C4C4D]"
          @click="clearContributors"
        >
          <svg
            class="mr-1.5"
            width="20"
            height="20"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.37364 15.8768H17.7486V17.1268H3.37364V15.8768ZM16.1111 5.57051L11.1549 0.620514C11.0388 0.504294 10.9009 0.412095 10.7492 0.34919C10.5974 0.286284 10.4348 0.253906 10.2705 0.253906C10.1062 0.253906 9.94359 0.286284 9.79184 0.34919C9.64009 0.412095 9.50223 0.504294 9.38614 0.620514L0.636139 9.37051C0.519919 9.48661 0.42772 9.62447 0.364815 9.77621C0.30191 9.92796 0.269531 10.0906 0.269531 10.2549C0.269531 10.4192 0.30191 10.5818 0.364815 10.7336C0.42772 10.8853 0.519919 11.0232 0.636139 11.1393L3.45489 14.0018H9.44864L16.1111 7.33926C16.2274 7.22317 16.3196 7.08531 16.3825 6.93357C16.4454 6.78182 16.4777 6.61916 16.4777 6.45489C16.4777 6.29062 16.4454 6.12796 16.3825 5.97621C16.3196 5.82447 16.2274 5.68661 16.1111 5.57051ZM8.92989 12.7518H3.99864L1.49864 10.2518L5.44239 6.30801L10.3986 11.258L8.92989 12.7518ZM11.2799 10.4018L6.32989 5.44551L10.2486 1.50176L15.2486 6.45801L11.2799 10.4018Z"
              fill="#4C4C4D"
            />
          </svg>

          Очистить
        </button>
        <EmployeeProfile
          v-for="contributor in contributorsInfo"
          :key="contributor.uid"
          class="mr-3"
          :photo="contributor.photo"
          :name="contributor.name"
        />
      </div>
    </div>
  </div>

  <!-- Режим прохождение теста -->
  <ReglamentTest
    v-if="isTesting"
    :reglament="reglament"
    @exitTestingMode="isTesting = false"
  />
</template>

<script>
import * as REGLAMENTS from '@/store/actions/reglaments.js'

import ReglamentTestLimit from '@/components/Reglaments/ReglamentTestLimit.vue'
import ReglamentEditLimit from '@/components/Reglaments/ReglamentEditLimit.vue'
import ReglamentSmallButton from '@/components/Reglaments/ReglamentSmallButton.vue'

import '@vueup/vue-quill/dist/vue-quill.snow.css'
// import NavBarButtonsReglament from '@/components/Navbar/NavBarButtonsReglament'
import ReglamentContentEditor from '@/components/Reglaments/ReglamentContentEditor'
import EmployeeProfile from '../Employees/EmployeeProfile.vue'
import ReglamentTest from '@/components/Reglaments/ReglamentTest'
import * as TASK from '@/store/actions/tasks'

export default {
  components: {
    ReglamentTest,
    ReglamentContentEditor,
    // NavBarButtonsReglament,
    ReglamentSmallButton,
    ReglamentEditLimit,
    ReglamentTestLimit,
    EmployeeProfile
  },
  data () {
    return {
      showTestLimit: false,
      isEditing: false,
      showEditLimit: false,
      isTesting: false,
      showCompleteMessage: false,
      isPassed: 0,
      showCheckMark: false,
      firstInvalidQuestionUid: null,
      showEmployees: false
    }
  },
  computed: {
    reglament () {
      return this.currReglament
    },
    currReglament () {
      return this.$store.state.reglaments.reglaments[this.$route.params.id]
    },
    questions () {
      return this.$store?.state?.reglaments?.reglamentQuestions
    },
    reglamentTitle () {
      return this.currReglament?.name ?? ''
    },
    reglamentContent () {
      return this.currReglament?.content ?? ''
    },
    reglamentCreatorEmail () {
      return this.currReglament?.email_creator ?? ''
    },
    reglamentDep () {
      const department = this.currReglament?.department_uid ?? ''
      const dep = this.$store.state.departments.deps[department]
      return dep?.name || 'Общий для всех отделов'
    },
    reglamentEditors () {
      return this.currReglament?.editors ?? []
    },
    isContributor () {
      for (let i = 0; i < this.contributors.length; i++) {
        if (this.contributors[i].uid_user === this.user.current_user_uid) {
          return true
        }
      }
      return false
    },
    contributors () {
      return this.$store?.state?.reglaments?.contributors
    },
    contributorsInfo () {
      return this.contributors.map((contributor) => {
        const user = this.$store.state.employees.employees[contributor.uid_user]
        return {
          uid: contributor.uid_user,
          photo: user?.fotolink ?? '',
          name: user?.name || user?.email || '???'
        }
      })
    },
    needStartEdit () {
      return this.currReglament?.needStartEdit ?? false
    },
    editorsCanEdit () {
      return this.currReglament?.editors?.includes(this.$store.state.user.user.current_user_email)
    },
    userType () {
      return this.$store.state.employees.employees[this.$store.state.user.user.current_user_uid].type
    },
    canEdit () {
      return (this.currReglament?.email_creator === this.user.current_user_email) || (this.editorsCanEdit) || (this.userType === 2 || this.userType === 1)
    },
    user () {
      return this.$store.state.user.user
    },
    shouldShowButton () {
      let hasRightAnswers = false
      for (let i = 0; i < this.questions.length; i++) {
        for (let j = 0; j < this.questions[i].answers.length; j++) {
          if (this.questions[i].answers[j].is_right) {
            hasRightAnswers = true
            return hasRightAnswers
          }
        }
      }
      return hasRightAnswers
    },
    creatorName () {
      return this.$store.state.employees.employeesByEmail[this.reglamentCreatorEmail]?.name || this.reglamentCreatorEmail
    },
    creatorFoto () {
      return this.$store.state.employees.employeesByEmail[this.reglamentCreatorEmail]?.fotolink
    }
  },
  watch: {
    isEditing (newval, oldval) {
      if (!newval) {
        setTimeout(() => {
          try {
            document.querySelector('div.ql-toolbar').remove()
          } catch (e) {}
        }, 50)
      }
    },
    needStartEdit: {
      immediate: true,
      handler: function (val) {
        if (val) {
          // убираем needStartEdit - чтобы следующий раз не редактировался
          const reglaments = this.$store.state.navigator.navigator.reglaments
          const index = reglaments.items.findIndex(item => item.uid === this.currReglament?.uid)
          if (index !== -1) reglaments.items[index].needStartEdit = false
          //
          this.setEdit()
        }
      }
    }
  },
  mounted () {
    if (!this.currReglament) {
      this.$router.push('/reglaments')
      return
    }

    this.$store.commit('basic', {
      key: 'reglamentSource',
      value: { uid: '92413f6c-2ef3-476e-9429-e76d7818685d', param: this.currReglament.uid }
    })

    this.$store.commit(TASK.CLEAN_UP_LOADED_TASKS)

    const navElem = {
      name: this.currReglament.name,
      key: 'greedSource',
      uid: this.currReglament.uid,
      global_property_uid: '92413f6c-2ef3-476e-9429-e76d7818685d',
      greedPath: 'reglament_content',
      value: []
    }

    this.$store.commit('pushIntoNavStack', navElem)
    this.$store.commit('basic', { key: 'greedSource', value: this.currReglament })
    this.$store.commit('basic', { key: 'greedPath', value: 'reglament_content' })

    this.$store.dispatch(REGLAMENTS.REGLAMENT_REQUEST, this.currReglament?.uid)
    this.$store.dispatch(REGLAMENTS.GET_USERS_REGLAMENT_ANSWERS, this.currReglament?.uid)
    try {
      if (!this.isEditing) {
        document.querySelector('div.ql-toolbar').remove()
      }
    } catch (e) {}
  },
  methods: {
    setEdit () {
      if (this.user.tarif !== 'alpha' && this.user.tarif !== 'trial') {
        this.showEditLimit = true
        return
      }

      this.isEditing = true
    },
    startTheReglament () {
      if (this.user.tarif !== 'alpha' && this.user.tarif !== 'trial') {
        this.showTestLimit = true
        return
      }
      this.isTesting = true
      window.scrollTo(0, 0)
    },
    editorName (email) {
      return this.$store.state.employees.employeesByEmail[email]?.name
    },
    editorFoto (email) {
      return this.$store.state.employees.employeesByEmail[email]?.fotolink
    },
    clearContributors () {
      this.$store.dispatch(REGLAMENTS.DELETE_USERS_REGLAMENT_ANSWERS, this.reglament.uid)
    },
    getBack () {
      this.$store.commit('basic', { key: 'mainSectionState', value: 'greed' })
      this.$store.commit('basic', { key: 'greedPath', value: 'reglaments' })
      this.$store.commit('basic', { key: 'greedSource', value: this.$store.getters.sortedNavigator.reglaments.items })
      this.$store.dispatch('popNavStack')
    }
  }
}
</script>
<style>
.ql-snow .ql-tooltip {
  @apply z-30
}
.ql-snow .ql-tooltip[data-mode=link]::before {
  content: "Введите ссылку:";
}
.ql-snow .ql-tooltip[data-mode=video]::before {
  content: "Введите ссылку:";
}
.ql-editor > * {
  word-break: break-word;
  overflow: hidden;
}
</style>
