import { useState, useEffect } from 'react';
import { AppInitialProps } from 'next/app';

// Languages
import { Router } from 'next-i18next';

// Data
import data from '@assets/data/data';

// Redux
import { useSelector } from 'react-redux';
import { ReduxStates } from '@redux/reducers';

/**
 * Page detail page
 * @author: Giang Nguyen
 */
interface Props extends AppInitialProps {
    router: Router;
    fbAnalytics: any;
}
type LocaleKeys = 'en' | 'vi';
type PageKeys = 'privacy-policy' | 'terms-of-use' | 'user-accessibility' | 'cookie-preferences';

interface INextPageDetailPage<P = {}> extends React.FC<P> {
    getInitialProps: (ctx: any) => Promise<{ query: any; namespacesRequired: string[] }>;
}

const PageDetailPage: INextPageDetailPage<Props> = (props) => {
    // Constructor
    const { router } = props;
    const locale = useSelector((states: ReduxStates) => states.locale);
    const [state, setState] = useState({
        page: data[locale as LocaleKeys].pages[router.query.slug as PageKeys] as any,
    });
    const { page } = state;

    // useEffect as componentDidUpdate for locale
    useEffect(() => {
        setState((prevState: any) => ({
            ...prevState,
            page: data[locale as LocaleKeys].pages[router.query.slug as PageKeys],
        }));
    }, [locale]);

    const renderDatas = () => {
        const datas = page.data;
        return datas?.map((data: any, index: number) => (
            <div key={index}>
                <div className="bases__font--24 bases__text--bold">{data.heading}</div>
                <div
                    className="pages__page_detail_desc bases__font--16 mt1 mb4"
                    dangerouslySetInnerHTML={{
                        __html: data.content.replace(/\n/g, '<br />'),
                    }}></div>
            </div>
        ));
    };

    return (
        <div className="pages__page_detail bases__container white">
            <div className="pages__page_detail_heading bases__text--bold mb3">{page.title}</div>
            {renderDatas()}
        </div>
    );
};

PageDetailPage.getInitialProps = async (ctx: any) => {
    return {
        query: ctx.query,
        namespacesRequired: ['common'],
    };
};

export default PageDetailPage;
