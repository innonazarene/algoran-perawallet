// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    $meta: {
        name: "Algorand Broker"
    },
    ssr: false,
    alias: {
        process: "process/browser",
    },
    runtimeConfig: {
        public: {
            SERVER_ADDRESS: process.env.SERVER_ADDRESS,
            CLIENT_ADDRESS: process.env.CLIENT_ADDRESS,
        }
    },
    vite: {
        define: {
            global: "window",
        }
    }
})
