---
value: 4
code: call
name: Call
category: generic
description: Push PC+1 to call stack and jump to address A
operands:
    - type: integer
      write: false
---

**Call** is largely used for calling subroutines. The address pushed to the call stack can be returned to using the [return](/opcodes/return) instruction.