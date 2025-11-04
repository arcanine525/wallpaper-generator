import React, { useState, useCallback } from 'react';
import PromptForm from './components/PromptForm';
import ImageGrid from './components/ImageGrid';
import FullscreenModal from './components/FullscreenModal';
import { generateWallpapers, generateRandomPrompt } from './services/geminiService';
import { AspectRatio } from './types';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("A peaceful alien forest at twilight");
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleGenerate = useCallback(async (currentPrompt: string, currentAspectRatio: AspectRatio) => {
        setIsLoading(true);
        setError(null);
        setImages([]); // Clear previous images
        setPrompt(currentPrompt);
        setAspectRatio(currentAspectRatio);

        try {
            const generatedImages = await generateWallpapers(currentPrompt, currentAspectRatio);
            setImages(generatedImages);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleFeelingLucky = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setImages([]);
        
        try {
            const randomPrompt = await generateRandomPrompt();
            setPrompt(randomPrompt);
            const generatedImages = await generateWallpapers(randomPrompt, aspectRatio);
            setImages(generatedImages);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred while feeling lucky.");
        } finally {
            setIsLoading(false);
        }
    }, [aspectRatio]);

    const handleRemix = useCallback(() => {
        if (prompt) {
            setSelectedImage(null); // Close modal before generating
            handleGenerate(prompt, aspectRatio);
        }
    }, [prompt, aspectRatio, handleGenerate]);
    
    const handleDownload = (base64Image: string) => {
        const link = document.createElement('a');
        link.href = `data:image/jpeg;base64,${base64Image}`;
        const fileName = prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 20);
        link.download = `${fileName}_${new Date().getTime()}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <header className="p-4 md:p-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Vibe Wallpaper Generator
                </h1>
                <p className="text-gray-400 mt-1">Craft your perfect phone background with AI</p>
            </header>
            
            <main className="flex-grow pb-32 md:pb-0">
                {error && (
                    <div className="max-w-4xl mx-auto my-4 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
                        <p><strong>Error:</strong> {error}</p>
                    </div>
                )}
                <ImageGrid images={images} onImageClick={setSelectedImage} isLoading={isLoading} prompt={prompt} />
            </main>
            
            <PromptForm 
                onGenerate={handleGenerate} 
                onFeelingLucky={handleFeelingLucky}
                isLoading={isLoading} 
                initialPrompt={prompt}
                aspectRatio={aspectRatio}
                onAspectRatioChange={setAspectRatio}
            />

            {selectedImage && (
                <FullscreenModal
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                    onDownload={handleDownload}
                    onRemix={handleRemix}
                />
            )}
        </div>
    );
};

export default App;
