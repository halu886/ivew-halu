<style lang="less">
@import "../../styles/common.less";
</style>

<template>
    <div>
        <Row>
            <Col span="5">
            <Card>
                <Row>
                    <Col span="18">
                    <Select v-model="selectProject" style="width:200px" @on-change="changeHandler" label-in-value>
                        <Option v-for="item in projects" :value="item.projectID" :label="item.name" :key="item.projectID">{{item.name}}</Option>
                    </Select>
                    </Col>
                    <Col span="6">
                    <button value="新增根任务" @click="addRootTask" />
                    </Col>
                    <Tree ref="taskTree" :data="task" :render="renderTaskTree" @on-select-change="treeSelectHandler"></Tree>
                </Row>
            </Card>
            </Col>
            <Col span="19">
            <Card>
                <Form :model="showTask" inline>
                    <FormItem prop="showTask.name">
                        <Input type="text" v-model="showTask.name" placeholder="任务名称" disabled>
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="showTask.description">
                        <Input type="text" v-model="showTask.description" placeholder="任务描述" disabled>
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="submit()">保存</Button>
                        <Button type="primary" @click="modify()">修改</Button>
                        <Button type="primary" @click="overTask()">完结</Button>
                    </FormItem>
                </Form>
            </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
import js from "./js/task-check";
export default js;
</script>
