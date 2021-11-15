<template>
  <div class="nav_wrapper">
    <div class="mobileMenu">
      <mobileMenu
        :iconImgArr="iconImgArr"
        :startAngle="280"
        :endAngle="170"
        :itemNum="5"
        class="mobileMenu-position "
      >
      </mobileMenu>
    </div>
  </div>
</template>

<script>
    import mobileMenu from './components/mobileNav'
    //import the Nav Icons.(Main menu icon is in Menu.vue)
    import home from './components/icon/home.svg'
    import skill from './components/icon/skill.svg'
    import project from './components/icon/project.svg'
    import blog from './components/icon/blog.svg'
    import contact from './components/icon/contact.svg'

    export default {
        name: "navEl",
        components: {
            mobileMenu,
        },
        methods: {
            // Nav Start 分别指定图标的url ,名称， 以及background-size属性
            genarateIconObj(id, url, name, size, link) {
                let tmp = {}
                tmp.id =id
                tmp.iconUrl = url
                tmp.iconName = name
                tmp.iconSize = size
                tmp.iconLink = link
                return tmp
            },
            // Nav End

        },

        computed: {
            //Nav Start
            iconImgArr() {
                let tmp = []
                tmp.push(this.genarateIconObj(1, home, 'home', '50', "home"))
                tmp.push(this.genarateIconObj(2, skill, 'skill', '50', "skills"))
                tmp.push(this.genarateIconObj(3, project, 'projects', '50', "projects"))
                tmp.push(this.genarateIconObj(4, blog, 'blog', '50', "blog"))
                tmp.push(this.genarateIconObj(5, contact, 'contact', '50', "contact"))
                return tmp
            } //Nav end
        }
    }
</script>

<style scoped lang="stylus">
  .mobileMenu
    z-index 9999999999
    .mobileMenu-position
      position: fixed
      bottom: 1.7rem
      right: 1.7rem
</style>
