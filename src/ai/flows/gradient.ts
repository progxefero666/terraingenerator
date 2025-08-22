'use server';

import {z} from 'genkit';
import {ai} from '@/ai/genkit';

const GradientSchema = z.object({
  type: z.literal('circular'),
  x: z
    .number()
    .min(0)
    .max(1)
    .describe('Center x-coordinate from 0 (left) to 1 (right)'),
  y: z
    .number()
    .min(0)
    .max(1)
    .describe('Center y-coordinate from 0 (top) to 1 (bottom)'),
  radius: z
    .number()
    .min(0.05)
    .max(0.5)
    .describe('Radius of the gradient, as a fraction of canvas width'),
  scaleX: z.number().min(0.2).max(5).describe('Horizontal stretch factor'),
  scaleY: z.number().min(0.2).max(5).describe('Vertical stretch factor'),
  rotation: z.number().min(0).max(360).describe('Rotation in degrees'),
  intensity: z
    .number()
    .min(0.1)
    .max(1)
    .describe('Brightness of the gradient peak (0.1 to 1)'),
});

const AIPromptSchema = z.object({
  prompt: z
    .string()
    .describe(
      'A text description of the desired terrain, e.g., "A large central mountain with a smaller hill to the east."'
    ),
});
export type AIPrompt = z.infer<typeof AIPromptSchema>;
export type GradientOutput = z.infer<typeof GradientSchema>;

// This is a mock flow. In a real scenario, this would use an LLM to interpret the prompt.
const generateGradientsFlow = ai.defineFlow(
  {
    name: 'generateGradients',
    inputSchema: AIPromptSchema,
    outputSchema: z.array(GradientSchema),
  },
  async ({prompt}) => {
    console.log(
      `[AI MOCK] Received prompt: "${prompt}". Generating mock gradients.`
    );

    // Simple mock logic: generate a random number of gradients
    const numGradients = Math.floor(Math.random() * 4) + 2; // 2-5 gradients

    const gradients = Array.from({length: numGradients}, () => ({
      type: 'circular' as const,
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 0.15 + 0.05, // 0.05 to 0.20
      scaleX: 1 + (Math.random() - 0.5), // 0.5 to 1.5
      scaleY: 1 + (Math.random() - 0.5), // 0.5 to 1.5
      rotation: Math.random() * 360,
      intensity: Math.random() * 0.6 + 0.4, // 0.4 to 1.0
    }));

    return gradients;
  }
);

export async function generateGradients(
  prompt: AIPrompt
): Promise<GradientOutput[]> {
  return await generateGradientsFlow(prompt);
}
