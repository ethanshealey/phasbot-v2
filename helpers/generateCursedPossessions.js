export default async () => {
    const res = await fetch('https://phasmophobia.ethanshealey.com/api/v1/cursed-possessions')
    const data = await res.json()
    return data.cursedPossessions
}