// utils/predict.ts

interface Section {
    sectionNumber: number;
    numbers: number[];
}

// Define sections of the roulette table
const sections: Section[] = [
    { sectionNumber: 1, numbers: [32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13] },   // Section 1: 1st 12 (1-12)
    { sectionNumber: 2, numbers: [36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20] },    // Section 2: 2nd 12 (13-24)
    { sectionNumber: 3, numbers: [14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26] }     // Section 3: 3rd 12 (25-36)
];

export function predictNextSection(lastNumbers: number[]): number | null {
    if (lastNumbers.length < 10) {
        console.log("Not enough data to predict.");
        return null;
    }

    // Convert the last 10 numbers to their respective sections
    const lastSections: any[] = lastNumbers.slice(-10).map(getSectionNumber);

    // Count occurrences of each section
    const counts: { [key: number]: number } = {};
    lastSections.forEach(section => {
        counts[section] = counts[section] ? counts[section] + 1 : 1;
    });

    // Find the most common section (mode)
    let mostCommonSection = 1;
    let maxCount = counts[1] || 0;
    for (let section = 2; section <= 3; section++) {
        if (counts[section] && counts[section] > maxCount) {
            mostCommonSection = section;
            maxCount = counts[section];
        }
    }

    // Predict the next section based on the most common section
    const nextSection = (mostCommonSection % 3) + 1;  // Move to the next section (1 -> 2 -> 3 -> 1)
    
    return nextSection;
}

function getSectionNumber(number: number): number | undefined {
    for (const section of sections) {
        if (section.numbers.includes(number)) {
            return section.sectionNumber;
        }
    }
    return undefined;
}
