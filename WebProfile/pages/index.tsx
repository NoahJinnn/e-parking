import { useState, useEffect } from 'react';
import { AppInitialProps } from 'next/app';

import firebase from '@plugins/firebase';

// Languages
import { useTranslation, Link } from '@languages/index';
import { Router } from 'next-i18next';

// Data
import data from '@assets/data/data';

// Components
import { Carousel, Img } from '@components/index';

// Redux
import { useSelector } from 'react-redux';
import { ReduxStates } from '@redux/reducers';

/**
 * Home page
 * @author: Giang Nguyen
 */
interface Props extends AppInitialProps {
    router: Router;
}
type LocaleKeys = 'en' | 'vi';
type StateKeys = 'intro' | 'overview' | 'works' | 'products' | 'roadmap' | 'members' | 'mentors' | 'partners' | 'unlimitContents';

interface INextHomePage<P = {}> extends React.FC<P> {
    getInitialProps: () => Promise<{ namespacesRequired: string[] }>;
}

const HomePage: INextHomePage<Props> = () => {
    // Constructor
    const { t } = useTranslation(['title', 'home']);
    const locale = useSelector((states: ReduxStates) => states.locale);
    const [state, setState] = useState({
        intro: data[locale as LocaleKeys].intro as string,
        overview: data[locale as LocaleKeys].overview as string,
        works: data[locale as LocaleKeys].works as any,
        products: data[locale as LocaleKeys].products as any,
        roadmap: data[locale as LocaleKeys].roadmap as Array<object>,
        members: data[locale as LocaleKeys].members as Array<object>,
        mentors: data[locale as LocaleKeys].mentors as Array<object>,
        partners: data[locale as LocaleKeys].partners as Array<object>,
        unlimitContents: [] as Array<string>,
    });
    const { intro, overview, works, products, roadmap, members, mentors, partners, unlimitContents } = state;

    // useEffect as componentDidUpdate for locale
    useEffect(() => {
        setState((prevState: any) => ({
            ...prevState,
            intro: data[locale as LocaleKeys].intro,
            overview: data[locale as LocaleKeys].overview,
            works: data[locale as LocaleKeys].works,
            products: data[locale as LocaleKeys].products,
            roadmap: data[locale as LocaleKeys].roadmap,
            members: data[locale as LocaleKeys].members,
            mentors: data[locale as LocaleKeys].mentors,
            partners: data[locale as LocaleKeys].partners,
        }));
    }, [locale]);

    const limitContent = (description: string, limit: number) => {
        let content = '';
        if (description != '') {
            if (description.length < limit) {
                content = description.slice(0, limit);
            } else {
                content = description.slice(0, limit) + '...';
            }
            return content;
        }
    };

    const processLimitContent = (index: string) => {
        const pos = unlimitContents.indexOf(index);
        if (pos > -1) {
            unlimitContents.splice(pos, 1);
        } else {
            unlimitContents.push(index);
        }
        setState((prevState) => ({
            ...prevState,
            unlimitContents,
        }));
    };

    const renderWorks = (type: string) => {
        const worksDt = works[type];
        return worksDt.map((work: any, index: number) => (
            <div
                key={index}
                className={`pages__home-works-tooltip pa2 ${worksDt.length == 4 ? 'ph2' : 'ph4'}`}
                onClick={() => {
                    firebase.analytics().logEvent(`${type}_${index + 1}`);
                }}>
                <div className="pages__home-works-tooltip_bubble">
                    <div className="pages__home-works-tooltip_content flex justify-center items-center">
                        <div>{work.description}</div>
                    </div>
                </div>
                <div className="pages__home-works-content_step bases__text--bold mb2">0{index + 1}</div>
                <Img className="pages__home-works-content_icon mb4" src={work.icon} />
                <div className="pages__home-works-content_title bases__font--16">{work.title}</div>
            </div>
        ));
    };

    const renderProducts = () => {
        return Object.keys(products).map((index: string) => {
            const product = products[index];
            return (
                <Link
                    key={index}
                    route="product/slug"
                    params={{
                        lang: locale,
                        slug: index,
                    }}
                    passHref={true}>
                    <a>
                        <div className="relative justify-center">
                            <Img isBlur={true} placeholder={product.thumbnails[0]} src={product.images[0]} />
                            <div className="pages__home-products-slider-desc bases__font--24 pv3">
                                <span>{product.title}</span>
                            </div>
                        </div>
                    </a>
                </Link>
            );
        });
    };

    const renderRoadmap = () => {
        return roadmap.map((map: any, index: number) => (
            <div className="flex justify-center" key={index}>
                <div className="mr4 w-50 tr">
                    <div className="pages__home-roadmap-time bases__text--light bases__font--20">{map.time}</div>
                    <div className="pages__home-roadmap-milestone bases__text--light">{map.milestone}</div>
                </div>
                <div className={`pages__home-roadmap-dot ${map.status} flex`}>
                    <span className={`pages__home-roadmap-dot-status ${map.status}`} />
                </div>
                {index < roadmap.length - 1 ? (
                    <div className="flex justify-center">
                        <span className={`pages__home-roadmap-timeline ${map.status}`} />
                    </div>
                ) : (
                    ''
                )}
                <div className="ml4 w-50 tl">
                    <div className="description bases__font--16">{map.description}</div>
                </div>
            </div>
        ));
    };

    const renderTeam = (key: StateKeys) => {
        const team = state[key];
        return team.map((member: any, index: number) => {
            const member_index = `${key}_${index}`;
            return (
                <div key={member_index} className="w-50-m w-third-l mb4 ph2">
                    <div className="flex justify-center">
                        <div className="pages__home-team-member_avatar">
                            <Img
                                isBlur={true}
                                placeholder={member.thumbnail}
                                src={member.avatar ? member.avatar : '/image-asset/avatar.png'}
                            />
                        </div>
                    </div>
                    <div className="pages__home-team-member_name bases__text--bold mb1">{member.name}</div>
                    <div className="pages__home-team-member_position bases__font--20 mb3">{member.position}</div>
                    <div className="description bases__font--16 mb2">
                        {unlimitContents.indexOf(member_index) > -1 ? member.description : limitContent(member.description, 122)}
                    </div>
                    {member.description.length > 122 ? (
                        <div
                            className="pages__home-team-member_more bases__text--light bases__p--cursor bases__font--16"
                            onClick={() => processLimitContent(member_index)}>
                            <i
                                className={`fa fa-chevron-down ${unlimitContents.indexOf(member_index) > -1 ? 'rotate_up' : 'rotate_down'}`}
                            />
                            <span className="ml1">
                                {unlimitContents.indexOf(member_index) > -1 ? t('home:team.less') : t('home:team.more')}
                            </span>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            );
        });
    };

    return (
        <div className="pages__home white">
            <Img className="pages__home-banner-bg" src="/image-asset/banner-bg.png" />
            <div className="pages__home-section bases__container">
                <div className="flex flex-wrap">
                    <div className="pages__home-banner-content w-100 w-50-l self-center ph2-l">
                        <Img className="pages__home-banner-logo flex mb3 center" src="/image-asset/banner-logo.png" />
                        <div className="flex pt3">
                            <i className="bases__font--10 mt1 mr2 fas fa-quote-left" />
                            <span className="description bases__font--16">{intro}</span>
                        </div>
                    </div>
                    <div className="pages__home-banner-img w-100 w-50-l ph2-l">
                        <Img src="/image-asset/banner.png" />
                    </div>
                </div>
            </div>
            <div className="pages__home-section bases__container" id="overview">
                <div className="pages__home-section-heading bases__text--bold">
                    <div>{t('title:overview')}</div>
                    <Img src="/image-asset/under-line.png" />
                </div>
                <div className="flex flex-wrap">
                    <div className="pages__home-overview-img w-100 w-50-l">
                        <Img isBlur={true} placeholder="/image-asset/thumbnail/system.jpg" src="/image-asset/system.jpg" />
                    </div>
                    <div className="pages__home-overview-content flex flex-wrap w-100 w-50-l ph3">
                        <div className="w-100">
                            <div className="bases__font--24 bases__text--bold description-title">{t('home:overview.about')}</div>
                            <div className="description bases__font--16 mt4">{overview}</div>
                        </div>
                        <div className="pages__home-overview-features w-100 flex">
                            <div className="pages__home-overview-features_icon bases__font--16 w-third w-25-l flex items-center">
                                <Img className="mr2" src="/image-asset/fast.png" />
                                <div>{t('home:overview.fast')}</div>
                            </div>
                            <div className="pages__home-overview-features_icon bases__font--16 w-third w-25-l flex items-center">
                                <Img className="mr2" src="/image-asset/safe.png" />
                                <div>{t('home:overview.safe')}</div>
                            </div>
                            <div className="pages__home-overview-features_icon bases__font--16 w-third w-25-l flex items-center">
                                <Img className="mr2" src="/image-asset/convenient.png" />
                                <div>{t('home:overview.convenient')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pages__home-section bases__container" id="works">
                <div className="pages__home-section-heading bases__text--bold">
                    <div>{t('title:works')}</div>
                    <Img src="/image-asset/under-line.png" />
                </div>
                <div className="pages__home-works pv3">
                    <div className="flex justify-center">
                        <div className="pages__home-works-heading bases__text--bold">{t('home:works.parking')}</div>
                    </div>
                    <div className="flex flex-wrap mt5 tc justify-center items-center">{renderWorks('parking')}</div>
                    <span className="pages__home-works-dot" />
                </div>
                <div className="pages__home-works mt2 pv3">
                    <div className="flex justify-center">
                        <div className="pages__home-works-heading bases__text--bold">{t('home:works.get')}</div>
                    </div>
                    <div className="flex flex-wrap mt5 tc justify-center items-center">{renderWorks('get_car')}</div>
                    <span className="pages__home-works-dot" />
                </div>
            </div>
            <div className="pages__home-section" id="products">
                <div className="pages__home-section-heading bases__text--bold">
                    <div>{t('title:products')}</div>
                    <Img src="/image-asset/under-line.png" />
                </div>
                <div className="pages__home-products-slider">
                    <Carousel id="products">{renderProducts()}</Carousel>
                </div>
            </div>
            <div className="pages__home-section bases__container" id="roadmap">
                <div className="pages__home-section-heading bases__text--bold">
                    <div>{t('title:roadmap')}</div>
                    <Img src="/image-asset/under-line.png" />
                </div>
                <div className="pages__home-section-semiheading bases__text--bold tc mb4">{t('home:roadmap.start')}</div>
                {renderRoadmap()}
            </div>
            <div className="pages__home-section bases__container" id="team">
                <div className="pages__home-section-heading bases__text--bold">
                    <div>{t('title:team')}</div>
                    <Img src="/image-asset/under-line.png" />
                </div>
                {members.length ? (
                    <div>
                        <div className="pages__home-section-semiheading bases__text--bold tc mb4">{t('home:team.founding')}</div>
                        <div className="pages__home-team-member flex flex-wrap">{renderTeam('members')}</div>
                    </div>
                ) : (
                    ''
                )}
                {mentors.length ? (
                    <div>
                        <div className="pages__home-section-semiheading bases__text--bold tc mv4">{t('home:team.mentors')}</div>
                        <div className="pages__home-team-member flex flex-wrap">{renderTeam('mentors')}</div>
                    </div>
                ) : (
                    ''
                )}
                {partners.length ? (
                    <div>
                        <div className="pages__home-section-semiheading bases__text--bold tc mv4">{t('home:team.partners')}</div>
                        <div className="pages__home-team-member flex flex-wrap">{renderTeam('partners')}</div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

HomePage.getInitialProps = async () => {
    return {
        namespacesRequired: ['title', 'home'],
    };
};

export default HomePage;
