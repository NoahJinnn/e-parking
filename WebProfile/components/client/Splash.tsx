// Components
import Img from '@components/client/Img';

/**
 * Splash Loading
 * @author: Giang Nguyen
 */
interface IComponentSpash<P = {}> extends React.FC<P> {}

const Splash: IComponentSpash = () => {
    const setStyleVariable = (value: number) => {
        const style = { '--timing': value } as React.CSSProperties;
        return style;
    };

    return (
        <div className="components__splash stop-scrolling bases__container flex justify-center items-center">
            <Img className="components__splash-logo" src="/image-asset/logo.png" />
            <div className="components__splash-text bases__font--2e bases__text--bold white">
                <span style={setStyleVariable(1)}>L</span>
                <span style={setStyleVariable(2)}>O</span>
                <span style={setStyleVariable(3)}>A</span>
                <span style={setStyleVariable(4)}>D</span>
                <span style={setStyleVariable(5)}>I</span>
                <span style={setStyleVariable(6)}>N</span>
                <span style={setStyleVariable(7)}>G</span>
                <span style={setStyleVariable(8)}>.</span>
                <span style={setStyleVariable(9)}>.</span>
                <span style={setStyleVariable(10)}>.</span>
            </div>
        </div>
    );
};

export default Splash;
