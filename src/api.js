export function getAllRacers() {
    fetch('http://localhost:8000/api/getAllElementsOfCollection')
    .then(res => res.json())
    .then((data) => {
        return data.items;
    }, (error) => {
        return error;
    })
}