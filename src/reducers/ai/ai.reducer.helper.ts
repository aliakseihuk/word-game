import { ALPHABET } from "src/constants";

export const pickLetter = (checkedLetters: string[] = []) => {
    const alphabet = ALPHABET.split('');
    
    for (let letter of checkedLetters) {
        letter = letter.toUpperCase();
        const index = alphabet.indexOf(letter);
        
        if (index > -1) {
            alphabet.splice(index, 1);
        }
    }

    const randomIndex = Math.floor(Math.random() * alphabet.length);

    return alphabet[randomIndex];
}
