import { Component, useState, useEffect } from 'react';
import { AppContext, AppInitialProps } from 'next/app';

import { ToastContainer } from 'react-toastify';

// Languages
import { appWithTranslation } from '@languages/index';
import { Router } from 'next-i18next';

// Components
import { Header, Footer } from '@components/index';

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
    const [pageLoading, setPageLoading] = useState(true);
    const isRenderComp = ['register', 'login'].indexOf(router.pathname.split('/')[1]) === -1;

    // useEffect as componentDidMount
    useEffect(() => {
        loadPage();
    }, []);

    const loadPage = () => {
        setPageLoading(true);
        let interval = setInterval(() => {
            if (!process.server && document.readyState === 'complete') {
                clearInterval(interval);
                setTimeout(() => {
                    setPageLoading(false);
                }, 500);
            }
        }, 100);
    };

    return (
        <div className="layouts__app">
            <Provider store={store}>
                <ToastContainer />
                <Header pageLoading={pageLoading} isRender={isRenderComp} router={router} />
                <div className={isRenderComp ? 'layouts__app-body' : ''}>
                    <Component {...pageProps} router={router} />
                </div>
                <Footer pageLoading={pageLoading} isRender={isRenderComp} router={router} />
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
