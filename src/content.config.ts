import { defineCollection, z } from 'astro:content'
import { glob, file } from 'astro/loaders'
import type { OpCodeCategory, OperandTypeHint } from './types/OpCode'

const typeHintSchema: z.ZodType<OperandTypeHint> = z.enum(['integer', 'string', 'stack', 'boolean'])
const categorySchema: z.ZodType<OpCodeCategory> = z.enum(['generic', 'integer', 'jump', 'global-stack'])


const opcodes = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/data/opcodes' }),
    schema: z.object({
        category: categorySchema,
        value: z.number(),
        code: z.string(),
        name: z.string(),
        operands: z.array(z.object({
            type: typeHintSchema,
            write: z.boolean()
        })),
        
        description: z.string(),
    })
})


export const collections = {
    opcodes,
}