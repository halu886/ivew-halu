<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8">
            <Row class-name="home-page-row1" :gutter="10">
                <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                <Card>
                    <Row type="flex" class="user-infor">
                        <Col span="8">
                        <Row class-name="made-child-con-middle" type="flex" align="middle">
                            <img class="avator-img" :src="avatorPath" />
                        </Row>
                        </Col>
                        <Col span="16" style="padding-left:6px;">
                        <Row class-name="made-child-con-middle" type="flex" align="middle">
                            <div>
                                <b class="card-user-infor-name">{{user.name}}</b>
                                <p>{{user.role}}</p>
                            </div>
                        </Row>
                        </Col>
                    </Row>
                    <!-- <div class="line-gray"></div> -->
                    <!-- <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                                <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
                            </Row> -->
                    <!-- <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                                <Col span="16" class="padding-left-8">北京</Col>
                            </Row> -->
                </Card>
                </Col>
                <!-- <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="android-checkbox-outline"></Icon>
                                待办事项
                            </p>
                            <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                                <Icon type="plus-round"></Icon>
                            </a>
                            <Modal
                                v-model="showAddNewTodo"
                                title="添加新的待办事项"
                                @on-ok="addNew"
                                @on-cancel="cancelAdd">
                                <Row type="flex" justify="center">
                                    <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
                                </Row>
                                <Row slot="footer">
                                    <Button type="text" @click="cancelAdd">取消</Button>
                                    <Button type="primary" @click="addNew">确定</Button>
                                </Row>
                            </Modal>
                            <div class="to-do-list-con">
                                <div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
                                    <to-do-list-item :content="item.title"></to-do-list-item>
                                </div>
                            </div>
                        </Card>
                    </Col> -->
            </Row>
            </Col>
            <Col :md="24" :lg="16">
            <Row :gutter="5">
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <infor-card id-name="user_created_count" :end-val="project.unHandler" iconType="android-person-add" color="#2d8cf0" intro-text="待完成项目"></infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <infor-card id-name="visit_count" :end-val="project.handler" iconType="ios-eye" color="#64d572" :iconSize="50" intro-text="已完成项目"></infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <infor-card id-name="collection_count" :end-val="task.unHandler" iconType="upload" color="#ffd572" intro-text="待完成任务"></infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <infor-card id-name="transfer_count" :end-val="task.handler" iconType="shuffle" color="#f25e43" intro-text="已完成任务"></infor-card>
                </Col>
            </Row>
            <Row>
                <!-- <Card :padding="0">
                        <p slot="title" class="card-title">
                            <Icon type="map"></Icon>
                            今日服务调用地理分布
                        </p>
                        <div class="map-con">
                            <Col span="10">
                                <map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
                            </Col>
                            <Col span="14" class="map-incon">
                                <Row type="flex" justify="center" align="middle">
                                    <home-map :city-data="cityData"></home-map>
                                </Row>
                            </Col>
                        </div>
                    </Card> -->
            </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="android-map"></Icon>
                    新增任务数量统计
                </p>
                <div class="data-source-row">
                    <visite-volume></visite-volume>
                </div>
            </Card>
            </Col>
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-pulse-strong"></Icon>
                    任务分布统计
                </p>
                <div class="data-source-row">
                    <data-source-pie></data-source-pie>
                </div>
            </Card>
            </Col>
            <Col :md="24" :lg="8">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="android-wifi"></Icon>
                    任务进度统计
                </p>
                <div class="data-source-row">
                    <user-flow></user-flow>
                </div>
            </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    周日任务操作量
                </p>
                <div class="line-chart-con">
                    <service-requests></service-requests>
                </div>
            </Card>
        </Row>
    </div>
</template>
<script>
import js from "./js/home";
export default js;
</script>