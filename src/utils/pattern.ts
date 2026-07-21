import type { Pattern } from '../types/pattern'

export function changePattern(selectedPatternName: string){
    // The selected pattern is loaded and set as the current pattern
    if(selectedPatternName != "New Pattern"){
        const savedPatterns = JSON.parse(localStorage.getItem("savedPatterns") ?? "[]")
        const newPattern = savedPatterns.filter((p: Pattern) => {return (p.title == selectedPatternName)})[0]
        return newPattern
    }
    else{
        const newPattern = {title: "New Pattern", author: "No Author", image: "No Image", difficulty: "Easy", sections: []}
        return newPattern
    }
}

export function savePattern(currentPattern: Pattern){
    // The currently saved patterns are loaded
    var savedPatterns = JSON.parse(localStorage.getItem("savedPatterns") ?? "[]")
    // If the localStorage includes the key for saved patterns, push it
    if(localStorage.getItem("savedPatterns") != null){
      // If a pattern with the same name exists, remove it
      const index_pattern = savedPatterns.findIndex((p: Pattern) => { return (p.title == currentPattern.title)})
      savedPatterns.splice(index_pattern, 1)
      savedPatterns.push(currentPattern)
    }
    // Else initialize it with an array containing one element, the current pattern being saved
    else {
      savedPatterns = [currentPattern]
    }
    // The array is stringified before saving as localStorage can only store primitive types
    localStorage.setItem("savedPatterns", JSON.stringify(savedPatterns))
}


export function changeTitle(newTitle: string, currentPattern: Pattern){
    // The title of the pattern is changed and the current pattern is re-rendered
    const changedPattern = {title: newTitle, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: currentPattern.sections}
    return changedPattern
}

export function changeAuthor(newAuthor: string, currentPattern: Pattern){
    // The author of the pattern is changed and the current pattern is re-rendered
    const changedPattern = {title: currentPattern.title, author: newAuthor, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: currentPattern.sections}
    return changedPattern
}

export function changeDifficulty(newDifficulty: string, currentPattern: Pattern){
    // The difficulty of the pattern is changed and the current pattern is re-rendered
    const changedPattern: Pattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: newDifficulty, sections: currentPattern.sections}
    return changedPattern
}


export function changeImage(imageURL: string, currentPattern: Pattern){
    // The image of the pattern is changed and the current pattern is re-rendered
    const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: imageURL, difficulty: currentPattern.difficulty, sections: currentPattern.sections}
    return changedPattern
  }