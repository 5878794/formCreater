import { defineComponent, watch, inject, ref, reactive, toRefs } from 'vue'
import formStyle from './css/formStyle.module.scss'
import { formItemType } from '@/components/input/input.type'
import formDom from './index'
import button from '../input/index'
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
import handlerData from './fn/addList_handlerData'
import guid from './fn/guid'

// TODO 未完成 分页功能、获取数据等

export default defineComponent({
  name: 'add-list',
  components: { ElTableColumn, ElTable },
  props: {
    canMdf: { type: Boolean, default: true },
    labelWidth: { type: String, default: '120px' },
    serverData: {
      type: Object, default: () => ({})
    },
    formSetting: {
      type: Array, default: () => ([])
    },
    id: { type: String, default: '' },
    pagination: { type: Boolean, default: true },
    submitData: { type: Object, default: () => ({}) },
    rowIndex: { type: Array, default: () => ([]) }
  },
  setup (props, { expose }) {
    const root = inject('root')
    const fns = inject('fns')
    const cache = reactive<{ data: any, show: any, formData: any, delIds: string[] }>({
      data: [],
      show: [],
      formData: {},
      delIds: []
    })
    handlerData(
      props.serverData,
      props.formSetting as formItemType[],
      cache
    )

    const addListMainRef = ref(null)
    const getAndCheckFormData = () => {
      return (addListMainRef.value as any).checkAndGetData()
    }
    const add = (data: any) => {
      const back: any = {}
      const form = addListMainRef.value as any
      for (const [key, val] of Object.entries(data)) {
        const info = form.find(key).getParam()
        const options = info.options
        const label = options
          ? options.find((item: any) => item.value.toString() === (val as any).toString())?.label
          : val
        back[key] = { label, value: val }
        back.__guid__ = guid()
      }
      cache.data.push(back)
    }
    const del = (guid?: string) => {
      const delIds = guid ? [guid] : cache.delIds
      const newData: any = []
      cache.data.map((rs: any) => {
        if (!delIds.includes(rs.__guid__)) {
          newData.push(rs)
        }
        return null
      })
      cache.data = newData
    }

    const currentPage = ref(1)
    const totalPage = ref(1)

    const getData = () => {
      return []
    }

    const checkFiled = () => {
      return true
    }

    const find = (key: string) => {
      //
    }

    const checkAndGetData = () => {
      const pass = checkFiled()
      const data = getData()

      return {
        pass: pass,
        data: data

      }
    }

    const refreshFormData = (data: any) => {
      cache.formData = data
    }
    const selectionChangeFn = (ids: any) => {
      const back: string[] = []
      ids.map((obj: any) => {
        back.push(obj.__guid__)
        return null
      })
      cache.delIds = back
    }
    const handlerCurrentChangeFn = (page: any) => {
      console.log(page)
    }

    expose({ getData, checkFiled, find, checkAndGetData })
    return {
      getData,
      checkFiled,
      find,
      checkAndGetData,
      fns,
      add,
      del,
      addListMainRef,
      getAndCheckFormData,
      refreshFormData,
      selectionChangeFn,
      handlerCurrentChangeFn,
      currentPage,
      totalPage,
      ...toRefs(cache)
    }
  },
  render () {
    const renderAddInputs = () => {
      const tag = formDom
      return <tag
        uploadFn={(this.fns as any).uploadFn}
        showBigImageFn={(this.fns as any).showBigImageFn}
        ref="addListMainRef"
        serverData={this.formData}
        formSetting={this.formSetting}
        labelWidth={this.labelWidth}
        rule={(this.fns as any).rule}
        onChange={(obj: any) => {
          this.refreshFormData(obj.formData)
        }}
      />
    }

    const renderButton = () => {
      const tag = button
      const addBtnParam = {
        type: 'button',
        label: '增加',
        style: 'width:100px;',
        buttonIcon: 'CirclePlusFilled',
        clickFn: () => {
          const rs = this.getAndCheckFormData()
          if (rs.pass) {
            this.add(rs.data)
          }
        }
      }
      const delBtnParam = {
        type: 'button',
        label: '删除',
        style: 'margin-left:100px; width:100px;',
        buttonIcon: 'RemoveFilled',
        buttonType: 'danger',
        clickFn: () => {
          this.del()
        }
      }
      return <div>
        <tag propData={addBtnParam}/>
        <tag propData={delBtnParam}/>
      </div>
    }

    const renderTable = () => {
      return <el-table
        height='190'
        data={this.show}
        tableLayout='fixed'
        onSelectionChange={this.selectionChangeFn}
      >
        <el-table-column type='selection' width='55px'/>
        {
          this.formSetting.map((item: any) => {
            return <el-table-column
              property={item.key}
              label={item.label}
            />
          })
        }
        <el-table-column
          width='80px'
          label='操作'
          v-slots={
            {
              default: (scope: any) => {
                const fn = () => {
                  this.del(scope.row.__guid__)
                }
                return <div onClick={fn}>del</div>
              }
            }
          }
        />
      </el-table>
    }

    const renderPagination = () => {
      return <ElPagination
        v-model:currentPage={this.currentPage}
        page-size='10'
        small={false}
        total={this.totalPage}
        layout='total,prev,pager,next'
      />
    }

    return <div class={[formStyle.form_item, '__add_list__']}>
      {renderAddInputs()}
      {renderButton()}
      {renderTable()}
      {this.pagination && renderPagination()}
    </div>
  }
})
