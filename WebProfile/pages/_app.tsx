import { Component, Fragment, useState, useEffect, useCallback } from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import smoothscroll from 'smoothscroll-polyfill';

// Languages
import { i18n, appWithTranslation } from '@languages/index';
import { Router } from 'next-i18next';

// Components
import { Header, Footer, Img, Splash } from '@components/index';

// Redux
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import reduxStore from '@redux/store';

/**
 * App layout
 * @author: Giang Nguyen
 */
interface Props extends AppInitialProps {
    Component: React.FC<Component>;
    store: any;
    router: Router;
}
interface Process {
    server: boolean;
}
declare var process: Process;

interface INextPage<P = {}> extends React.FC<P> {
    getInitialProps: (props: AppContext) => Promise<{ pageProps: any }>;
}

const AppLayout: INextPage<Props> = (props) => {
    // Constructor
    const { Component, pageProps, store, router } = props;
    const [state, setState] = useState({
        isShowMenu: (router.pathname != '/' ? false : true) as boolean,
        isScroll: false as boolean,
        isSticky: false as boolean,
        isShowBackTop: false as boolean,
        pageLoading: true as boolean,
        section: '' as string,
    });
    const { isShowMenu, isScroll, isSticky, isShowBackTop, pageLoading, section } = state;

    // useEffect as componentDidMount
    useEffect(() => {
        smoothscroll.polyfill();
        loadPage();
    }, []);

    // useEffect as componentDidUpdate for router.pathname
    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            isShowMenu: router.pathname != '/' ? false : true,
        }));
    }, [router.pathname]);

    const loadPage = () => {
        let interval = setInterval(() => {
            if (!process.server && document.readyState === 'complete') {
                clearInterval(interval);
                setTimeout(() => {
                    setState((prevState) => ({
                        ...prevState,
                        pageLoading: false,
                    }));
                }, 800);
            }
        }, 100);
    };

    const handleScroll = useCallback(() => {
        const body = document.body;
        let client = document.documentElement;
        client = client.clientHeight ? client : body;

        // Handle sticky header
        if (client.scrollTop > 0 && !isSticky) {
            setState((prevState) => ({
                ...prevState,
                isSticky: true,
            }));
        }
        if (client.scrollTop <= 0 && isSticky) {
            setState((prevState) => ({
                ...prevState,
                isSticky: false,
            }));
        }
        if (!isScroll) {
            // Handle active menu item
            let elements = document.querySelectorAll('div.components__header-menu-item');
            elements.forEach((elm, index) => {
                let current_element_id = elm.getAttribute('data-toggle');
                let current_element = document.getElementById(current_element_id ? current_element_id : '');

                let next_element_id = elements[index + 1] ? elements[index + 1].getAttribute('data-toggle') : '';
                let next_element = document.getElementById(next_element_id ? next_element_id : '');

                let first_element_id = elements[0] ? elements[0].getAttribute('data-toggle') : '';
                let first_element = document.getElementById(first_element_id ? first_element_id : '');

                if (current_element) {
                    let current_offset_top = current_element.offsetTop - 175;
                    if (next_element) {
                        let next_offset_top = next_element.offsetTop - 175;
                        if (client.scrollTop >= current_offset_top && client.scrollTop < next_offset_top) {
                            setState((prevState) => ({
                                ...prevState,
                                section: current_element_id ? current_element_id : '',
                            }));
                        }
                    } else {
                        if (client.scrollTop >= current_offset_top) {
                            setState((prevState) => ({
                                ...prevState,
                                section: current_element_id ? current_element_id : '',
                            }));
                        }
                    }
                }
                if (first_element) {
                    let first_offset_top = first_element.offsetTop - 155;
                    if (client.scrollTop < first_offset_top) {
                        setState((prevState) => ({
                            ...prevState,
                            section: '',
                        }));
                    }
                }
            });
        }

        // Handle show back to top button
        if (document.documentElement.scrollTop >= 100 && !isShowBackTop) {
            setState((prevState) => ({
                ...prevState,
                isShowBackTop: true,
            }));
        }
        if (document.documentElement.scrollTop < 100 && isShowBackTop) {
            setState((prevState) => ({
                ...prevState,
                isShowBackTop: false,
            }));
        }
    }, [isScroll, isSticky, isShowBackTop]);

    // useEffect as componentDidUpdate and componentWillUnmount for handleScroll
    useEffect(() => {
        window.addEventListener('load', handleScroll);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('load', handleScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const scrollTo = (section: string) => {
        setState((prevState) => ({
            ...prevState,
            isScroll: true,
            section,
        }));
        setTimeout(() => {
            setState((prevState) => ({
                ...prevState,
                isScroll: false,
            }));
        }, 1000);
    };

    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="layouts__app">
            <Provider store={store}>
                <ToastContainer />
                <Header
                    router={router}
                    isShowMenu={isShowMenu}
                    isSticky={isSticky}
                    pageLoading={pageLoading}
                    section={section}
                    scrollTo={scrollTo}
                />
                {!pageLoading ? (
                    <Fragment>
                        <Img className="layouts__app-bg" src="/image-asset/app-bg.png" />
                        <div
                            className={`layouts__app-backtop justify-center items-center ${isShowBackTop ? 'flex' : 'dn'}`}
                            onClick={() => backToTop()}>
                            <i className="fa fa-chevron-up" />
                        </div>
                        <div className="layouts__app-body" id="body-section">
                            <Component {...pageProps} router={router} locale={i18n.language ? i18n.language : 'en'} />
                        </div>
                    </Fragment>
                ) : (
                    <Splash />
                )}
                <Footer router={router} pageLoading={pageLoading} />
            </Provider>
        </div>
    );
};

AppLayout.getInitialProps = async ({ Component, ctx }: AppContext) => {
    return {
        pageProps: {
            ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        },
    };
};

export default withRedux(reduxStore)(appWithTranslation(AppLayout));
