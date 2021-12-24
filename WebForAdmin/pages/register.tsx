import { useEffect } from 'react';
import { AppInitialProps } from 'next/app';

// Languages
import { useTranslation } from '@languages/index';
import { Router } from 'next-i18next';

// Components
import { Img, Button } from '@components/index';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { ReduxStates } from '@redux/reducers';

/**
 * Register page
 * @author: Giang Nguyen
 */
interface Props extends AppInitialProps {
    router: Router;
}
interface INextRegisterPage<P = {}> extends React.FC<P> {
    getInitialProps: () => Promise<{ namespacesRequired: string[] }>;
}

const RegisterPage: INextRegisterPage<Props> = (props) => {
    // Constructor
    const { t } = useTranslation(['auth']);

    // useEffect as componentDidMount
    useEffect(() => {
        console.log(t('hello'));
    }, []);

    return (
        <div>
            <div className="">Register</div>
            <Img isPlaceHolder={true} className="pages__register-test_img" src="/image-asset/test.jpg" />
            <Button>Test</Button>
        </div>
    );
};

RegisterPage.getInitialProps = async () => {
    return {
        namespacesRequired: ['auth'],
    };
};

export default RegisterPage;
