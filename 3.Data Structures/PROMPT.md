I am building a GitHub repository to learn and practice Data Structures in JavaScript.

Use this exact repo structure and generate code only for the topic I ask next.

Repository structure:

javascript-data-structures/
│
├── README.md
├── package.json
├── .gitignore
├── docs/
│   ├── 00-learning-roadmap.md
│   ├── 01-big-o-cheatsheet.md
│   ├── 02-common-patterns.md
│   └── 03-interview-notes.md
│
├── src/
│   ├── fundamentals/
│   │   ├── primitive-types/
│   │   │   └── PrimitiveTypesNotes.js
│   │   ├── objects/
│   │   │   └── ObjectsBasics.js
│   │   └── arrays/
│   │       ├── ArrayBasics.js
│   │       ├── ArrayOperations.js
│   │       └── DynamicArrayConcept.js
│   │
│   ├── linear/
│   │   ├── singly-linked-list/
│   │   │   ├── SinglyLinkedList.js
│   │   │   └── SinglyLinkedListPractice.js
│   │   ├── doubly-linked-list/
│   │   │   ├── DoublyLinkedList.js
│   │   │   └── DoublyLinkedListPractice.js
│   │   ├── circular-linked-list/
│   │   │   ├── CircularLinkedList.js
│   │   │   └── CircularLinkedListPractice.js
│   │   ├── stack/
│   │   │   ├── StackArray.js
│   │   │   ├── StackLinkedList.js
│   │   │   └── StackPractice.js
│   │   ├── queue/
│   │   │   ├── QueueArray.js
│   │   │   ├── QueueLinkedList.js
│   │   │   └── QueuePractice.js
│   │   └── deque/
│   │       ├── Deque.js
│   │       └── DequePractice.js
│   │
│   ├── hash-based/
│   │   ├── hash-table/
│   │   │   ├── HashTable.js
│   │   │   └── HashTablePractice.js
│   │   ├── map/
│   │   │   ├── MapBasics.js
│   │   │   └── MapPractice.js
│   │   └── set/
│   │       ├── SetBasics.js
│   │       └── SetPractice.js
│   │
│   ├── trees/
│   │   ├── general-tree/
│   │   │   ├── GeneralTree.js
│   │   │   └── TreeTraversalPractice.js
│   │   ├── binary-tree/
│   │   │   ├── BinaryTree.js
│   │   │   ├── BinaryTreeTraversals.js
│   │   │   └── BinaryTreePractice.js
│   │   ├── binary-search-tree/
│   │   │   ├── BinarySearchTree.js
│   │   │   └── BSTPractice.js
│   │   ├── avl-tree/
│   │   │   ├── AVLTree.js
│   │   │   └── AVLTreePractice.js
│   │   ├── red-black-tree/
│   │   │   ├── RedBlackTree.js
│   │   │   └── RedBlackTreePractice.js
│   │   ├── heap/
│   │   │   ├── MinHeap.js
│   │   │   ├── MaxHeap.js
│   │   │   └── HeapPractice.js
│   │   ├── trie/
│   │   │   ├── Trie.js
│   │   │   └── TriePractice.js
│   │   ├── segment-tree/
│   │   │   ├── SegmentTree.js
│   │   │   └── SegmentTreePractice.js
│   │   └── fenwick-tree/
│   │       ├── FenwickTree.js
│   │       └── FenwickTreePractice.js
│   │
│   ├── graphs/
│   │   ├── graph-basics/
│   │   │   ├── Graph.js
│   │   │   └── GraphTypes.js
│   │   ├── adjacency-list/
│   │   │   ├── AdjacencyList.js
│   │   │   └── AdjacencyListPractice.js
│   │   ├── adjacency-matrix/
│   │   │   ├── AdjacencyMatrix.js
│   │   │   └── AdjacencyMatrixPractice.js
│   │   ├── directed-graph/
│   │   │   └── DirectedGraph.js
│   │   ├── undirected-graph/
│   │   │   └── UndirectedGraph.js
│   │   └── weighted-graph/
│   │       └── WeightedGraph.js
│   │
│   └── advanced/
│       ├── disjoint-set/
│       │   ├── DisjointSet.js
│       │   └── DisjointSetPractice.js
│       ├── lru-cache/
│       │   ├── LRUCache.js
│       │   └── LRUCachePractice.js
│       ├── lfu-cache/
│       │   ├── LFUCache.js
│       │   └── LFUCachePractice.js
│       ├── skip-list/
│       │   ├── SkipList.js
│       │   └── SkipListPractice.js
│       ├── b-tree/
│       │   ├── BTree.js
│       │   └── BTreePractice.js
│       └── b-plus-tree/
│           ├── BPlusTree.js
│           └── BPlusTreePractice.js
│
├── problems/
│   ├── easy/
│   ├── medium/
│   └── hard/
│
├── tests/
│   ├── fundamentals/
│   ├── linear/
│   ├── hash-based/
│   ├── trees/
│   ├── graphs/
│   └── advanced/
│
└── assets/
    └── diagrams/

