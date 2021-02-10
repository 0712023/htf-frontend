<template>
    <div id="standard">
        <select v-model="mode">
            <option value="admin" selected>Admin</option>
            <option value="member">Member</option>
            <option value="vendor">Vendor</option>
        </select>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <AdminLogin v-if="mode=='admin'"/>
        <MemberLogin v-if="mode=='member'"/>
        <VendorLogin v-if="mode=='vendor'"/>
    </div>
</template>

<script>
import AdminLogin from './Login/AdminLogin'
import MemberLogin from './Login/MemberLogin'
import VendorLogin from './Login/VendorLogin'
export default {
    data(){
        return {mode:"admin"}
    },
    components:{
        AdminLogin, MemberLogin, VendorLogin
    }
}
</script>

<style>
 @import '../assets/css/style.css';
</style>
