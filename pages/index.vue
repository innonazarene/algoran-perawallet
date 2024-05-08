<script setup>
import { PeraWalletConnect } from '@perawallet/connect'
import algosdk from 'algosdk'

const testNetClient = new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", "");

const route = useRoute()
const queryParam = ref(null)
queryParam.value = route.query
const walletOpt = {
    shouldShowSignTxnToast: false,
    chainId: "416001"
}

const wallet = ref(null)
wallet.value = new PeraWalletConnect(walletOpt)
const intiialize = async () => {
    await wallet.value.reconnectSession()
}
const transact = async () => {
    const suggestedParams = await testNetClient.getTransactionParams().do();

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: wallet.value.connector._accounts[0],
        to: queryParam.value.account_id,
        amount: queryParam.value.amount, //1 algorand
        note: new Uint8Array(Buffer.from("Thankyou for Protecting our Earth")),
        suggestedParams
    })

    const txnsToSign = [{txn, message: "This is a transaction message"}]

    try {
        const signedTxnGroup = await wallet.value.signTransaction([txnsToSign])
        console.log(signedTxnGroup)
        const {txId} = await testNetClient.sendRawTransaction(signedTxnGroup).do()
        console.log(txId)
    } catch (error) {
        console.log("Couldn't sign asset transfer txns",error);
    }
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
transact()
</script>
<template>
    <div>
        <button v-if="!wallet.connector" @click="handleConnectWalletClick">Connect</button>
        <button v-else @click="handleDisconnectWalletClick">Disconnect</button>
    </div>

</template>
