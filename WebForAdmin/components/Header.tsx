import { Fragment, useEffect, useState } from 'react';

import Head from 'next/head';

// Languages
import { i18n, useTranslation } from '@languages/index';
import { Router } from 'next-i18next';

// Components
import Dropdown from './client/Dropdown';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@redux/actions';
import { ReduxStates } from '@redux/reducers';

/**
 * Header
 * @author: Giang Nguyen
 */
interface Props {
    pageLoading: boolean;
    isRender: boolean;
    router: Router;
}
interface IComponentHeader<P = {}> extends React.FC<P> {
    getInitialProps: () => Promise<{ namespacesRequired: string[] }>;
}

const Header: IComponentHeader<Props> = (props) => {
    // Constructor
    const { pageLoading, isRender } = props;
    const { t } = useTranslation(['title']);
    const locale = useSelector((states: ReduxStates) => states.locale);
    const dispatch = useDispatch();
    const [state, setState] = useState(() => {
        return {
            languages: [
                {
                    code: 'en',
                    title: 'English',
                    is_default: 1,
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                    is_default: 0,
                },
            ],
        };
    });

    // useEffect as componentDidMount
    useEffect(() => {
        setLanguage(i18n.language);
    }, []);

    const setLanguage = (locale: string) => {
        i18n.changeLanguage(locale);
        dispatch(actions.setLocale(locale));
    };

    return (
        <Fragment>
            <Head>
                <title>e-Parking Admin</title>
                <link href="/library-asset/css/toastr.min.css" rel="stylesheet" />
                <link href="/library-asset/css/tachyons.min.css" rel="stylesheet" />
                <link href="/client-asset/css/main.css" rel="stylesheet" />
                <link rel="icon" type="image/png" href="/favicon.png" />
            </Head>
            {!pageLoading && isRender ? (
                <div>
                    Header
                    <div className="bases__font--22 ph3-l">
                        <Dropdown
                            id={'multilang-dropdown'}
                            items={state.languages}
                            itemIndex={'title'}
                            onClickItem={(item: any) => setLanguage(item.code)}>
                            {locale} <i className="bases__font--12 ml1 fas fa-caret-down drop-trigger" />
                        </Dropdown>
                    </div>
                </div>
            ) : (
                ''
            )}
        </Fragment>
    );
};

Header.getInitialProps = async () => {
    return {
        namespacesRequired: ['title'],
    };
};

export default Header;
