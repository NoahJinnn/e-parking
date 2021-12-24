import { useEffect } from 'react';
import { AppInitialProps } from 'next/app';

// Languages
import { useTranslation } from '@languages/index';
import { Router } from 'next-i18next';

// Components
import { LoginForm } from '@components/index';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { ReduxStates } from '@redux/reducers';

/**
 * Login page
 * @author: Giang Nguyen
 */
interface Props extends AppInitialProps {
    router: Router;
}
interface INextLoginPage<P = {}> extends React.FC<P> {
    getInitialProps: () => Promise<{ namespacesRequired: string[] }>;
}

const LoginPage: INextLoginPage<Props> = (props) => {
    // Constructor
    const { router } = props;
    const { t } = useTranslation(['auth']);

    // useEffect as componentDidMount
    useEffect(() => {
        console.log(t('hello'));
    }, []);

    return (
        <div>
            <LoginForm router={router} />
        </div>
    );
};

LoginPage.getInitialProps = async () => {
    return {
        namespacesRequired: ['auth'],
    };
};

export default LoginPage;
