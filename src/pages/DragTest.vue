<template>
  <div>
    <div class="content">
      <div class="sub1"></div>
      <div class="sub3">
        <VueDraggable v-model='list1' animation='150' ghostClass='ghost'
          :group="{ name: 'people', pull: 'clone', put: false }" :clone='clone' :sort='false'>
          <div style='border:1px solid; width: 100px; height: 30px; margin: 1%; border-radius: 5px;'
            v-for='item in list1' :key='item.para' @click="handleClick(item)">
            {{ item.name }}
          </div>
        </VueDraggable>
        <el-tabs v-model="activeName" ref="tabs">
          <el-tab-pane label="1" name="first">{{ paraAAA }}</el-tab-pane>
          <el-tab-pane label="2" name="second">{{ paraBBB }}</el-tab-pane>
          <el-tab-pane label="3" name="third">{{ paraCCC }}</el-tab-pane>
          <el-tab-pane label="4" name="fourth">{{ paraDDD }}</el-tab-pane>
        </el-tabs>
      </div>
      <div class="sub4">
        <VueDraggable target="tbody" v-model="userList" :animation="150" group='people'
          ghostClass='ghost'>
          <el-table :data="userList">
            <el-table-column label="Name" prop="name" />
            <el-table-column label="Para" prop="para" />
            <el-table-column label="Opt" v-slot="{ row, $index }">
              <el-button @click="deleteItem(row, $index)" icon="el-icon-delete" circle></el-button>
            </el-table-column>
          </el-table>
          {{ userList }}
        </VueDraggable>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import 'element-ui/lib/theme-chalk/index.css';

const currentInstance = ref();
const activeName = ref('second');
const inputVal = ref('CCC');
const paraAAA = ref('1');
const paraBBB = ref('2');
const paraCCC = ref('3');
const paraDDD = ref('4');

const list1 = ref([
  {
    name: 'AAA',
    para: paraAAA,
  },
  {
    name: 'BBB',
    para: paraBBB,
  },
  {
    name: inputVal,
    para: paraCCC,
  },
  {
    name: 'DDD',
    para: paraDDD,
  },
]);

const userList = ref([
]);

function deleteItem(row, index) {
  userList.value.splice(index, 1);
}
function handleClick(item) {
  if (item.name === 'AAA') {
    activeName.value = 'first';
  }
  if (item.name === 'BBB') {
    activeName.value = 'second';
  }
  if (item.name === 'CCC') {
    activeName.value = 'third';
  }
  if (item.name === 'DDD') {
    activeName.value = 'fourth';
  }
}
onMounted(() => {
  currentInstance.value = getCurrentInstance();
  currentInstance.value.proxy.$refs.tabs.$children[0].$el.style.display = 'none';
});
</script>

<style>
.el-table .el-table__row,
.el-table .el-table__header {
  border-bottom: 1px solid #d3dce6;
}

.el-table .el-table__body tr td {
  padding: 10px 0;
  border-bottom: 1px solid #d3dce6;
  ;
}

.content {
  display: flex;
  margin-top: 5%;
}

.content .sub1 {
  width: 15%;
}

.content .sub2 {
  width: 70%;
}

.content .sub3 {
  width: 30%;
}

.content .sub4 {
  width: 40%;
}
</style>
