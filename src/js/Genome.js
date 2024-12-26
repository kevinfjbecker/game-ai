export default class Genome
{
    constructor(chromosomeLength)
    {
        this.bits = Array(chromosomeLength)
            .fill(null)
            .map(() => Math.floor(Math.random() + 0.5))
        
        this.fitness = 0
    }
}