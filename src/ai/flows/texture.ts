
'use server';
/**
 * @fileOverview A texture generation AI agent.
 *
 * - generateTexture - A function that handles the texture generation process.
 * - GenerateTextureInput - The input type for the generateTexture function.
 * - GenerateTextureOutput - The return type for the generateTexture function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { TEXTURE_GENERATION_PROMPT } from '../prompts/texture-prompt';

const GenerateTextureInputSchema = z.object({
  prompt: z
    .string()
    .describe('A text description of the desired texture, e.g., "A dense forest with palm trees as seen from above."'),
  imageDataUri: z
    .string()
    .describe(
      "The base image to modify, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateTextureInput = z.infer<typeof GenerateTextureInputSchema>;

const GenerateTextureOutputSchema = z.object({
    generatedDataUri: z.string().describe('The generated image as a data URI.'),
});
export type GenerateTextureOutput = z.infer<typeof GenerateTextureOutputSchema>;

export async function generateTexture(input: GenerateTextureInput): Promise<GenerateTextureOutput> {
    return await generateTextureFlow(input);
}


const generateTextureFlow = ai.defineFlow(
  {
    name: 'generateTextureFlow',
    inputSchema: GenerateTextureInputSchema,
    outputSchema: GenerateTextureOutputSchema,
  },
  async ({ prompt, imageDataUri }) => {

    const fullAIPrompt = TEXTURE_GENERATION_PROMPT.replace('{{prompt}}', prompt);

    const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: [
            { media: { url: imageDataUri } },
            { text: fullAIPrompt },
        ],
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
    });
    
    if (!media.url) {
        throw new Error('Image generation failed to return an image.');
    }

    return { generatedDataUri: media.url };
  }
);
