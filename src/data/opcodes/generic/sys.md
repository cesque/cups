---
value: 2
code: sys
name: System Call
category: generic
description: Calls the System Call with the provided name.
operands:
    - type: string
      write: false
---

For more detailed information see [System Calls](system-calls).

External devices can register system calls which can then be called from CUPS using this instruction. The system call is bound by a string name, which should be unique (non-unique system call name behaviour is not defined).

The external devices have full read and write access to CUPS memory, registers, flags, and the global stack during the execution of the system call. External vendors should define their own requirements for how their system call works; most simple system calls will most likely just use values loaded into specific registers.

Some example (hypothetical) system calls:

```
# no argument, populates X and Y registers 
sys "get-mouse-position"
mov mouse_position_x X
mov mouse_position_y Y
```

```
# console output with argument loaded into register A
mov A "hello world"
sys "print"
```

```
# full memory access: blit memory area to screen
# memory address loaded into register A
mov A graphics_data
sys "blit"

graphics_data: #...
```