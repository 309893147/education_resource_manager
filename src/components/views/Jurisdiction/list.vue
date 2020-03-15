<template>
    <div>
       <div class="container ">
            <div class="padding_20">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="后台功能权限" name="first">
                        <div>
                            <el-table
                            :data="tableData"
                            :span-method="objectSpanMethod"
                            border
                            style="width: 100%; margin-top: 20px">
                            <el-table-column
                                prop="id"
                                label="一级"
                                align='center'
                                width="180">
                            </el-table-column>
                            <el-table-column
                              align='center'
                                prop="name"
                                label="二级">
                            </el-table-column>
                            <el-table-column
                              align='left'
                                prop="amount1"
                                label="权限管理">
                            </el-table-column>
                            <el-table-column
                              align='center'
                                prop="amount2"
                                label="全选">
                            </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="APP功能权限" name="second"></el-tab-pane>
                </el-tabs>
            </div>
       </div>
    </div>
</template>

<script>
export default {
    name: 'block',
    data() {
        return {
            activeName:'first',
           tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
        };
    },
    created() {
       
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        // if(columnIndex==0 && rowIndex % 2 === 0){
        //     return {
        //       rowspan: 2,
        //       colspan: 1
        //     };
        // }
         
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
};
</script>

<style scoped>

</style>
