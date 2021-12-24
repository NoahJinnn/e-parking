// Languages
import { Router } from 'next-i18next';
import { AppInitialProps } from 'next/app';
import { useEffect, useState } from 'react';
// Redux
import { useSelector } from 'react-redux';

// Data
import data from '@assets/data/data';
// Components
import { Carousel, Img } from '@components/index';
import { firebase } from '@plugins/index';
import { ReduxStates } from '@redux/reducers';

/**
 * Product detail page
 * @author: Giang Nguyen
 */
interface Props extends AppInitialProps {
    router: Router;
}
type LocaleKeys = 'en' | 'vi';
type ProductKeys = 'carousel-parking-system' | 'square-parking-system' | 'tor-parking-system';

interface INextProductDetailPage<P = {}> extends React.FC<P> {
    getInitialProps: (ctx: any) => Promise<{ query: any; namespacesRequired: string[] }>;
}

const ProductDetailPage: INextProductDetailPage<Props> = (props) => {
    // Constructor
    const { router } = props;
    const locale = useSelector((states: ReduxStates) => states.locale);
    const [state, setState] = useState({
        product: data[locale as LocaleKeys].products[router.query.slug as ProductKeys] as any,
        isFullScreen: false as boolean,
        imageIndex: 0 as number,
    });
    const { product, isFullScreen, imageIndex } = state;

    // useEffect as componentDidMount
    useEffect(() => {
        // firebase.analytics().logEvent(product.firebase_event);
    }, []);

    // useEffect as componentDidUpdate for locale
    useEffect(() => {
        setState((prevState: any) => ({
            ...prevState,
            product: data[locale as LocaleKeys].products[router.query.slug as ProductKeys],
        }));
    }, [locale]);

    const processFullScreen = (index: number, action: string) => {
        if (action == 'open') {
            document.body.classList.add('stop-scrolling');
        } else {
            document.body.classList.remove('stop-scrolling');
        }
        setState((prevState: any) => ({
            ...prevState,
            isFullScreen: action == 'open' ? true : false,
            imageIndex: index,
        }));
    };

    const renderAssets = () => {
        const { images, thumbnails, videos } = product;
        const assets: JSX.Element[] = [];
        images?.forEach((image: any, index: number) =>
            assets.push(
                <Img
                    key={index}
                    isBlur={true}
                    placeholder={thumbnails && thumbnails[index]}
                    src={image}
                    onClick={() => processFullScreen(index, 'open')}
                />,
            ),
        );
        videos?.forEach((video: any, index: number) => {
            assets.push(
                <div key={index} style={{ height: '100%', padding: '4rem' }}>
                    <iframe
                        height={'100%'}
                        width={'100%'}
                        src={video}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                </div>,
            );
        });
        return assets;
    };

    return (
        <div className="pages__product_detail bases__container white">
            {!isFullScreen ? (
                <div className="flex flex-wrap">
                    <div className="pages__product_detail-slider w-100 w-50-l ph3">
                        <Carousel index={imageIndex} id="products">
                            {renderAssets()}
                        </Carousel>
                    </div>
                    <div className="pages__product_detail-content w-100 w-50-l ph3">
                        <div className="pages__product_detail-content_heading bases__text--bold bases__font--24 tl">{product.title}</div>
                        <div className="pages__product_detail-content_desc bases__font--16 tl mt4">{product.description}</div>
                    </div>
                </div>
            ) : (
                <div className="pages__product_detail-overlay flex flex-column justify-center">
                    <div className="pages__product_detail-overlay_closebtn mt2 mr3" onClick={() => processFullScreen(0, 'close')}>
                        <i className="bases__font--22 fa fa-times" />
                    </div>
                    <Carousel index={imageIndex} id="fullscreen">
                        {renderAssets()}
                    </Carousel>
                </div>
            )}
        </div>
    );
};

ProductDetailPage.getInitialProps = async (ctx: any) => {
    return {
        query: ctx.query,
        namespacesRequired: ['common'],
    };
};

export default ProductDetailPage;
