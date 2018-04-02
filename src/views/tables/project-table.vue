<style lang="less">
@import "../../styles/common.less";
@import "./components/table.less";
</style>

<template>
    <div>
        <Row>
            <Input v-model="searchConName1" icon="search" @on-change="handleSearch"  placeholder="请输入姓名搜索..." style="width: 200px" />  
            <Table :columns="projectColumn" :columns="projectColumn" :data="projectData"></Table>
            <Page :total="projectTotal" @on-page-size-change="sizeChange" @on-change="change" show-sizer></Page>
        </Row>
    </div>
</template>

<script>
import js from "./js/project-table";
export default js;
</script>
