import { ALPHABET } from "src/constants";

export const pickLetterFromAlphabet = (lettersToSkip: string[] = []) => {
    const alphabet = ALPHABET.split('');
    
    for (let letter of lettersToSkip) {
        letter = letter.toUpperCase();
        const letterIndex = alphabet.indexOf(letter);
        
        if (letterIndex > -1) {
            alphabet.splice(letterIndex, 1);
        }
    }

    const randomIndex = Math.floor(Math.random() * alphabet.length);

    return alphabet[randomIndex];
}
