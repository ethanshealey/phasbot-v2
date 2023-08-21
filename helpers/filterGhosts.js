export default (ghosts, evidence, notEvidence) => {

    if(!evidence?.length && !notEvidence?.length) return ghosts

    const possible = ghosts.filter((g) => {
        // Remove ghosts that DONT have evidence
        for(let i = 0; i < evidence.length; i++) 
            if(!g.evidence.includes(evidence[i]))
                return false
        // Remove ghosts that DO have rejected evidence
        for(let i = 0; i < notEvidence.length; i++) {
            if(g.evidence.includes(notEvidence[i]))
                return false
        }
        // Valid Ghost
        return true
    })

    return possible
}