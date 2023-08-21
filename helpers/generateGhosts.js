export default async () => {
    const res = await fetch('https://phasmophobia.ethanshealey.com/api/v1/ghosts')
    const data = await res.json()
    return data.ghosts
}