export const getMondays = (year: number, month: number) => {
    let mondays = [];
    let firstDayOfMonth = new Date(year, month, 1);
    let firstMondayOfMonth = 2 + (7 - firstDayOfMonth.getDay()) % 7;

    for (let day = firstMondayOfMonth; day <= 31; day += 7) {
        const monday = new Date(year, month, day);
        if (monday.getMonth() === month) {
            mondays.push(monday);
        }else{
            break;
        }
    }
    return mondays;
};