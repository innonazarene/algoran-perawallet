<script scope>
import { PeraWalletConnect } from '@perawallet/connect'
const wallet = new PeraWalletConnect()
const route = useRoute()
const queryParam = ref(null)
queryParam.value = route.query

const intiialize = async () => {
    // Connect handler
    const details = ref(null)
    if ( wallet.isConnected ) {
        await wallet
            .connect()
            .then((newAccounts) => {
                setAccountAddress(newAccounts[0]);
            })
    }else{
        await wallet.reconnectSession()
    }
}
intiialize()
</script>
<template>
    <div>
        API

    </div>
</template>
