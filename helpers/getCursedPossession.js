export default async (name) => {
    const res = await fetch(`https://phasmophobia.ethanshealey.com/api/v1/cursed-possessions/${name}`)
    const data = await res.json()
    return data.cursedPossessions
}