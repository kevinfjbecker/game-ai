import Genome from "./Genome"

export default class Pathfinder
{
    constructor(options = {})
    {
        const {
            poplulationSize = 140,
            crossoverRate = 0.7,
            mutationRate = 0.001,
            chromosomeLength = 70,
            geneLength = 2,
        } = options

        this.poplulationSize = poplulationSize
        this.crossoverRate = crossoverRate
        this.mutationRate = mutationRate
        this.chromosomeLength = chromosomeLength
        this.geneLength = geneLength

        this.genomes = []
        this.fittestGenome = 0
        this.bestFitnessScore = 0
        this.totalFitnessScore = 0
        this.generation = 0
        this.busy = false

        this.createStartPopulation()
    }

    createStartPopulation()
    {
        this.genomes.length = 0

        for(let i = 0; i < this.poplulationSize; i++)
        {
            this.genomes.push(new Genome(this.chromosomeLength))
        }

        this.fittestGenome = 0
        this.bestFitnessScore = 0
        this.totalFitnessScore = 0
        this.generation = 0
        this.busy = false
    }

    decode(bits)
    {
        const directions = []

        for(let g = 0; g < this.chromosomeLength; g += this.geneLength)
        {
            const gene = []

            for(let b = 0; b < this.geneLength; b++)
            {
                gene.push(bits[g + b])
            }

            directions.push(this.binToInt(gene))
        }

        return directions
    }

    binToInt(bitArray)
    {
        let value = 0
        let multiplier = 1

        for(let i = bitArray.length - 1; i >= 0; i--)
        {
            value += bitArray[i] * multiplier

            multiplier *= 2
        }

        return value
    }
}