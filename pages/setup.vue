<script setup>
import { PeraWalletConnect } from '@perawallet/connect'
import { Transaction } from "algosdk"
const wallet = ref(null)
const walletOpt = {
    shouldShowSignTxnToast: false
}
wallet.value = new PeraWalletConnect(walletOpt)
const intiialize = async () => {
    await wallet.value.reconnectSession()
}
const transact = () => {
    closePeraWalletSignTxnToast()
}
const handleDisconnectWalletClick = () => {
    wallet.value.disconnect();
    setAccountAddress(null);
}
const handleConnectWalletClick = () => {
    wallet.value
    .connect()
    .then((newAccounts) => {
        setAccountAddress(newAccounts[0]);
    })
}
intiialize()
</script>
<template>
    <div>
        <button v-if="!wallet.connector" @click="handleConnectWalletClick">Connect</button>
        <button v-else @click="handleDisconnectWalletClick">Disconnect</button>
    </div>
</template>
