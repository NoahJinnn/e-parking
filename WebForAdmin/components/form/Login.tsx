import { Fragment, useState } from 'react';
import { AppInitialProps } from 'next/app';

// Languages
import { useTranslation } from '@languages/index';
import { Router } from 'next-i18next';

/**
 * Image Lazyload
 * @author: Giang Nguyen
 */
interface Props {
    router: Router;
}
interface IComponentLoginForm<P = {}> extends React.FC<P> {
    getInitialProps: () => Promise<{ namespacesRequired: string[] }>;
}

const LoginForm: IComponentLoginForm<Props> = (props) => {
    return <div>Login</div>;
};

LoginForm.getInitialProps = async () => {
    return {
        namespacesRequired: ['auth'],
    };
};

export default LoginForm;
