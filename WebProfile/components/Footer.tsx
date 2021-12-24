import { useState, useEffect } from 'react';

// Languages
import { useTranslation, Link } from '@languages/index';
import { Router } from 'next-i18next';

//Data
import data from '@assets/data/data';

// Components
import Img from '@components/client/Img';
import Button from '@components/client/Button';

// Redux
import { useSelector } from 'react-redux';
import { ReduxStates } from '@redux/reducers';

/**
 * Header
 * @author: Giang Nguyen
 */
interface Props {
    router: Router;
    pageLoading: boolean;
}
type LocaleKeys = 'en' | 'vi';

interface IComponentFooter<P = {}> extends React.FC<P> {
    getInitialProps: () => Promise<{ namespacesRequired: string[] }>;
}

const Footer: IComponentFooter<Props> = (props) => {
    // Constructor
    const { pageLoading } = props;
    const { t } = useTranslation(['footer']);
    const locale = useSelector((states: ReduxStates) => states.locale);
    const [state, setState] = useState({
        pages: data[locale as LocaleKeys].pages as any,
    });
    const { pages } = state;

    // useEffect as componentDidUpdate for locale
    useEffect(() => {
        setState((prevState: any) => ({
            ...prevState,
            pages: data[locale as LocaleKeys].pages as any,
        }));
    }, [locale]);

    const renderPages = () => {
        return Object.keys(pages).map((index: any, key: number) => {
            const page = pages[index];
            return (
                <Link
                    key={index}
                    route="page/slug"
                    params={{
                        lang: locale,
                        slug: index,
                    }}
                    passHref={true}>
                    <a className={key < Object.keys(pages).length - 1 ? 'mr3' : ''}>{page.title}</a>
                </Link>
            );
        });
    };

    return (
        <div className="components__footer white">
            {!pageLoading ? (
                <div className="bases__container pt4 pb3">
                    <div className="flex flex-wrap pb3">
                        <div className="components__footer-info w-100 w-50-ns pr3-ns">
                            <Img className="components__footer-info_logo" src="/image-asset/logo.png" />
                            <div className="bases__font--22 bases__text--bold mt3">e-Parking Group</div>
                            <div className="components__footer-info_data mt2">
                                <span className="mr2">{t('footer:company.code')}:</span>0316735018
                            </div>
                            <div className="components__footer-info_data mt2">
                                <span className="mr2">{t('footer:company.hotline')}:</span>(+84) 349792737
                            </div>
                            <div className="components__footer-info_data mt2">
                                <span className="mr2">Email:</span>contact@parkingandmore.com
                            </div>
                            <div className="components__footer-info_data mt2">
                                <span className="mr2">{t('footer:company.address')}:</span>
                                {t('footer:company.addressline')}
                            </div>
                            <Img className="components__footer-info_license mt2" src="/image-asset/license.png" />
                        </div>
                        <div className="components__footer-contact w-100 w-50-ns">
                            <div className="components__footer-contact_heading bases__font--22 bases__text--bold">
                                {t('footer:contact.info')}
                            </div>
                            <div className="bases__form-group">
                                <input className="bases__form-control mt3" placeholder={t('footer:contact.name')} type="text" />
                                <input className="bases__form-control mt3" placeholder={t('footer:contact.mail')} type="email" />
                                <textarea className="bases__form-control mt3" placeholder={t('footer:contact.message')} />
                                <div className="flex justify-end-ns mt3">
                                    <Button className="components__footer-contact_button bases__text--bold">
                                        {t('footer:contact.send')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="components__footer-copyright pt3">
                        <div className="flex flex-wrap items-center">
                            <div className="bases__font--14 w-100 w-50-l flex justify-center justify-start-l">{renderPages()}</div>
                            <div className="components__footer-copyright_content bases__font--14 w-100 w-30-l">
                                © {t('footer:copy')} 2021 <span className="components__footer-copyright_company mh2">e-Parking Group</span>{' '}
                                {t('footer:right')}
                            </div>
                            <div className="components__footer-copyright_social bases__font--24 w-100 w-20-l flex justify-center justify-end-l">
                                <a target="_blank" href="https://www.facebook.com/epgvn">
                                    <i className="fa fa-facebook-f ml3" />
                                </a>
                                {/* <a href="#">
                                    <i className="fa fa-twitter ml3" />
                                </a> */}
                                <a target="_blank" href="https://www.linkedin.com/company/e-pg">
                                    <i className="fa fa-linkedin-square ml3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

Footer.getInitialProps = async () => {
    return {
        namespacesRequired: ['common', 'footer'],
    };
};

export default Footer;
