export const getDate = (date,week) =>{
    const current = newDate();
    const crrentDay = current.getDay();
    const targetDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(day);
    const diff = targetDay - currentDay + (week === "next" ? 7 : 0);
    current.setDate(current.getDate() + diff);
    return current.toISOString().split("T")[0]; // Format as YYYY-MM-DD
}