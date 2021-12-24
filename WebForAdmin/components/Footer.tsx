import { Fragment, useEffect } from 'react';

// Languages
import { useTranslation } from '@languages/index';
import { Router } from 'next-i18next';

/**
 * Footer
 * @author: Giang Nguyen
 */
interface Props {
    pageLoading: boolean;
    isRender: boolean;
    router: Router;
}
interface IComponentFooter<P = {}> extends React.FC<P> {
    getInitialProps: () => Promise<{ namespacesRequired: string[] }>;
}

const Footer: IComponentFooter<Props> = (props) => {
    // Constructor
    const { pageLoading, isRender } = props;
    const { t } = useTranslation(['title']);

    // useEffect as componentDidMount
    useEffect(() => {}, []);

    return <div className="">{!pageLoading && isRender ? <div>Footer</div> : ''}</div>;
};

Footer.getInitialProps = async () => {
    return {
        namespacesRequired: ['common', 'footer'],
    };
};

export default Footer;
