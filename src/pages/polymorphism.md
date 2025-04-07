---
layout: ../layouts/Layout.astro
---

# Polymorphism

In a traditional CPU architecture, each memory address contains a set of bits. Different instructions treat these bits as different types of value: signed versus unsigned, integer versus floating point. A set of bits can be used to represent a text character, or a bitmask, or any other number of things.

In CUPS, a memory address contains an unbounded stack, in which each element is, like a traditional architecture, a word of bits. On each sub-element, we can apply the above 'interpretations' of data on the underlying bits.

However, we can also apply the same type of 'interpretation' on the stack itself. Every instruction in the CUPS architecture will interpret the stack as one of a various number of data types, even with the same underlying data. This is the concept of **polymorphism** within CUPS.

A good example of CUPS polymorphism is the string 'type'.  There are many instructions which act directly on a stack as if it were a string. These instructions treat the stack as an array of characters, where each sub-element is a character.

```
# Register A contains a single stack, containing the ASCII
# values of the string "Hello World"
mov A (72 101 108 108 111 32 87 111 114 108 100)

# Register B contains the same (syntactic sugar for the above)
mov B "Hello World"

# tupr (String Uppercase) acts on value as if it is a string
tupr X A
tlwr Y B
# Register X contains (72 69 76 76 79 32 87 79 82 76 68)
# 'HELLO WORLD'
# Register Y contains (104 101 108 108 111 32 119 111 114 108 100)
# 'hello world'
```

The underlying data stays the same regardless of which 'type' the data is being treated as by the instruction. For example, it is possible to call instructions which expect an integer type on the above data even though it was previously being treated as a string. Instructions which interpret a stack as an integer ignore all but the top/first value in the stack, and treat the top/first value as the representative integer.

```
mov B "Hello World"
iadd B 2 # integer add 2

# B contains "Jello World" (first value was incremented by 2)
```

## Types

- **Stack** — the 'default' data type; data is treated as a stack of numbers.
- **Integer** — first element of the data is treated as a single integer, all other elements ignored. Instructions which produce a new integer will create a single-element stack containing the value.
- **String** — data is treated as a list of characters.
- **Boolean** — first element of the data is treated as a boolean value, where 0 is false and any non-0 value is true. All other elements ignored. Instructions which produce a new boolean will create a single-element stack containing either 0 or 1.