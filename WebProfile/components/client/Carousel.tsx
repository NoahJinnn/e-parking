import React, { useState, useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

/**
 * Carousel
 * @author: Giang Nguyen
 */
interface Props {
    infinite: boolean;
    index: number;
    id: string;
    children: React.ReactNode;
}
interface IComponentCarousel<P = {}> extends React.FC<P> {
    defaultProps: Partial<P>;
}

const Carousel: IComponentCarousel<Props> = (props) => {
    // Constructor
    const { infinite, index, id, children } = props;
    const [state, setState] = useState({
        slideIndex: index as number,
    });
    const { slideIndex } = state;

    // useEffect as componentDidMount and componentWillUnmount
    useEffect(() => {
        smoothscroll.polyfill();

        setTimeout(() => {
            processSlide();
        }, 10);
        return () => {
            processSlide('remove');
        };
    }, []);

    const processSlide = (action: string = '') => {
        const carousel = document.getElementById(`carousel_${id}`);
        if (action == 'remove') {
            carousel?.removeEventListener('scroll', () => {});
        } else {
            const children_length = React.Children.toArray(children).length;

            // Define previous or next slide
            let prevIndex = slideIndex - 1;
            if (slideIndex == 0) {
                if (infinite) {
                    prevIndex = children_length - 1;
                } else {
                    prevIndex = 0;
                }
            }
            let nextIndex = slideIndex + 1;
            if (slideIndex == children_length - 1) {
                if (infinite) {
                    nextIndex = 0;
                } else {
                    nextIndex = children_length - 1;
                }
            }
            const slide_id = action == 'prev' ? `${id}${prevIndex}` : action == 'next' ? `${id}${nextIndex}` : `${id}${slideIndex}`;
            let offsetLeft = document.getElementById(slide_id)?.offsetLeft;

            // Scroll to slide
            carousel?.scrollTo({ left: offsetLeft ? offsetLeft : 0, behavior: action ? 'smooth' : 'auto' });

            // Handle slide index
            carousel?.addEventListener('scroll', () => {
                let elements = document.querySelectorAll(`div.components__carousel-item.${id}`);
                for (const i in elements) {
                    let element = elements[i];
                    const next_element = document.getElementById(`${id}${parseInt(i) + 1}`);
                    if (element instanceof HTMLElement) {
                        if (!next_element && carousel.scrollLeft >= element.offsetLeft - 100) {
                            setState((prevState) => ({
                                ...prevState,
                                slideIndex: children_length - 1,
                            }));
                        }
                        if (next_element && carousel.scrollLeft >= element.offsetLeft && carousel.scrollLeft <= next_element.offsetLeft) {
                            setState((prevState) => ({
                                ...prevState,
                                slideIndex: parseInt(i),
                            }));
                        }
                    }
                }
            });
        }
    };

    return (
        <div className="components__carousel">
            <div className="components__carousel-index pv2 ph3">
                {slideIndex + 1} / {React.Children.toArray(children).length}
            </div>
            <div className="components__carousel-wrapper" id={`carousel_${id}`}>
                <div className="flex">
                    {React.Children.map(children, (child, i) => (
                        <div className={`components__carousel-item ${id}`} key={i} id={`${id}${i}`}>
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            <div className="components__carousel-prev flex justify-center items-center" onClick={() => processSlide('prev')}>
                <i className="fa fa-chevron-left" />
            </div>
            <div className="components__carousel-next flex justify-center items-center" onClick={() => processSlide('next')}>
                <i className="fa fa-chevron-right" />
            </div>
        </div>
    );
};

Carousel.defaultProps = {
    index: 0,
    infinite: true,
};

export default Carousel;
