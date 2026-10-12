export type PlanSong = { id: string; no: number; title: string };
export type PlanWeek = { week: number; theme: string; songs: PlanSong[] };

// SSS 50 周打卡计划
export const PLAN_WEEKS: PlanWeek[] = [
  { week: 1, theme: "社交启蒙：打招呼、问好、再见", songs: [{ id: "plan-01-01", no: 1, title: "Good Morning, Mr. Rooster" }, { id: "plan-01-02", no: 2, title: "After A While, Crocodile" }, { id: "plan-01-03", no: 3, title: "Hello Hello! Can You Clap Your Hands" }, { id: "plan-02-01", no: 4, title: "Hello!" }, { id: "plan-02-02", no: 5, title: "Bye Bye Goodbye" }, { id: "plan-02-03", no: 6, title: "I'm A Little Snowman" }] },
  { week: 2, theme: "自我认知：认识身体部位", songs: [{ id: "plan-03-01a", no: 1, title: "Head Shoulders Knees & Toes (Learn It)" }, { id: "plan-03-01b", no: 2, title: "Head Shoulders Knees & Toes (Sing It)" }, { id: "plan-03-01c", no: 3, title: "Head Shoulders Knees & Toes (Speeding Up)" }, { id: "plan-03-02", no: 4, title: "One Little Finger" }, { id: "plan-03-03", no: 5, title: "The Pinocchio" }, { id: "plan-04-01", no: 6, title: "How Many Fingers" }, { id: "plan-04-02", no: 7, title: "BINGO" }, { id: "plan-04-03", no: 8, title: "I Have A Pet" }] },
];
