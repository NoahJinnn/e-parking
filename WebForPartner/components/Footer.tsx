import { Fragment, useEffect } from 'react';

// Languages
import { useTranslation } from '@languages/i18n';
import { Router } from 'next-i18next';

/**
 * Footer
 * @author: Giang Nguyen
 */
interface Props {
    pageLoading: boolean;
    router: Router;
}
interface IComponentFooter<P = {}> extends React.FC<P> {
    getInitialProps: () => Promise<{ namespacesRequired: string[] }>;
}

const Footer: IComponentFooter<Props> = (props) => {
    const { i18n } = useTranslation(['title']);

    // useEffect as componentDidMount
    useEffect(() => {}, []);

    return <div className="">{!props.pageLoading ? <div>Footer</div> : ''}</div>;
};

Footer.getInitialProps = async () => {
    return {
        namespacesRequired: ['common', 'footer'],
    };
};

export default Footer;
