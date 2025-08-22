import type { QuizData } from "./types";

export function updateScoreBoard(data: QuizData) {
    let oldQuizData = getScoreBoardData();
    if (oldQuizData) {
        oldQuizData.push(data);
    } else {
        oldQuizData = [data];
    }
    setNewScoreData(oldQuizData);
}

export function getScoreBoardData() {
    const data = JSON.parse(localStorage.getItem('quizdata') as string)
    if (data) {
        return data.sort((a: QuizData, b: QuizData) => b.score - a.score);
    }
    return null;
}

export function setNewScoreData(data: QuizData[]) {
    return localStorage.setItem('quizdata', JSON.stringify(data));
}

export function shuffle(array: string[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array
}