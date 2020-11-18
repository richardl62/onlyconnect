// Shuffle array in place. Return the shuffled array
export function shuffleArray<T>(array: Array<T>) {
    // From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
export  class DumbEncrypt {
    private static readonly  prime = 19793;
  
    static doInt(val: number) {
      const encrypted = val * this.prime +
        Math.floor(Math.random() * this.prime);
  
      if(this.undoInt(encrypted) !== val) {
        throw new Error(`DumbEncypt.doInt Cannot encrypt ${val}`);
      } 
      return encrypted;
    }
  
    static undoInt(val: number) {
      return Math.floor(val / this.prime);
    }
  };

