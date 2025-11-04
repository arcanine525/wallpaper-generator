
import React from 'react';

interface ImageGridProps {
    images: string[];
    onImageClick: (image: string) => void;
    isLoading: boolean;
    prompt: string;
}

const ImageCard: React.FC<{ image: string; onClick: () => void }> = ({ image, onClick }) => (
    <div 
        className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden cursor-pointer group transform hover:scale-105 transition-transform duration-300"
        onClick={onClick}
    >
        <img
            src={`data:image/jpeg;base64,${image}`}
            alt="Generated wallpaper"
            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
        />
    </div>
);

const ImageGrid: React.FC<ImageGridProps> = ({ images, onImageClick, isLoading, prompt }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center text-center text-gray-400 min-h-[40vh] p-4">
                <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-t-4 border-t-purple-500 rounded-full animate-spin"></div>
                </div>
                <h2 className="text-xl font-bold text-white">Generating your vibe...</h2>
                <p className="mt-2 text-lg text-gray-300 italic max-w-lg">"{prompt}"</p>
            </div>
        );
    }
    
    if (images.length === 0 && !isLoading) {
        return (
            <div className="flex flex-col items-center justify-center text-center text-gray-400 min-h-[40vh] p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="text-xl font-bold text-white">Welcome to Vibe Wallpaper</h2>
                <p>Describe your perfect wallpaper and let AI bring it to life.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6">
            {images.map((image, index) => (
                <ImageCard key={index} image={image} onClick={() => onImageClick(image)} />
            ))}
        </div>
    );
};

export default ImageGrid;
