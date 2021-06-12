new Vue({
    el: ".root",
    data: {
        baseUrl: "https://api.binance.com/api/v3/trades?symbol=SHIBUSDT&limit=5",
        lastTrade: null,
        fontSize: 50,
        shib: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
        // shibWallet: "0x68a99f89e475a078645f4bac491360afe255dff1",
        shibWallet: "0xdead000000000000000042069420694206942069",
        api: "EK-tLMmN-e4uCydY-133YN",
        shibBalance: 0,
        substractor: 1000000000000000000,
    },
    computed: {
        priceColor() {
            if (this.lastTrade) {
                return this.lastTrade[1].price > this.lastTrade[0].price ? "red" : "green";
            }
            return "black";
        },
        etherScan() {
            return `https://api.ethplorer.io/getAddressInfo/${this.shibWallet}?apiKey=${this.api}&token=${this.shib}`;
        }
    },
    methods: {
        getData() {
            axios.get(this.baseUrl)
                .then(res => { this.lastTrade = res.data })
        },
        getWallet() {
            axios.get(this.etherScan)
                .then(res => {
                    this.shibBalance = (res.data.tokens[0].rawBalance / this.substractor);
                });
        },
    },
    created() {
        this.getData();
        this.getWallet();
        setInterval(this.getData, 1000);
    }
});