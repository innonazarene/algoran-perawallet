<script setup>
import { PeraWalletConnect } from '@perawallet/connect'
import { Transaction } from "algosdk"
const route = useRoute()
const queryParam = ref(null)
queryParam.value = route.query
const walletOpt = {
    shouldShowSignTxnToast: false
}
const txn = {
    from: queryParam.value.account_id,
    to: queryParam.value.account_id,
    amount: 12, // 1 Algo
    firstRound: 1,
    lastRound: 1,
    genesisID: 'genesis-id',
    genesisHash: 'genesis-hash',
}



const wallet = new PeraWalletConnect(walletOpt)
const intiialize = async () => {
    if ( !wallet.connector ) {

    }
    // if ( wallet.isConnected ) {
    //     await wallet
    //         .connect()
    //         .then((newAccounts) => {
    //             peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);
    //             setAccountAddress(newAccounts[0]);
    //         })
    // }else{
    //     await wallet.reconnectSession()
    // }
    // const signedTxn = await wallet.signTransaction([txn])
    // console.log(signedTxn)
    wallet
        .connect()
        .then((newAccounts) => {
            // Setup the disconnect event listener
            wallet.connector?.on("disconnect", handleDisconnectWalletClick);
            setAccountAddress(newAccounts[0]);
        })
        .reject((error) => {
            // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
            // For the async/await syntax you MUST use try/catch
            if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
            // log the necessary errors
            }
        });


}
const transact = () => {
    closePeraWalletSignTxnToast()
}

const handleDisconnectWalletClick = () => {
    wallet.disconnect();
    setAccountAddress(null);
}
intiialize()
</script>
<template>
    <div>
        <p>
            {{ wallet }}
        </p>
    </div>

    <div>
        <button @click="handleDisconnectWalletClick">Disconnect</button>
    </div>

    <div>
        <p>
            <NuxtLink to="https://dispenser.testnet.aws.algodev.network/">
                Despense Test
            </NuxtLink>
        </p>
    </div>
</template>
