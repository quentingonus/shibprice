new Vue({
    el: ".root",
    data: {
        connection: null,
        // fontSize: 150,
        shib: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
        // shibWallet: "0x68a99f89e475a078645f4bac491360afe255dff1",
        shibWallet: "0xdead000000000000000042069420694206942069",
        api: "EK-tLMmN-e4uCydY-133YN",
        shibBalance: 0,
        substractor: 1000000000000000000,
        prevPrice: 0,
        currentPrice: 0,
        priceColor: "rgb(168, 158, 158)"
    },
    computed: {
        etherScan() {
            return `https://api.ethplorer.io/getAddressInfo/${this.shibWallet}?apiKey=${this.api}&token=${this.shib}`;
        },
        fontSize() {
            return window.innerWidth / 8;
        }
    },
    methods: {
        getWallet() {
            axios.get(this.etherScan)
                .then(res => {
                    this.shibBalance = (res.data.tokens[0].rawBalance / this.substractor);
                });
        },
        setData(event) {
            this.currentPrice = JSON.parse(event.data).p;
            this.priceColor = !this.prevPrice || this.prevPrice === this.currentPrice ? "rgb(168, 158, 158)" : this.currentPrice > this.prevPrice ? "green" : "red";
            this.prevPrice = this.currentPrice;
        }
    },
    created() {
        this.connection = new WebSocket("wss://stream.binance.com:9443/ws/shibusdt@trade");
        this.connection.onmessage = this.setData;
    }
});