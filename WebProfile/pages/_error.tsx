import React from 'react';
import { AppInitialProps } from 'next/app';

// Languages
import { useTranslation } from '@languages/index';

/**
 * Error page
 * @author: Giang Nguyen
 */
interface Props extends AppInitialProps {
    statusCode: number;
}
interface INextErrorPage<P = {}> extends React.FC<P> {
    getInitialProps: ({ res, err }: any) => Promise<{ namespacesRequired: string[]; statusCode: number }>;
}

const ErrorPage: INextErrorPage<Props> = (props) => {
    const { statusCode } = props;
    const { t } = useTranslation(['common']);
    return (
        <div className="bases__container flex justify-center items-center">
            <p className="white">{statusCode ? t('error-with-status', { statusCode }) : t('error-without-status')}</p>
        </div>
    );
};

ErrorPage.getInitialProps = async ({ res, err }: any) => {
    let statusCode = null;
    if (res) {
        ({ statusCode } = res);
    } else if (err) {
        ({ statusCode } = err);
    }
    return {
        namespacesRequired: ['common'],
        statusCode,
    };
};

export default ErrorPage;
