<template>
    <div>
        <table border="1" width="1000">
            <thead> 
            <tr>
                <template v-for="(val, key) in memberInfo" >
                    <th width="500" :key="key" class="row.header">{{key}}</th>
                </template>
            </tr>
            </thead>
            <tbody>
                <template v-for="(val, key) in memberInfo" >
                    <td width="500" :key="key">{{val}}</td>
                </template>
            </tbody>
            <tbody>
                <template v-for="(val, key) in memberInfo" >
                    <td width="500" :key="key"><button v-if="key != 'address' && key != 'memId'" @click="UpdateModalShow(key)">update {{key}}</button></td>
                </template>
            </tbody>
        </table>
        <modal name="UpdateMember"><UpdateMember :updateColumn.sync="updateColumn"/></modal>
    </div>
</template>

<script>
import axios from 'axios';
import EventBus from "../../store/Eventbus";
import UpdateMember from "../Modal/UpdateMember";
export default {
    data(){
        return {
            dataColumn:['memId', 'memPw', 'memRank', 'email', 'contact', 'address'],
            memberInfo:null,
            updateColumn:null
        }
    },
    components: {
        UpdateMember
    },
    mounted(){
        this.getMemberData();
    },
    created: function () {
        EventBus.$on("modal", () => this.getMemberData());
    },
    methods: {
        UpdateModalShow(col) {
            if(col == 'memRank'){
                this.$router.push("/subscribe/");
            } else{
                this.updateColumn = col;
                this.$modal.show("UpdateMember");
            }
        },
        getMemberData(){
            this.$modal.hide("UpdateMember");   
            axios.post(`${this.$store.state.BACK_SERVER}/getMember`, {"memId":this.$cookies.get("memId")}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
            .then((res)=>{
                let resJson = {};
                for(let key of this.dataColumn){
                    if(key == 'memPw'){
                        resJson[key] = "";
                        for(let i = 0; i< res.data[key].length; i++){
                            resJson[key]+='*';
                        }
                    } else{
                        resJson[key] = res.data[key];
                    }
                }
                this.memberInfo = resJson;
            })
        }
    },
}
</script>