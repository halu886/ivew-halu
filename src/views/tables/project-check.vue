<style lang="less">
@import "../../styles/common.less";
@import "./components/table.less";
</style>

<template>
    <div>
        <Card>
            <Button slot="title" icon="plus-circled" @click="handleRender">新建项目</Button>
            <Input slot="extra" v-model="searchConName1" icon="search" @on-change="handleSearch"  placeholder="请输入项目姓名搜索..." style="width: 200px" />  

            <Table  :columns="projectColumn" :data="projectData"></Table>
            <Page :total="projectTotal" @on-page-size-change="sizeChange" @on-change="change" show-sizer></Page>
        </Card>
    </div>
</template>

<script>
import js from "./js/project-check";
export default js;
</script>
