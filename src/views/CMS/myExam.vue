<template>
  <div class="myExam_cont">

    <!--我的考试-->
      <el-col :span="16">

        <div style="margin-bottom: 20px;">
          <el-button
            size="small"
            @click="addTab(editableTabsValue2)"
          >
            add tab
          </el-button>
        </div>
        <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="(item, index) in editableTabs2"
            :key="item.name"
            :label="item.title"
            :name="item.title">
            {{item.content}}
          </el-tab-pane>
        </el-tabs>


      </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'

  export default {
    name: 'myExam',
    data() {
      return {
        editableTabsValue2: 'Tab 1',
        editableTabs2: [{
          title: 'Tab 1',
          name: '1',
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }

    },
    computed: {},
    methods: {
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      }
    },
    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

</style>
