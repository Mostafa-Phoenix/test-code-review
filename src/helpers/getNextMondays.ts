export const getNex4Mondays = () => {
    let mondays = [];
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let date = currentDate.getDate();
    let nextMonday = new Date(year, month, date + 2 +  (currentDate.getDay() === 1 ? 0 : (7 - currentDate.getDay()) % 7));

    for (let i = 0; i < 6; i++) {
        const monday = new Date(nextMonday.getFullYear(), nextMonday.getMonth(), nextMonday.getDate() + i * 7);
        mondays.push(monday);
    }
    return mondays;
};
