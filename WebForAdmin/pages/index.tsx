import { useEffect } from 'react';
import { AppInitialProps } from 'next/app';

// Languages
import { useTranslation, Link } from '@languages/index';
import { Router } from 'next-i18next';

// Components
import { Img, Button } from '@components/index';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { ReduxStates } from '@redux/reducers';

/**
 * Home page
 * @author: Giang Nguyen
 */
interface Props extends AppInitialProps {
    router: Router;
}
interface INextHomePage<P = {}> extends React.FC<P> {
    getInitialProps: () => Promise<{ namespacesRequired: string[] }>;
}

const HomePage: INextHomePage<Props> = (props) => {
    // Constructor
    const { t } = useTranslation(['home']);
    const locale = useSelector((states: ReduxStates) => states.locale);

    // useEffect as componentDidMount
    useEffect(() => {
        console.log(t('hello'));
    }, []);

    return (
        <div>
            <div className="">Home</div>
            <Img isBlur={true} className="pages__home-test_img" src="/image-asset/test.jpg" />
            <Button>Test</Button>
            <Link
                route="/login"
                href={{
                    lang: locale,
                }}
                as={`${locale}/login`}>
                <a>Login</a>
            </Link>
        </div>
    );
};

HomePage.getInitialProps = async () => {
    return {
        namespacesRequired: ['title', 'home'],
    };
};

export default HomePage;
