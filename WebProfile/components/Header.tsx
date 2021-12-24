import { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';

// Languages
import { i18n, useTranslation, Link } from '@languages/index';
import { Router } from 'next-i18next';

// Components
import Img from '@components/client/Img';
import Dropdown from '@components/client/Dropdown';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@redux/actions';
import { ReduxStates } from '@redux/reducers';

/**
 * Header
 * @author: Giang Nguyen
 */
interface Props {
    router: Router;
    isShowMenu: boolean;
    isSticky: boolean;
    pageLoading: boolean;
    section: string;
    scrollTo: any;
}
interface IComponentHeader<P = {}> extends React.FC<P> {
    getInitialProps: () => Promise<{ namespacesRequired: string[] }>;
}

const Header: IComponentHeader<Props> = (props) => {
    // Constructor
    const { isShowMenu, isSticky, pageLoading, section, scrollTo } = props;
    const { t } = useTranslation(['title']);
    const locale = useSelector((states: ReduxStates) => states.locale);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        isShowSidebar: false as boolean,
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
        ] as Array<object>,
        screenWidth: 0 as number,
    });
    const { isShowSidebar, languages, screenWidth } = state;

    // useEffect as componentDidMount and componentWillUnmount
    useEffect(() => {
        setLanguage(i18n.language);
        window.addEventListener('resize', () => {
            setState((prevState) => ({
                ...prevState,
                screenWidth: window.innerWidth,
            }));
            processSidebar('close');
        });

        return () => {
            window.removeEventListener('resize', () => {
                processSidebar('close');
            });
        };
    }, []);

    const scrollToSection = (section_id: string) => {
        if (section != section_id) {
            const element = document.getElementById(section_id);
            if (element) {
                const offset_1 = screenWidth > 991 ? 100 : 90;
                const offset_2 = screenWidth > 991 ? 100 : 90;
                window.scrollTo({
                    top: document.documentElement.scrollTop == 0 ? element.offsetTop - offset_1 : element.offsetTop - offset_2,
                    behavior: 'smooth',
                });
                processSidebar('close');
            }
            scrollTo(section_id);
        }
    };

    const processSidebar = (action: string) => {
        setState((prevState) => ({
            ...prevState,
            isShowSidebar: action == 'open' ? true : false,
        }));
        if (action == 'open') {
            document.getElementById('body-section')?.classList.add('bases__p-event--none');
            document.body.classList.add('stop-scrolling');
        } else {
            document.getElementById('body-section')?.classList.remove('bases__p-event--none');
            document.body.classList.remove('stop-scrolling');
        }
    };

    const setLanguage = (locale: string) => {
        i18n.changeLanguage(locale);
        dispatch(actions.setLocale(locale));
    };

    return (
        <Fragment>
            <Head>
                <title>e-Parking</title>
                <link href="/library-asset/css/toastr.min.css" rel="stylesheet" />
                <link href="/library-asset/css/tachyons.min.css" rel="stylesheet" />
                <link href="/client-asset/css/main.css" rel="stylesheet" />
                <link rel="icon" type="image/png" href="/favicon.png" />
            </Head>
            {!pageLoading ? (
                <nav
                    className={`components__header flex justify-between items-center white ph5-l ph3 ${
                        isSticky && !isShowSidebar ? 'pv2' : 'pv3 unsticky'
                    }`}>
                    {!isShowSidebar ? (
                        <Link
                            route="/"
                            href={{
                                lang: locale,
                            }}
                            as={`${locale}/`}>
                            <a onClick={() => scrollToSection('')}>
                                <Img className="components__header-logo" src="/image-asset/logo.png" />
                            </a>
                        </Link>
                    ) : (
                        ''
                    )}
                    {isShowMenu ? (
                        <Fragment>
                            <div className={`components__header-menu flex-l ${!isShowSidebar ? 'dn' : ''}`}>
                                <div className="dn-l pt3 pl3" onClick={() => processSidebar('close')}>
                                    <i className="bases__font--22 fa fa-times" />
                                </div>
                                <div className="bases__font--22 ph3-l">
                                    <div
                                        onClick={() => scrollToSection('overview')}
                                        className={`components__header-menu-item ${section == 'overview' ? 'bases__active' : ''}`}
                                        data-toggle="overview">
                                        {t('title:overview')}
                                    </div>
                                </div>
                                <div className="bases__font--22 ph3-l">
                                    <div
                                        onClick={() => scrollToSection('works')}
                                        className={`components__header-menu-item ${section == 'works' ? 'bases__active' : ''}`}
                                        data-toggle="works">
                                        {t('title:works')}
                                    </div>
                                </div>
                                <div className="bases__font--22 ph3-l">
                                    <div
                                        onClick={() => scrollToSection('products')}
                                        className={`components__header-menu-item ${section == 'products' ? 'bases__active' : ''}`}
                                        data-toggle="products">
                                        {t('title:products')}
                                    </div>
                                </div>
                                <div className="bases__font--22 ph3-l">
                                    <div
                                        onClick={() => scrollToSection('roadmap')}
                                        className={`components__header-menu-item ${section == 'roadmap' ? 'bases__active' : ''}`}
                                        data-toggle="roadmap">
                                        {t('title:roadmap')}
                                    </div>
                                </div>
                                <div className="bases__font--22 ph3-l">
                                    <div
                                        onClick={() => scrollToSection('team')}
                                        className={`components__header-menu-item ${section == 'team' ? 'bases__active' : ''}`}
                                        data-toggle="team">
                                        {t('title:team')}
                                    </div>
                                </div>
                                <div className="bases__font--22 ph3-l">
                                    <Dropdown
                                        id={'multilang-dropdown'}
                                        items={languages}
                                        itemIndex={'title'}
                                        onClickItem={(item: any) => setLanguage(item.code)}>
                                        {locale} <i className="bases__font--12 ml1 fas fa-caret-down drop-trigger" />
                                    </Dropdown>
                                </div>
                            </div>
                            {!isShowSidebar ? (
                                <div className="dn-l flex items-center" onClick={() => processSidebar('open')}>
                                    <Img className="components__header-bar" src="/image-asset/bar.svg" />
                                </div>
                            ) : (
                                ''
                            )}
                        </Fragment>
                    ) : (
                        ''
                    )}
                </nav>
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
