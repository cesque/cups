---
layout: ../layouts/Layout.astro
---

# Addressing modes

CUPS has multiple addressing modes:

| Name | Mnemonic | Description | Example |
| --- | --- | --- | --- |
| Immediate | I | A constant value | `3` |
| Absolute | A | The value at a given address | `@1000` |
| Register | R | The value in a given register | `a` |
| Register-absolute | X | The value at the addess stored in the given register | `@a` |

## Immediate addressing mode

### Read

The **Immediate** addressing mode is the simplest. It will use the constant value of whatever the operand is. E.g.:

```
gspush 123 # pushes the value 123 to the global stack
```
which is equivalent to
```
gspush (123)
```
using [Number polymorphism](polymorphism).

### Write

Writing to an operand with **Immediate** addressing mode writes to the memory address given.

```
mov 1000 123 # writes the value 123 to memory address 1000
```

[Labels](labels) can be used in immediate mode to refer to labelled memory addresses e.g.:

```
some_label: 123

iinc some_label
```

The above code stores the value 123 in a memory address labelled by the label `some_label`, and then increments that value by passing the label address to the `iinc` instruction. 

## Absolute addressing mode

### Read

The **Absolute** addressing mode fetches the value at a given address.

```
gspush @1000 # reads the value at address 1000 and pushes it to the global stack
```

It can be used with labels to fetch the value at a labelled address, as in the following code where it fetches the value (123) at the address `some_variable` and pushes that value to the global stack.

```
some_variable: 123

gspush @some_variable # pushes the value at the some_variable label to the global stack
```

### Write

Writing to a value with **Absolute** addressing mode first fetches the value at the indicated address, and then uses that as the target address for the write.

```
mov 1000 123 # write 123 to address 1000
mov @1000 456 # write 456 to address 123 (by reading that address from address 1000)
```

Again, this can be used with labels:

```
offset: data_start # address contains the address of data_start

mov @offset 1
iinc offset
mov @offset 2
iinc offset
mov @offset 3

data_start: 0 0 0
```

After this code runs, the 3 memory addresses following the label `data_start` will contain `1 2 3`. The `mov` instructions write to the address contained at the memory address labelled by `offset`, which is incremented after each write by the `iinc` instruction.

## Register addressing mode

### Read

The **Absolute** addressing mode fetches the value in a given register.

```
gspush A # pushes the value stored in register A to the global stack
```

### Write

Writing to a value with **Register** addressing mode writes a value to the associated register.

```
mov A 123 # stores the value 123 in the register A
```

## Register-absolute addressing mode

### Read

The **Register-absolute** addressing mode fetches the value at the address in a given register. This works the same as the Absolute addressing mode but with register values instead of memory addresses.

```
mov A 1000
mov B some_data

gspush @A # pushes the value at address 1000 to the global stack
gspush @B # pushes the value at address labelled by some_data to the global stack (123)

some_data: 123
```

### Write

Writing to a value with **Register** addressing mode writes a value to the address contained in the associated register.

```
mov A data_start
mov @A 1
iinc A
mov @A 2
iinc A
mov @A 3

data_start: 0 0 0
```

After this code runs, the 3 memory addresses following the label `data_start` will contain `1 2 3`. The `mov` instructions write to the address contained in register A, which is incremented after each write by the `iinc` instruction. This example works the same as the example for the Absolute addressing mode above, but stores the pointer in an address rather than in a memory address.