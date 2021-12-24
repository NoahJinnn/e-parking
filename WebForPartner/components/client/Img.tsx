import { Fragment, useState } from 'react';
import LazyImg from 'react-cool-img';

/**
 * Image Lazyload
 * @author: Giang Nguyen
 */
interface Props {
    isBlur: boolean;
    placeholder: string;
    className: string;
    src: string;
    onClick: any;
}
interface IComponentImg<P = {}> extends React.FC<P> {
    defaultProps: Partial<P>;
}

const Img: IComponentImg<Props> = (props) => {
    // Constructor
    const { isBlur, placeholder, className, src, onClick } = props;
    const [classes, setClasses] = useState([isBlur ? 'components__img-thumb' : '', className] as Array<string>);

    const handleImageLoaded = () => {
        if (isBlur) {
            classes[0] = 'components__img-full';
            setTimeout(() => {
                setClasses([...classes]);
            }, 500);
        }
    };

    const renderClass = () => {
        let className = '';
        for (const [index, item] of classes.entries()) {
            className += item;
            if (item && index < classes.length - 1) {
                className += ' ';
            }
        }
        return className;
    };

    return (
        <Fragment>
            <LazyImg
                className={renderClass()}
                placeholder={placeholder ? placeholder : src}
                src={src}
                onClick={() => onClick()}
                onLoad={() => handleImageLoaded()}
                debounce={0}
                alt="e-Parking"
            />
            <noscript>
                <img className={className} src={src} alt="e-Parking" />
            </noscript>
        </Fragment>
    );
};

Img.defaultProps = {
    isBlur: false,
    placeholder: '',
    className: '',
    src: '',
    onClick: () => {},
};

export default Img;
