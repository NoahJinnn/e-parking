import { Router } from 'next-i18next';
import withRedux from 'next-redux-wrapper';
import { AppContext, AppInitialProps } from 'next/app';
import { Component, useEffect, useState } from 'react';
// Redux
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

// Components
import { Footer, Header } from '@components/index';
// Languages
import { appWithTranslation, i18n } from '@languages/index';
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
    const { Component, pageProps, store, router } = props;
    const [pageLoading, setPageLoading] = useState(true);

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

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div className="layouts__app">
            <Provider store={store}>
                <ToastContainer />
                <Header pageLoading={pageLoading} router={router} />
                <div className="layouts__app-body">
                    <Component {...pageProps} router={router} locale={i18n.language ? i18n.language : 'en'} />
                </div>
                <Footer pageLoading={pageLoading} router={router} />
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
