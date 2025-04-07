---
value: 5
code: return
name: Return
category: generic
description: Pop an address from the call stack and jump to that address
operands:
    - type: integer
      write: false
---

Mostly for use with [call](/opcodes/call), but the call stack can also be manually manipulated.

If the call stack is empty, the behaviour is undefined (implementations should most likely crash).