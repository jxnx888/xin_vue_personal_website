<template>
  <div class="floatLayer">
    <a class="close-btn" href="javascript:;" @click.stop="closeView">×</a>
    <img :src="json.src" alt="">
  </div>
</template>
<!--父组件调用-->
<!--<animatedWindow :class="showView?'':''" :json="json" @closeView="closeView"/>
data(){
return {
  timer:'',
  showView:true,
  json:{
    src: '/image/skills/random.jpg',
    url: '',
    left: Math.random()*$(".skill_container").width(),
    top: Math.random()*$(".skill_container").height(),
    directionX: 1,
    directionY: 1,
    distance: null,
    interval: null,
    target: null,
    zIndex: null,
    width: null,
    height: null,
    noHoverPause: null, //鼠标经过时不停止，为true时不停止
  cursor: null,
  },
  }
},
methods:{
  closeView(){
  this.showView=false;
  },
}-->
<script>
    export default{
        data(){
            return{
                object: [],
                left:0,
                top:0,
                interval:30,
                distance:2,
                directionX:1,
                directionY:1,
                zIndex:100,
                target:"_blank",
                cursor:"pointer",
                i:0
            }
        },
        props:['json'],
        mounted(){
            this.init(this.json);
        },
        methods:{
            closeView(){
                this.$emit("closeView");
            },
            init(json){
                var obj = document.querySelector(".floatLayer");
                //自定义
                obj.left=parseInt(json.left || this.left);
                obj.top = parseInt(json.top || this.top);
                obj.interval = json.interval || this.interval;
                obj.distance = json.distance || this.distance;
                obj.directionX = json.directionX || this.directionX;
                obj.directionY = json.directionY || this.directionY;
                obj.index = this.object.length;
                obj.url = json.url;
                obj.target = json.target || this.target;
                obj.t=null;
                //事件
                if (obj.url != undefined){
                    obj.@click = function () {
                        switch (this.target) {
                            case "_blank":
                                open(this.url);
                                break;
                            case "_parent":
                                parent.location = this.url;
                                break;
                            case "_top":
                                top.location = this.url;
                                break;
                            case "_self":
                                location = this.url;
                                break;
                        }
                    }
                }
                if (!json.noHoverPause) {
                    obj.onmouseover = function () {
                        clearInterval(this.t);
                    }
                    obj.onmouseout = function () {
                        obj.t=setInterval(function(){that.float(obj.index)}, obj.interval);
                    }
                }
                obj.src = json.src;
                obj.style.cursor = json.cursor || this.cursor;
                obj.style.position = "absolute";
                obj.style.left = obj.left + "px";
                obj.style.top = obj.top + "px";
                obj.style.zIndex = json.zIndex || this.zIndex;
                obj.style.width = json.width || "";
                obj.style.height = json.height || "";
                obj.style.directionX=json.directionX || this.directionX;
                obj.style.directionY=json.directionY || this.directionY;
                this.object.push(obj);
                //console.log(this.object)
                document.body.appendChild(obj);
                let that=this;
                // console.log(obj.t)
                obj.t=setInterval(function(){that.float(obj.index)}, obj.interval);
            },
            float(index) {
                //console.log("dd",index);
                var pageWidth = document.documentElement.clientWidth;
                var pageHeight = document.documentElement.clientHeight;
                var scrollLeft = document.documentElement.scrollLeft;
                var scrollTop = document.documentElement.scrollTop;

                var obj = this.object[index];
                //console.log("s",obj)

                obj.left = obj.left + obj.directionX * obj.distance;
                if (obj.left <= scrollLeft) {
                    obj.left = scrollLeft;
                    obj.directionX = 1;
                }
                if (obj.left + obj.offsetWidth >= pageWidth + scrollLeft - 1) {
                    obj.left = pageWidth + scrollLeft - 1 - obj.offsetWidth;
                    obj.directionX = -1;
                }

                obj.top = obj.top + obj.directionY * obj.distance;
                if (obj.top <= scrollTop) {
                    obj.top = scrollTop;
                    obj.directionY = 1;
                }
                if (obj.top + obj.offsetHeight >= pageHeight + scrollTop - 1) {
                    obj.top = pageHeight + scrollTop - 1 - obj.offsetHeight;
                    obj.directionY = -1;
                }

                obj.style.left = obj.left + "px";
                obj.style.top = obj.top + "px";
            }

        }
    }
</script>
<style>
  .floatLayer{
    position:fixed;
    left:0;
    top:0;
    z-index:100;
  }
  .close-btn{
    display:block;
    position:absolute;
    right:0px;
    top:0px;
    width:40px;
    height:40px;
    line-height:40px;
    text-align: center;
    overflow:hidden;
    font-size: 30px;
    background:#ccc;
    color:#fff;
    z-index:110;
  }
  .close-btn:hover{
    color:#B50900;
    background:#ccc;
  }
  .floatLayer img{
    position:relative;
    z-index:101;
  }
</style>
