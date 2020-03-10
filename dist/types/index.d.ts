import './index.css';
declare enum SliderState {
    Enabled = 1,
    Disabled = 0
}
declare type Options = {
    /** Adds a container element around the slider */
    container?: boolean;
    /** Enables prev/next button */
    arrows?: boolean;
    /** Button to trigger previous slide. A11YSlider will generate one by default. Can be one or multiple HTML elements */
    prevArrow?: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList;
    /** Button to trigger next slide. A11YSlider will generate one by default. Can be one or multiple HTML elements */
    nextArrow?: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList;
    /** Generate navigation dots */
    dots?: boolean;
    /** Height of slider container changes according to each slide's height */
    adaptiveHeight?: boolean;
    /** Adds a skip button before the slider for a11y devices (Can be seen by tabbing) */
    skipBtn?: boolean;
    /** The total number of items to be shown. By default A11YSlider will work by default based off your CSS styling. This option hardcodes the width into the HTML for you */
    slidesToShow?: number | null;
    /** Enables the automatic change of slides */
    autoplay?: boolean;
    /** Time between slide changes when autoplay is enabled */
    autoplaySpeed?: number;
    /** If autoplay is enabled then pause when the slider is hovered */
    autoplayHoverPause?: boolean;
    /** **(EXPERIMENTAL)** Makes the center slide active */
    centerMode?: boolean;
    /** Makes the slider infinitely loop */
    infinite?: boolean;
    /** Disables the slider */
    disable?: boolean;
    /** Define options for different viewport widths */
    responsive?: object | null;
};
export default class A11YSlider {
    private _activeClass;
    private _visibleClass;
    private _dotsClass;
    private _sliderClass;
    private _hasCustomArrows;
    private _focusable;
    private _checkShouldEnableDebounced;
    private _updateHeightDebounced;
    private _generateDotsDebounced;
    private _updateScrollPosition;
    private _autoplayTimer;
    private _autoplayBtn;
    private _pauseOnMouseLeave;
    private _skipBtns;
    slider: HTMLElement;
    slides: HTMLCollectionOf<HTMLElement>;
    dots: HTMLElement | null;
    activeSlide: HTMLElement;
    visibleSlides: HTMLElement[];
    sliderContainer: HTMLElement;
    options: Options;
    sliderEnabled: SliderState;
    constructor(element: HTMLElement, options?: Options);
    private _init;
    private _checkShouldEnable;
    private _enableSlider;
    private _disableSlider;
    private _setCSS;
    private _removeCSS;
    private _checkResponsive;
    private _addSlidesWidth;
    private _removeSlidesWidth;
    private _updateA11Y;
    private _removeA11Y;
    private _addSkipBtn;
    private _removeSkipBtn;
    private _generateDots;
    private _getDotCount;
    private _removeDots;
    private _updateDots;
    private _enableAutoplay;
    private _disableAutoplay;
    private _toggleAutoplay;
    private _goPrevOrNext;
    /**
     * Moves slider to target element
     */
    scrollToSlide(target: HTMLElement | number): void;
    /**
     * Update the options on the slider instance
     */
    updateOptions(options: Options): void;
    /**
     * If element is passed slider's height will match
     *  it otherwise the height of the slider is removed.
     */
    private _updateHeight;
    /** Manully update height of slider (based off adaptiveHeight option) */
    refreshHeight(): void;
    private _getActiveAndVisible;
    private _handlePrev;
    private _handleNext;
    private _handleAutoplay;
    private _handleAutoplayHover;
    private _handleScroll;
    private _scrollFinish;
    private _dispatchEvent;
    /**
     * Nuke the slider
     */
    destroy(): void;
}
export {};
