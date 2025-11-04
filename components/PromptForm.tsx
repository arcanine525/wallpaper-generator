
import React, { useState } from 'react';
import { AspectRatio, AspectRatioOption } from '../types';
import { ASPECT_RATIO_OPTIONS } from '../constants';
import { SparklesIcon } from './icons';

interface PromptFormProps {
    onGenerate: (prompt: string, aspectRatio: AspectRatio) => void;
    isLoading: boolean;
    initialPrompt?: string;
}

const PromptForm: React.FC<PromptFormProps> = ({ onGenerate, isLoading, initialPrompt = "Rainy cyberpunk lo-fi" }) => {
    const [prompt, setPrompt] = useState(initialPrompt);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim() && !isLoading) {
            onGenerate(prompt, aspectRatio);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 fixed bottom-0 left-0 right-0 md:static md:border-t-0 md:bg-gray-900 md:p-6 z-20">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your vibe..."
                    className="w-full sm:flex-1 bg-gray-700 border border-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 resize-none"
                    rows={2}
                    disabled={isLoading}
                />
                <div className="w-full sm:w-auto flex items-center gap-3">
                    <select
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                        className="w-full sm:w-auto bg-gray-700 border border-gray-600 text-white rounded-lg p-3 appearance-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                        disabled={isLoading}
                    >
                        {ASPECT_RATIO_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isLoading ? (
                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                           <SparklesIcon/>
                        )}
                        <span className="hidden sm:inline ml-2">Generate</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PromptForm;
