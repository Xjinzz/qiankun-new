<template>
  <div>
    <a-card>
      <a-row>
        <a-form layout="inline" :form="form">
          <a-form-item label="input">
            <a-input placeholder="input"/>
          </a-form-item>
        </a-form>
      </a-row>
      <a-row class="btnList">
        <a-button type="primary">查询</a-button>
        <a-button type="default">重置</a-button>
      </a-row>
    </a-card>
    <a-card>
      <h3>TABLE</h3>
      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle">Name</span>
        <span slot="action">
          <a>actions</a>
        </span>
      </a-table>
    </a-card>
  </div>
</template>
<script>
export default {
  name: 'ContinerCard',
  data () {
    return {
      form: this.$form.createForm(this, { name: 'test' }),
      columns: [
        {
          dataIndex: 'name',
          key: 'name',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'name' }
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York'
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London'
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney'
        },
        {
          key: '4',
          name: 'Jim Blue',
          age: 35,
          address: 'Toronto'
        },
        {
          key: '5',
          name: 'Tom Yellow',
          age: 15,
          address: 'Tokyo'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.btnList{
  margin-top:10px;
  text-align: right;
}
</style>
