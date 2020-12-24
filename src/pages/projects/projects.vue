<template>
  <div class="project_wrapper clearfix">
    <div v-for="(value,key,index) in projectsJson"
         :key="index"
         class="each_career clearfix">
      <h1>{{key}}</h1>
      <projectTem
        v-for="childItem of value"
        :key="childItem.id"
        :bgImg="childItem.img"
        :titleInf="childItem.title"
        :desc="childItem.desc"
        :tags="childItem.tags"
      ></projectTem>
    </div>
    <div class="animation_menu">
      <div class="each_menu"
           v-for="(item, index) in parentsName"
           :key='index'
           @click="jumpToRelate(item)"
      >{{item}}
      </div>
    </div>
  </div>
</template>

<script>
    import projectTem from './components/projectTem'

    export default {
        name: "projects",
        components: {
            projectTem
        },
        data() {
            return {
                projectsJson: {},
                parentsName: []
            }
        },
        methods: {
            getProject() {
                this.$ajax.get('/mock/projects.json') // npm run build ==>  ./static/mock/index.json
                    .then(this.getProjectSucc)
                    .catch(function (res) {
                        console.log("error:" + res)
                    })
            },
            getProjectSucc(res) {
                console.log(res);
                if (res.data.code == 200) {
                    const data = res.data.data;
                    this.projectsJson = data;
                    console.log("projectsJson：：：： " + JSON.stringify(this.projectsJson));
                    for (let i in data) {
                        this.parentsName.push(i)
                    }
                }
            },
            jumpToRelate(id) {
                console.log(id)
            }
        },
        mounted() {
            this.getProject()
        }
    }
</script>

<style scoped lang="stylus">
  .project_wrapper
    width: 1200px;
    margin: 0px auto;
    position relative
    .each_career
      width 980px;
      margin: 0px auto;

</style>
