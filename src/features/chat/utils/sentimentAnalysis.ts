/**
 * Detects sentiment from user text, focusing on Anger and Inquisitiveness.
 * Includes standard Vietnamese and Gen Z slang.
 */
export type Sentiment = 'neutral' | 'angry' | 'inquisitive';

export const analyzeSentiment = (text: string): Sentiment => {
    const lowerText = text.toLowerCase();

    // Keywords for Inquisitive (Why?)
    const whyKeywords = [
        'tại sao', 'sao', 'lý do', 'là sao', 'thế nào', 'gì cơ', 'what', 'why'
    ];

    // Keywords for Anger / Dissatisfaction (Standard + Gen Z)
    const angerKeywords = [
        // Standard
        'bực', 'tệ', 'kém', 'chán', 'ghét', 'không hài lòng', 'thất vọng', 'làm ăn', 'kì cục', 'vớ vẩn',
        'láo', 'bố láo', 'mất dạy', 'ngu', 'điên', 'khùng',

        // Gen Z Slang / Internet Slang
        'hãm', 'xu', 'cà chớn', 'như hạch', 'như l', 'vãi', 'vcl', 'đcm', 'đkm', 'vkl',
        'trầm cảm', 'mệt mỏi', 'xàm', 'ngáo', 'phèn', 'chúa hề', 'ôi dồi ôi', 'dở hơi',
        'cay', 'bực mình', 'ức chế', 'chán đời', 'âm binh', 'cùi bắp'
    ];

    // Check for Anger first (Priority)
    if (angerKeywords.some(kw => lowerText.includes(kw))) {
        return 'angry';
    }

    // Check for "Why"
    if (whyKeywords.some(kw => lowerText.includes(kw))) {
        return 'inquisitive';
    }

    return 'neutral';
};
