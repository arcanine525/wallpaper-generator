
import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from '../types';

export const generateWallpapers = async (prompt: string, aspectRatio: AspectRatio): Promise<string[]> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const enhancedPrompt = `${prompt}, phone wallpaper, 4k, high resolution, cinematic, professional photography`;
        
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: enhancedPrompt,
            config: {
                numberOfImages: 4,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio,
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages.map(img => img.image.imageBytes);
        } else {
            throw new Error("No images were generated. The response might have been blocked.");
        }
    } catch (error) {
        console.error("Error generating images:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate wallpapers: ${error.message}`);
        }
        throw new Error("An unknown error occurred during image generation.");
    }
};
