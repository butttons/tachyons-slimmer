import postcss from 'postcss';
const removeNodes = (root: postcss.Root, classNames: string[]): postcss.Root => {
    root.walk((node: postcss.ChildNode): void => {
        if (node.type === 'rule' && node.selector.substr(0, 1) === '.' && classNames.indexOf(node.selector) === -1) {
            node.remove();
        }
    });
    return root;
};
export default removeNodes;
