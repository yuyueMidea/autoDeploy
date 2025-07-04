<template>
    <div class="p-5">
        <h1>前端对用户信息加密与解密</h1>
        <div class="border">
            <p class="p-5">
                <span class="inline w-100">username</span>
                <input type="text" v-model="username" class="border p-5 m-5" />
            </p>
            <p class="p-5">
                <span class="inline w-100">email</span>
                <input type="text" v-model="email" class="border p-5 m-5" />
            </p>
            <p class="p-5">
                <span class="inline w-100">token</span>
                <input type="text" v-model="token" class="border p-5 m-5" />
            </p>
            <p class="p-5">
                <button v-track.click="'cryptoBtn'" v-permission="'admin'" class="btn" @click="setEncrypto">加密</button>
                <button v-track.click="'cryptoBtn'" v-permission="'admin'" class="btn" @click="getDecryptData">解密</button>
                <span class="inline w-500">{{ uKey }}</span>
            </p>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { decryptData, encryptData, exportKeyToString, generateEncryptionKey } from '../utils/CryptoUtil';

const username = ref('Alice');
const email = ref('alice@example.com');
const token = ref('sensitive-auth-token');
const uKey = ref(null);

const setCrypto = async()=>{
    console.log('============setCrypto========', {username, email, token })
    const res = await mockData();
    console.log(666, {res})
}
const mockData = async()=>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resdata')
        }, 2000);
    })
}
const setEncrypto = async()=>{
    // 示例：加密用户信息并存储到 localStorage
    try {
        // 1. 生成密钥（实际应用中应从安全来源获取）
        uKey.value = await generateEncryptionKey();
        const keyStr = await exportKeyToString(key);
        console.log(77,{keyStr})
        const userInfo = { 
            name: username.value, 
            email: email.value, 
            token: token.value
        };
        console.log(uKey.value , 'keyStr_: ', userInfo )
        
        // 2. 要加密的用户数据
        // 3. 加密数据
        const encryptedData = await encryptData(uKey.value, userInfo);
        
        // 4. 存储到 localStorage（密钥需单独安全保存！）
        localStorage.setItem("encryptedUserData", encryptedData);
        console.log("加密数据已存储");
    } catch (error) {
        console.error("加密失败:", error);
    }

}

const getDecryptData = async()=>{
    try {
        // 5. 解密演示（从 localStorage 读取）
        const storedData = localStorage.getItem("encryptedUserData");
        if (storedData) {
          const decrypted = await decryptData(uKey.value, storedData);
          console.log("解密结果:", decrypted);
        }
    } catch (error) {
        console.error("解密失败:", error);
    }
}
</script>