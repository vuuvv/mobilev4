export class Node<T> {
  id: string;
  pid: string;
  label: string;
  value: T;
  children: Node<T>[];

  constructor(value: T, idKey: string = 'id', pidKey: string = 'pid') {
    this.value = value;
    this.id = value[idKey];
    this.pid = value[pidKey];
  }

  static create<T>(datas: T[], idKey: string = 'id', pidKey: string = 'pid'): Node<T>[] {
    if (!datas || !datas.length)
        return [];
    let nodes: Node<T>[] = [];
    let roots: Node<T>[] = [];
    let lookup: {[key: string]: Node<T>} = {};

    for (let data of datas) {
      let node = new Node(data, idKey, pidKey);
      lookup[node.id] = node;
      nodes.push(node);
    }

    for (let node of nodes) {
      // 如果pid为空或者pid与id相同或者pid无对应node则视为根元素
      if (!node.pid || node.pid == node.id || !lookup[node.pid]) {
        roots.push(node);
      } else {
        let parent = lookup[node.pid];
        if (parent.children) {
          parent.children.push(node);
        } else {
          parent.children = [node];
        }
      }
    }

    return roots;
  }
}