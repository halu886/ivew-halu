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
                <Form :model="showTask" :label-width="120">
                    <FormItem prop="showTask.taskType" label="任务类型">
                        <Input type="text" v-model="showTask.taskType" placeholder="任务类型" :readonly='true'></Input>
                    </FormItem>
                    <FormItem prop="showTask.name" label="任务名称">
                        <Input type="text" v-model="showTask.name" placeholder="任务名称" :readonly='this.isReadonlyForm'>

                        </Input>
                    </FormItem>
                    <FormItem prop="showTask.description" label="任务描述">
                        <Input type="textarea" v-model="showTask.description" placeholder="任务描述" :readonly='this.isReadonlyForm'>

                        </Input>
                    </FormItem>
                    <FormItem prop="showTask.createDate" label="任务创建时间">
                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="showTask.createDate" placeholder="任务创建时间" :readonly='true'>

                        </DatePicker>
                    </FormItem>
                    <FormItem prop="showTask.nodeProgress" label="任务节点进度">
                        <Input type="text" v-model="showTask.nodeProgress" placeholder="任务节点进度" :readonly='true'>

                        </Input>
                    </FormItem>
                    <FormItem prop="showTask.progress" label="任务当前进度">
                        <Input type="text" v-model="showTask.progress" placeholder="任务当前进度" :readonly='true'>

                        </Input>
                    </FormItem>
                    <FormItem prop="showTask.endDate" label="任务开始时间">
                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="showTask.startDate" placeholder="任务开始时间" :readonly='this.isReadonlyForm'>

                        </DatePicker>
                    </FormItem>
                    <FormItem prop="showTask.endDate" label="任务结束时间">
                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="showTask.endDate" placeholder="任务结束时间" :readonly='this.isReadonlyForm'>

                        </DatePicker>
                    </FormItem>
                    <FormItem prop="showTask.childNum" label="子任务数量">
                        <Input type="text" v-model="showTask.childNum" placeholder="子任务数量" :readonly='true'>

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
