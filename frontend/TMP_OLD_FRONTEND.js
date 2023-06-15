const {createApp} = Vue

createApp({
    data() {
        return {
            isMobileMenuOpen: false,
            isMobileSecondMenuOpen: false,
            isDisclaimerOpen: false,
            activeCarouselIndex: 0,
            articles: [],
            carouselCards: [],
        }
    },
    created() {
        // Set disclaimer status
        this.isDisclaimerOpen = window.localStorage.getItem('isShowDisclaimer') === null;

        // Fetch articles (only last 4)
        fetch('./resources/articles.json').then((response) => response.json()).then(e => this.articles = e.slice(0, 4));
        // Fetch carousel cards
        fetch('./resources/carouselCards.json').then((response) => response.json()).then(e => this.carouselCards = e);
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        // Show/Hide the "scroll to top" button
        handleScroll() {
            const minScroll = 280;
            const btn = this.$refs.scrollToTopBtn;
            if (document.body.scrollTop > minScroll || document.documentElement.scrollTop > minScroll) {
                btn.classList.add('show');
            }
            else {
                btn.classList.remove('show');
            }
        },
        // Scroll to top
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        openSubMenu() {
            this.$refs.topNavSubMenu.classList.toggle('is-open');
            this.$refs.topNavSubMenuArrow.classList.toggle('fa-angle-down');
            this.$refs.topNavSubMenuArrow.classList.toggle('fa-angle-up');
        }
    },
    watch: {
        isDisclaimerOpen() {
            if (!this.isDisclaimerOpen)
                window.localStorage.setItem('isShowDisclaimer', this.isDisclaimerOpen);
        },
    }
}).mount('#app')
