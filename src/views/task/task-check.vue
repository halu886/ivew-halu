<style lang="less">
@import "../../styles/common.less";
</style>

<template>
    <div>
        <Row>
            <Col span="5">
            <Card>
                <Row :gutter="16">
                    <Col span="18">
                    <Select v-model="selectProject" @on-change="changeHandler" label-in-value>
                        <Option v-for="item in projects" :value="item.projectID" :label="item.name" :key="item.projectID">{{item.name}}</Option>
                    </Select>
                    </Col>
                    <Col span="6">
                    <Button type="ghost" shape="circle" icon="plus" @click="appendHandler"></Button>
                    </Col>
                </Row>
                <Row>
                    <Tree ref="taskTree" :data="task" :render="renderTaskTree" on-select-change="treeSelectHandler"></Tree>
                </Row>
            </Card>
            </Col>
            <Col span="19">
            <Card>
                <Form :model="showTask">
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
                    <FormItem prop="showTask.createDate">
                        <Input type="text" v-model="showTask.createDate" placeholder="任务创建时间" disabled>
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="showTask.nodeProgress">
                        <Input type="text" v-model="showTask.nodeProgress" placeholder="任务节点进度" disabled>
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="showTask.progress">
                        <Input type="text" v-model="showTask.progress" placeholder="任务当前进度" disabled>
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="showTask.startDate">
                        <Input type="text" v-model="showTask.startDate" placeholder="任务名称" disabled>
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="showTask.endDate">
                        <Input type="text" v-model="showTask.endDate" placeholder="任务结束时间" disabled>
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="showTask.taskType">
                        <Input type="text" v-model="showTask.taskType" placeholder="任务类型" disabled>
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="showTask.childNum">
                        <Input type="text" v-model="showTask.childNum" placeholder="任务子任务数量" disabled>
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
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
