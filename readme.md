### next 架构
     _________ 
    |         |
    | Next.js |
    |_________| 
         |
         |
         |
 ________▼________               ____________                _____________
|                 |   dispatch  |            |              |             |
| getInitialProps |------------▶|   Action   |-------------▶|    Store    |
|_________________|             |____________|              |____________ |
                                      ▲                             |
                                      |                             |
                                      |                             |
                                      |                   __________▼___________
                                      |                 |                       |
                                      |                 |       withRedux       |
                                      |                 | (next-redux-wrapper)  |
                                      |                 |_______________________|
                                      |                             |
                                      |                             |
                                      |                             |
                                      |                      _______▼______
                                      |       dispatch      |              |
                                      |---------------------|     page     |
                                                            |______________|