Now generate code for: [TOPIC_NAME]

Output rules:
1. Generate only JavaScript code in a single code block.
2. Do not give explanation outside the code unless I ask.
3. Code must be interview-ready, clean, maintainable, and production-style.
4. Use strong naming, edge-case handling, and readable methods.
5. Use class-based implementation.
6. Add clear section comments like:
   - Creation / Initialization
   - Basic state helpers
   - Insertion operations
   - Deletion operations
   - Access / Read operations
   - Update operations
   - Traversal / conversion
   - Reverse operations
   - Utility operations
   - Interview-focused operations
   - Internal helpers
7. Include a small example usage at the bottom.
8. At the end of the file, include a large JavaScript block comment named exactly:

   OPERATIONS (MEMORIZATION GUIDE)

9. The memorization guide must be inside JS comments only, not markdown.
10. The memorization guide must be clean and structured like this:
    - Title line with ==========
    - Important Rule section if needed
    - Numbered sections
    - Each method name
    - “Steps:” under each method
    - Short, easy-to-memorize steps
11. Keep memorization steps simple, clean, and interview-focused.
12. When useful, mention time-efficient design choice in comments.
13. Prefer O(1) end operations wherever possible based on the data structure design.
14. Handle empty structure, single element, invalid index, and boundary conditions properly.
15. Use helper methods like _validateIndex, _getNodeAt, etc. when appropriate.
16. Return sensible values consistently:
    - return this for chaining where suitable
    - return removed value or removed node consistently based on structure design
    - return boolean for success/failure where suitable
17. Keep code style consistent with the previously generated structures:
    - Singly Linked List
    - Doubly Linked List
    - Circular Linked List
    - Stack using array
    - Stack using linked list
    - Queue using array
    - Queue using linked list
    - Deque using doubly linked list
18. For linked-list-based structures, prefer explicit node classes.
19. For array-based structures, avoid inefficient operations like shift() when a front pointer is better.
20. If the structure has direction-specific behavior, use clear names like:
    - front / rear
    - head / tail
    - top
    - prev / next
21. If recursive reverse is not ideal for that data structure, use a simple practical version and mention that in comments.
22. Include only methods relevant to that data structure. Do not force unrelated methods.
23. Keep the implementation clean enough that I can directly copy it into my GitHub repo and use it for interview preparation.

Coding style requirements:
- Use modern JavaScript class syntax.
- Use meaningful method names.
- Use JSDoc-style comments for constructors when useful.
- Keep formatting neat and consistent.
- Avoid unnecessary cleverness.
- Prioritize readability over overly compact code.
- Make the code suitable for memorization and whiteboard interview prep.

When I ask for a new topic later, follow the same standards automatically.