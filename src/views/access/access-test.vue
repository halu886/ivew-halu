<template>
  <div>
    <Row>
      <Col>
      <Card>
        <Button type="primary" icon="ios-search" @click="addUserHandler">新增用户</Button>
      </Card>
      </Col>
    </Row>
    <Row>
      <Col>
      <Card>
        <Table border :columns="columns" :data="users"></Table>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import js from "./access-test.js";
export default js;
</script>

<style>

</style>
