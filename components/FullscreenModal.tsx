
import React, { useEffect } from 'react';
import { CloseIcon, DownloadIcon, RemixIcon } from './icons';

interface FullscreenModalProps {
    image: string;
    onClose: () => void;
    onDownload: (image: string) => void;
    onRemix: () => void;
}

const FullscreenModal: React.FC<FullscreenModalProps> = ({ image, onClose, onDownload, onRemix }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
        >
            <style>
                {`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
                `}
            </style>
            
            <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
                onClick={onClose}
            >
                <CloseIcon />
            </button>

            <div className="relative w-full max-w-md h-full max-h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <img
                    src={`data:image/jpeg;base64,${image}`}
                    alt="Fullscreen wallpaper"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
            </div>
            
            <div className="flex items-center gap-4 mt-6" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={() => onDownload(image)}
                    className="flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                    <DownloadIcon />
                    Download
                </button>
                <button
                    onClick={onRemix}
                    className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    <RemixIcon />
                    Remix
                </button>
            </div>
        </div>
    );
};

export default FullscreenModal;
