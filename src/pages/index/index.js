import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot.vue'
import { InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll)

new Vue({
    el:'#app',
    data:{
        lists:null,
        pageNum:1,
        pageSize:6,
        loading:false,
        allLoaded:false,
    },
    components:{
        Foot
    },
    created(){
        this.getLists()
    },
    methods:{
        getLists(){
            if(this.allLoaded) return
            this.loading = true
            axios.get(url.hotLists,{
                pageNum:this.pageNum,
                pageSize:this.pageSize,
            }).then((res)=>{
                let curLists = res.data.lists
                //判断所有数据是否加载完毕
                if(this.pageSize.length < curLists){
                    this.allLoaded = true
                }
                if(this.lists){
                    this.lists = this.lists.concat(curLists)
                }else{
                    //第一次请求数据
                    this.lists = res.data.lists
                }
                this.loading = false
                this.pageNum++
            })
        }
    }
})
