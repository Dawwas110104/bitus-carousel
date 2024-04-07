const initCarousel = () => {
    const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const carouselChildrens = [...carousel.children];

    let isDragging = false;
    let startX, startScrollLeft;
    let timeoutId;
    let index = 0;
    const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Fungsi untuk mengatur event listener pada tombol panah
    const setupArrowButtons = () => {
        arrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
                index += btn.id === "left" ? -1 : +1;

                if(index <= 0) {
                    document.querySelector('#left').classList.add("hidden-icon");
                    index = 0;
                } else if (index >= 2) {
                    document.querySelector('#right').classList.add("hidden-icon");
                    index = 2;
                } else {
                    // Memeriksa apakah ada elemen dengan kelas .hidden-icon
                    const hiddenIcons = document.querySelectorAll('.hidden-icon');

                    // Loop melalui setiap elemen yang ditemukan dan hapus kelas .hidden-icon
                    hiddenIcons.forEach(icon => {
                        icon.classList.remove('hidden-icon');
                    });
                }

                console.log('index : ', index)

                // if (carousel.scrollLeft > 0 && carousel.scrollLeft < 1065) {
                //     document.querySelector('.hidden-icon').classList.remove('hidden-icon');
                // }
                // if (carousel.scrollLeft == 0) {
                //     document.querySelector('#left').classList.add("hidden-icon");
                // }

                // if (carousel.scrollLeft == 1065) {
                //     document.querySelector('#right').classList.add("hidden-icon");
                // }
            });
        });
    };

    // Fungsi untuk memulai drag
    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    // Fungsi untuk menangani peristiwa seret
    const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft + (startX - e.pageX);
        console.log("masuk di dragging, e : ")
    };

    // Fungsi untuk menghentikan drag
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    // Fungsi untuk autoplay carousel
    const autoPlay = () => {
        if (window.innerWidth < 800) return;
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    };

    // Fungsi untuk scroll tak terbatas
    const infiniteScroll = () => {
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }

        clearTimeout(timeoutId);
        if (!wrapper.matches(":hover")) autoPlay();
    };

    // Event listener untuk mouse down
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    // Event listener untuk scroll
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

    setupArrowButtons();
    // autoPlay();

    const veiw = Math.round(carousel.offsetWidth / firstCardWidth);
    const jumlah = document.querySelectorAll(".card").length;
    console.log("index awal : ", index)
};

// Panggil fungsi untuk menginisialisasi carousel
initCarousel();
