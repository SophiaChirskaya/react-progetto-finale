const icons = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            bahavior: "smooth",
        });
    };

    return (
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Torna su">
            <i className="bi bi-arrow-up-circle-fill fs-2"></i>
        </button>
    );
};

export default Icons;