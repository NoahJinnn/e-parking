interface ISvgComponentProps {
    width?: string | number;
    height?: string | number;
    fill?: string;
    viewBox?: string;
    opacity?: string | number;
}
interface IComponent<T = {}> extends React.FC<React.PropsWithChildren<T>> {}
interface ISvgComponent<T = {}> extends IComponent<ISvgComponentProps & T> {}
