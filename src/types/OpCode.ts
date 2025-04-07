export type OperandTypeHint = 'integer' | 'string' | 'stack' | 'boolean'

export type OpCodeCategory = 'generic' | 'global-stack' | 'integer' | 'jump'

export type OpCode = {
    category: OpCodeCategory
    value: number
    code: string
    name: string
    operands: Operand[]

    description: string
}

export type Operand = {
    type: OperandTypeHint
    write: boolean
}