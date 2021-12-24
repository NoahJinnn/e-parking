import { useEffect } from 'react';

/**
 * Dropdown Menu
 * @author: Giang Nguyen
 */
interface Props {
    children: React.ReactNode;
    id: string;
    items: any;
    itemIndex: string;
    onClickItem: any;
}
interface IComponentDropdown<P = {}> extends React.FC<P> {
    defaultProps: Partial<P>;
}

const Dropdown: IComponentDropdown<Props> = (props) => {
    // Constructor
    const { children, id, items, itemIndex, onClickItem } = props;

    // useEffect as componentDidMount and componentWillUnmount
    useEffect(() => {
        window.addEventListener('click', handleDropDown);

        return () => {
            window.removeEventListener('click', handleDropDown);
        };
    }, []);

    const handleDropDown = (event: any) => {
        if (!event.target.classList.contains('drop-trigger')) {
            const elements = document.querySelectorAll('div.components__dropdown-menu');
            elements.forEach((element) => {
                if (element.classList.contains('db')) {
                    element.classList.add('dn');
                    element.classList.remove('db');
                }
            });
        } else {
            const dropdown = document.getElementById(id);
            if (dropdown?.classList.contains('db')) {
                dropdown.classList.add('dn');
                dropdown.classList.remove('db');
            } else {
                dropdown?.classList.add('db');
                dropdown?.classList.remove('dn');
            }
        }
    };

    return (
        <div className="components__dropdown bases__p--cursor drop-trigger">
            <div className="components__header-language drop-trigger">{children}</div>
            <div className="components__dropdown-menu dn mt3" id={id}>
                {items.map((item: any, index: number) => {
                    return (
                        <div key={index} className="components__dropdown-item" onClick={() => onClickItem(item, index)}>
                            {item[itemIndex]}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

Dropdown.defaultProps = {
    id: '',
    items: [],
    itemIndex: '',
    onClickItem: () => {},
};

export default Dropdown;
