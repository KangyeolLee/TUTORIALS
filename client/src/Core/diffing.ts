import { DiffingNodesType } from '@/utils/types';

export const diffing = (
  $new: HTMLElement,
  $old: HTMLElement | DocumentFragment
) => {
  const $newNodes = Array.prototype.slice.call(
    $new.childNodes
  ) as HTMLElement[];
  const $oldNodes = Array.prototype.slice.call(
    $old.childNodes
  ) as HTMLElement[];

  let count = $oldNodes.length - $newNodes.length;
  if (count > 0) {
    for (; count > 0; count--) {
      const lastIdx = $oldNodes.length - count;
      $oldNodes[lastIdx].parentNode?.removeChild($oldNodes[lastIdx]);
    }
  }

  $newNodes.forEach((node, idx) => {
    if (compareRootElements({ $old, node, $oldNode: $oldNodes[idx] })) return;
    compareAttributes({ node, $oldNode: $oldNodes[idx] });
    compareContents({ $oldNode: $oldNodes[idx], node });
    if (compareChildren({ $oldNode: $oldNodes[idx], node })) return;
  });
};

// Node는 Element 외에도 텍스트노드, 주석노드로 구성
// tagName은 Element에만 있으므로 이에 해당하지 않는 타입을 지정
const getNodeType = (node: HTMLElement) => {
  if (node.nodeType === 3) return 'text'; // textNode
  if (node.nodeType === 8) return 'comment'; // commentNode
  return node.tagName.toLowerCase();
};

const getAttNameList = (attributes: NamedNodeMap): string[] => {
  if (!attributes) {
    return [];
  }

  const attributeList: string[] = [];

  Array.prototype.forEach.call(attributes, (attr: Attr) => {
    attributeList.push(attr.nodeName);
  });

  return attributeList;
};

const compareRootElements = ({ $old, node, $oldNode }: DiffingNodesType) => {
  if (!$oldNode) {
    $old!.append(node.cloneNode(true));
    return true;
  }

  if (getNodeType(node) !== getNodeType($oldNode)) {
    $oldNode.parentNode?.replaceChild(node.cloneNode(true), $oldNode);
    return true;
  }

  return false;
};

const compareAttributes = ({ node, $oldNode }: DiffingNodesType) => {
  const attrNames = new Set([
    ...getAttNameList(node.attributes),
    ...getAttNameList($oldNode.attributes),
  ]);
  for (const attrName of attrNames) {
    const oldAttr: string | null = $oldNode.getAttribute(attrName);
    const newAttr: string | null = node.getAttribute(attrName);

    if (newAttr && (!oldAttr || oldAttr !== newAttr)) {
      $oldNode.setAttribute(attrName, newAttr);
      continue;
    }
    if (oldAttr && !newAttr) {
      $oldNode.removeAttribute(attrName);
      continue;
    }
  }
};

const compareContents = ({ $oldNode, node }: DiffingNodesType) => {
  const newContent = getNodeContent(node);
  if (newContent && newContent !== getNodeContent($oldNode)) {
    $oldNode.textContent = newContent;
  }
};

const getNodeContent = (node: HTMLElement) => {
  if (node.childNodes && node.childNodes.length > 0) return null;
  return node.textContent;
};

const compareChildren = ({ $oldNode, node }: DiffingNodesType) => {
  if ($oldNode.childNodes.length > 0 && node.childNodes.length < 1) {
    $oldNode.innerHTML = '';
    return true;
  }

  if ($oldNode.childNodes.length < 1 && node.childNodes.length > 0) {
    const fragment = document.createDocumentFragment();
    diffing(node, fragment);
    $oldNode.append(fragment);
    return true;
  }

  if (node.childNodes.length > 0) {
    diffing(node, $oldNode);
  }
  return false;
};
