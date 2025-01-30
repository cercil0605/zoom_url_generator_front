export const getDate = (day, week = "this") => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const targetDay = daysOfWeek.indexOf(day);
    if (targetDay === -1) {
        throw new Error("Invalid day. Please use a valid weekday name (e.g., 'Monday').");
    }

    const current = new Date();
    const currentDay = current.getDay(); // 日曜=0, 土曜=6

    let diff = targetDay - currentDay;
    if (week === "next") {
        diff += 7; // 来週の日付を取得
    } else if (week !== "this") {
        throw new Error("Invalid week. Please use 'this' or 'next'.");
    }

    current.setDate(current.getDate() + diff);
    return current.toISOString().split("T")[0]; // YYYY-MM-DD 形式で返す
};