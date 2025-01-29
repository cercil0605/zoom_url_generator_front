export const getDate = (day, week) => {
    const current = new Date(); // newDate() を new Date() に修正
    const currentDay = current.getDay(); // 現在の曜日を取得（0〜6）
    const targetDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(day); // 目標曜日のインデックスを取得
    const diff = targetDay - currentDay + (week === "next" ? 7 : 0); // 差分を計算

    current.setDate(current.getDate() + diff); // 現在の日付に差分を加算
    return current.toISOString().split("T")[0]; // YYYY-MM-DD 形式で日付を返す
}
