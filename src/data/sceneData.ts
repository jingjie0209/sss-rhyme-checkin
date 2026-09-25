export type SceneSong = { id: string; no: number; title: string };
export type SceneGroup = { id: string; num: number; name: string; songs: SceneSong[] };

// 日常场景儿歌（从早到晚）
export const SCENE_GROUPS: SceneGroup[] = [
  { id: "scene-01", num: 1, name: "起床", songs: [{ id: "sce-001", no: 1, title: "Good Morning, Mr. Rooster" }, { id: "sce-002", no: 2, title: "Are You Sleeping" }] },
  { id: "scene-02", num: 2, name: "洗漱", songs: [{ id: "sce-003", no: 1, title: "Wash Your Hands" }] },
  { id: "scene-04", num: 3, name: "吃饭", songs: [{ id: "sce-004", no: 1, title: "The Bananas Song" }, { id: "sce-005", no: 2, title: "Peanut Butter & Jelly" }, { id: "sce-006", no: 3, title: "Are You Hungry" }, { id: "sce-007", no: 4, title: "Do You Like Spaghetti Yogurt" }] },
  { id: "scene-05", num: 4, name: "上厕所", songs: [{ id: "sce-008", no: 1, title: "Sitting On The Potty" }] },
  { id: "scene-06", num: 5, name: "穿衣服", songs: [{ id: "sce-009", no: 1, title: "This Is The Way We Get Dressed" }] },
  { id: "scene-08", num: 6, name: "晴天", songs: [{ id: "sce-010", no: 1, title: "How's The Weather" }] },
  { id: "scene-09", num: 7, name: "雨天", songs: [{ id: "sce-011", no: 1, title: "Rain Rain Go Away" }] },
  { id: "scene-10", num: 8, name: "雪天", songs: [{ id: "sce-012", no: 1, title: "Little Snowflake" }] },
  { id: "scene-11", num: 9, name: "去散步", songs: [{ id: "sce-013", no: 1, title: "Walking Walking" }] },
  { id: "scene-12", num: 10, name: "过马路", songs: [{ id: "sce-014", no: 1, title: "Red Light, Green Light" }, { id: "sce-015", no: 2, title: "10 Little Buses" }, { id: "sce-016", no: 3, title: "The Wheels On The Bus" }] },
  { id: "scene-13", num: 11, name: "游乐场、户外", songs: [{ id: "sce-017", no: 1, title: "Take Me Out To The Ball Game" }] },
  { id: "scene-14", num: 12, name: "礼貌", songs: [{ id: "sce-018", no: 1, title: "Hello Hello!" }, { id: "sce-019", no: 2, title: "See You Later, Alligator" }, { id: "sce-020", no: 3, title: "Goodbye, See You Soon" }] },
  { id: "scene-15", num: 13, name: "玩耍", songs: [{ id: "sce-021", no: 1, title: "What's Your Name" }] },
  { id: "scene-16", num: 14, name: "游戏", songs: [{ id: "sce-022", no: 1, title: "Head Shoulders Knees & Toes (Sing It)" }, { id: "sce-023", no: 2, title: "One Little Finger" }, { id: "sce-024", no: 3, title: "Hello Hello! Can You Clap Your Hands" }, { id: "sce-025", no: 4, title: "How Many Fingers" }, { id: "sce-026", no: 5, title: "Where Is Thumbkin" }] },
  { id: "scene-17", num: 15, name: "整理房间", songs: [{ id: "sce-027", no: 1, title: "Clean Up Song" }] },
  { id: "scene-18", num: 16, name: "颜色、画画", songs: [{ id: "sce-028", no: 1, title: "I See Something Pink" }, { id: "sce-029", no: 2, title: "I See Something Blue" }, { id: "sce-030", no: 3, title: "Red Yellow Green Blue" }, { id: "sce-031", no: 4, title: "what is your favorite calor" }] },
  { id: "scene-19", num: 17, name: "星期", songs: [{ id: "sce-032", no: 1, title: "Days Of The Week Song" }] },
  { id: "scene-20", num: 18, name: "月份", songs: [{ id: "sce-033", no: 1, title: "The Months Chant" }] },
  { id: "scene-21", num: 19, name: "形状、积木游戏", songs: [{ id: "sce-034", no: 1, title: "Make A Circle" }, { id: "sce-035", no: 2, title: "The Shape Song #1" }, { id: "sce-036", no: 3, title: "The Shape Song #2" }] },
  { id: "scene-22", num: 20, name: "躲猫猫", songs: [{ id: "sce-037", no: 1, title: "Hide and Seek #1" }, { id: "sce-038", no: 2, title: "Hide and Seek #2" }] },
  { id: "scene-23", num: 21, name: "折纸游戏", songs: [{ id: "sce-039", no: 1, title: "Open Shut Them" }, { id: "sce-040", no: 2, title: "Open Shut Them #2" }, { id: "sce-041", no: 3, title: "Open Shut Them #3" }] },
  { id: "scene-24", num: 22, name: "洗澡", songs: [{ id: "sce-042", no: 1, title: "The Bath Song" }, { id: "sce-043", no: 2, title: "The Baby In The Bath" }] },
  { id: "scene-25", num: 23, name: "睡觉", songs: [{ id: "sce-044", no: 1, title: "This Is The Way We Go To Bed" }, { id: "sce-045", no: 2, title: "Twinkle Twinkle Little Star" }, { id: "sce-046", no: 3, title: "Sweet Dreams (Goodnight Song)" }] }
];
