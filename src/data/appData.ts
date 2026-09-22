export type ResourceSong = {
  id: string; no: number; title: string; hasLyrics: boolean; hasFlashcards: boolean; flashJpgCount: number;
};

export type ThemeGroup = {
  id: string; number: number; label: string; name: string; level: string; songCount: number;
  songs: ResourceSong[];
};

export const RESOURCE_DATA: {
  updatedAt: string;
  stats: { songs: number };
  themes: ThemeGroup[];
} = {
  "updatedAt": "2026-09-22",
  "stats": {
    "songs": 205
  },
  "themes": [
    {
      "id": "theme-01",
      "number": 1,
      "label": "01. 摇篮曲 词汇量10+",
      "name": "摇篮曲",
      "level": "词汇量10+",
      "songCount": 8,
      "songs": [
        {
          "id": "song-001",
          "no": 1,
          "title": "Twinkle Twinkle Little Star",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-002",
          "no": 2,
          "title": "Row Row Row Your Boat ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-003",
          "no": 3,
          "title": "Little Snowflake Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 1
        },
        {
          "id": "song-004",
          "no": 4,
          "title": "Sweet Dreams (Goodnight Song) ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-005",
          "no": 5,
          "title": "Are You Sleeping - Kids Songs - ",
          "hasLyrics": false,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-006",
          "no": 6,
          "title": "纯音乐 01.Hush Little Baby",
          "hasLyrics": false,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-007",
          "no": 7,
          "title": "纯音乐 02.Brahms’Lullaby",
          "hasLyrics": false,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-008",
          "no": 8,
          "title": "纯音乐 03.Twinkle Twinkle Little Star",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        }
      ]
    },
    {
      "id": "theme-02",
      "number": 2,
      "label": "02. 字母拼读 词汇量30+",
      "name": "字母拼读",
      "level": "词汇量30+",
      "songCount": 5,
      "songs": [
        {
          "id": "song-009",
          "no": 9,
          "title": "The Alphabet Chant featuring Noodle & Pals ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-010",
          "no": 10,
          "title": "Apples & Bananas ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 2
        },
        {
          "id": "song-011",
          "no": 11,
          "title": "The Alphabet Song Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-012",
          "no": 12,
          "title": "The Alphabet Is So Much Fun Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-013",
          "no": 13,
          "title": "Halloween ABC Song  ",
          "hasLyrics": false,
          "hasFlashcards": false,
          "flashJpgCount": 0
        }
      ]
    },
    {
      "id": "theme-03",
      "number": 3,
      "label": "03. 交通工具 词汇量30+",
      "name": "交通工具",
      "level": "词汇量30+",
      "songCount": 11,
      "songs": [
        {
          "id": "song-014",
          "no": 14,
          "title": "The Wheels On The Bus ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-015",
          "no": 15,
          "title": "10 Little Airplanes Kids Songs Count To Ten ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-016",
          "no": 16,
          "title": "10 Little Sailboats Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-017",
          "no": 17,
          "title": "10 Little Tractors Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-018",
          "no": 18,
          "title": "10 Little Buses Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-019",
          "no": 19,
          "title": "Let's Take The Subway Sing Along With Tobee ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-020",
          "no": 20,
          "title": "10 Little Bicycles Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-021",
          "no": 21,
          "title": "The Wheels On The Bus (2019) Nursery Rhymes ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-022",
          "no": 22,
          "title": "Driving In My Car Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-023",
          "no": 23,
          "title": "Here Comes The Fire Truck ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-024",
          "no": 24,
          "title": "The Wheels On The Bus (Carl's Car Wash Version)",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        }
      ]
    },
    {
      "id": "theme-04",
      "number": 4,
      "label": "04. 生活习惯 词汇量50+",
      "name": "生活习惯",
      "level": "词汇量50+",
      "songCount": 9,
      "songs": [
        {
          "id": "song-025",
          "no": 25,
          "title": "The Bath Song Original Kids Song ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 9
        },
        {
          "id": "song-026",
          "no": 26,
          "title": "Clean Up Song Kids Song for Tidying Up ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-027",
          "no": 27,
          "title": "This Is The Way Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-028",
          "no": 28,
          "title": "Brush Your Teeth Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-029",
          "no": 29,
          "title": "This Is The Way We Get Dressed Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 8
        },
        {
          "id": "song-030",
          "no": 30,
          "title": "This Is The Way We Go To Bed Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-031",
          "no": 31,
          "title": "Red Light, Green Light ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-032",
          "no": 32,
          "title": "Sitting On The Potty Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-033",
          "no": 33,
          "title": "Line Up!  featuring Noodle & Pals  ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        }
      ]
    },
    {
      "id": "theme-05",
      "number": 5,
      "label": "05. 社交启蒙 词汇量60+",
      "name": "社交启蒙",
      "level": "词汇量60+",
      "songCount": 13,
      "songs": [
        {
          "id": "song-034",
          "no": 34,
          "title": "Good Morning, Mr. Rooster ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-035",
          "no": 35,
          "title": "Hello, Reindeer Children's Christmas Song",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-036",
          "no": 36,
          "title": "Hello! ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-037",
          "no": 37,
          "title": "After A While, Crocodile ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-038",
          "no": 38,
          "title": "Hello, My Friends",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-039",
          "no": 39,
          "title": "Goodbye, My Friends Halloween Party Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-040",
          "no": 40,
          "title": "Bye Bye Goodbye Goodbye Song for Kids ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-041",
          "no": 41,
          "title": "Goodbye, Snowman Christmas Song for Kids ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-042",
          "no": 42,
          "title": "See You Later, Alligator Goodbye Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-043",
          "no": 43,
          "title": "The More We Get Together Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-044",
          "no": 44,
          "title": "Hello! featuring The Super Simple Puppets ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-045",
          "no": 45,
          "title": "Hello Hello!  featuring The Super Simple Puppets",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-046",
          "no": 46,
          "title": "What's Your Name (Super Simple Puppets version)  ",
          "hasLyrics": false,
          "hasFlashcards": false,
          "flashJpgCount": 0
        }
      ]
    },
    {
      "id": "theme-06",
      "number": 6,
      "label": "06. 认识身体 词汇量70+",
      "name": "认识身体",
      "level": "词汇量70+",
      "songCount": 16,
      "songs": [
        {
          "id": "song-047",
          "no": 47,
          "title": "Head Shoulders Knees & Toes (Sing It)",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-048",
          "no": 48,
          "title": "Head Shoulders Knees & Toes (Learn It)",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-049",
          "no": 49,
          "title": "One Little Finger featuring Noodle & Pals ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-050",
          "no": 50,
          "title": "This Is The Way We Carve A Pumpkin ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-051",
          "no": 51,
          "title": "I'm A Little Snowman ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-052",
          "no": 52,
          "title": "My Teddy Bear ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-053",
          "no": 53,
          "title": "Head Shoulders Knees & Toes (Speeding Up) Nursery Rhyme ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-054",
          "no": 54,
          "title": "Hello Hello! Can You Clap Your Hands Original Kids Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-055",
          "no": 55,
          "title": "The Pinocchio Nursery Rhymes ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 7
        },
        {
          "id": "song-056",
          "no": 56,
          "title": "The Skeleton Dance Halloween Song for Kids ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-057",
          "no": 57,
          "title": "How Many Fingers Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-058",
          "no": 58,
          "title": "Here We Go Looby Loo Nursery Rhymes ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-059",
          "no": 59,
          "title": "Where Is Thumbkin featuring Noodle & Pals ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-060",
          "no": 60,
          "title": "Head Shoulders Knees And Toes (2019) Noodle & Pals ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-061",
          "no": 61,
          "title": "With My Heart Kids Songs ",
          "hasLyrics": false,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-062",
          "no": 62,
          "title": "Head Shoulders Knees And Toes  Kids Songs  ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        }
      ]
    },
    {
      "id": "theme-07",
      "number": 7,
      "label": "07. 认识食物 词汇量80+",
      "name": "认识食物",
      "level": "词汇量80+",
      "songCount": 13,
      "songs": [
        {
          "id": "song-063",
          "no": 63,
          "title": "Do You Like Broccoli Ice Cream ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-064",
          "no": 64,
          "title": "Do You Like Spaghetti Yogurt ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-065",
          "no": 65,
          "title": "Trick Or Treat Give Me Something Good To Eat Halloween Song",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-066",
          "no": 66,
          "title": "Do You Like Pickle Pudding ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 2
        },
        {
          "id": "song-067",
          "no": 67,
          "title": "Do You Like Lasagna Milkshakes Ice Cream and Lasagna! ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 2
        },
        {
          "id": "song-068",
          "no": 68,
          "title": "The Muffin Man Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-069",
          "no": 69,
          "title": "Peanut Butter & Jelly Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 3
        },
        {
          "id": "song-070",
          "no": 70,
          "title": "Pat-A-Cake Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 2
        },
        {
          "id": "song-071",
          "no": 71,
          "title": "Are You Hungry Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 1
        },
        {
          "id": "song-072",
          "no": 72,
          "title": "Hot Cross Buns Nursery Rhymes ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-073",
          "no": 73,
          "title": "The Ants Go Marching #2 featuring The Bumble Nums ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-074",
          "no": 74,
          "title": "Do You Like Broccoli Ice Cream featuring The Super Simple Puppets ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-075",
          "no": 75,
          "title": "What’s Your Favorite Flavor Of Ice Cream Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        }
      ]
    },
    {
      "id": "theme-08",
      "number": 8,
      "label": "08. 基础认知（颜色、形状、季节等）词汇量90+",
      "name": "基础认知（颜色、形状、季节等）",
      "level": "词汇量90+",
      "songCount": 18,
      "songs": [
        {
          "id": "song-076",
          "no": 76,
          "title": "Hickory Dickory Dock ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 12
        },
        {
          "id": "song-077",
          "no": 77,
          "title": "The Months Chant ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-078",
          "no": 78,
          "title": "How's The Weather ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 3
        },
        {
          "id": "song-079",
          "no": 79,
          "title": "I See Something Blue Colors Song for Children",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 3
        },
        {
          "id": "song-080",
          "no": 80,
          "title": "I See Something Pink Colors Song ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 1
        },
        {
          "id": "song-081",
          "no": 81,
          "title": "Rain Rain Go Away Super Simple Songs Sesame Street Nursery Rhyme Week",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 3
        },
        {
          "id": "song-082",
          "no": 82,
          "title": "The Shape Song #1 ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 2
        },
        {
          "id": "song-083",
          "no": 83,
          "title": "The Shape Song #2 ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 2
        },
        {
          "id": "song-084",
          "no": 84,
          "title": "Mystery Box #1 Preschool Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-085",
          "no": 85,
          "title": "Mystery Box #2 Kids Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-086",
          "no": 86,
          "title": "Days Of The Week Song Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-087",
          "no": 87,
          "title": "Mystery Box #3 Original Nursery Rhyme ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-088",
          "no": 88,
          "title": "Baby Shark Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 2
        },
        {
          "id": "song-089",
          "no": 89,
          "title": "Mr. Sun, Sun, Mr. Golden Sun Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-090",
          "no": 90,
          "title": "What's Your Favorite Color Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 8
        },
        {
          "id": "song-091",
          "no": 91,
          "title": "Red Yellow Green Blue featuring The Bumble Nums ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-092",
          "no": 92,
          "title": "When The Band Comes Marching In Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-093",
          "no": 93,
          "title": "What’s This What’s That Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        }
      ]
    },
    {
      "id": "theme-09",
      "number": 9,
      "label": "09. 情绪情感 词汇量110+",
      "name": "情绪情感",
      "level": "词汇量110+",
      "songCount": 13,
      "songs": [
        {
          "id": "song-094",
          "no": 94,
          "title": "If You're Happy ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 2
        },
        {
          "id": "song-095",
          "no": 95,
          "title": "Can You Make A Happy Face featuring Noodle & Pals ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-096",
          "no": 96,
          "title": "What Do You Want For Christmas Santa's On His Way",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 3
        },
        {
          "id": "song-097",
          "no": 97,
          "title": "Skidamarink (Animated Version) ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 1
        },
        {
          "id": "song-098",
          "no": 98,
          "title": "Say Cheese! (Let's Take A Picture) Nursery Rhymes ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-099",
          "no": 99,
          "title": "Uh-huh! Original Nursery Rhyme ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-100",
          "no": 100,
          "title": "I Like You Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-101",
          "no": 101,
          "title": "What Do You Like To Do Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-102",
          "no": 102,
          "title": "I Can't Remember The Words To This Song Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-103",
          "no": 103,
          "title": "If You’re Happy And You Know It Kids Songs Super Simple Songs (2)",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 2
        },
        {
          "id": "song-104",
          "no": 104,
          "title": "If You’re Happy And You Know It Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 2
        },
        {
          "id": "song-105",
          "no": 105,
          "title": "Skidamarink A Dink A Dink Nursery Rhyme ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 1
        },
        {
          "id": "song-106",
          "no": 106,
          "title": "My Happy Song  featuring Noodle & Pals  ",
          "hasLyrics": false,
          "hasFlashcards": false,
          "flashJpgCount": 0
        }
      ]
    },
    {
      "id": "theme-10",
      "number": 10,
      "label": "10. 韵律儿歌 词汇量150+",
      "name": "韵律儿歌",
      "level": "词汇量150+",
      "songCount": 17,
      "songs": [
        {
          "id": "song-107",
          "no": 107,
          "title": "Old MacDonald Had A Farm ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 3
        },
        {
          "id": "song-108",
          "no": 108,
          "title": "One Potato, Two Potatoes ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-109",
          "no": 109,
          "title": "The Itsy Bitsy Spider Nursery Rhymes from Caitie's Classroom",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-110",
          "no": 110,
          "title": "Five Little Ducks Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-111",
          "no": 111,
          "title": "Little Robin Redbreast Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-112",
          "no": 112,
          "title": "Down By The Bay Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-113",
          "no": 113,
          "title": "Jack & Jill Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-114",
          "no": 114,
          "title": "Humpty Dumpty Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-115",
          "no": 115,
          "title": "Wind The Bobbin Up Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-116",
          "no": 116,
          "title": "Down By The Bay #2 Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-117",
          "no": 117,
          "title": "The Farmer In The Dell Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-118",
          "no": 118,
          "title": "Down By The Bay #3 Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-119",
          "no": 119,
          "title": "Here Is The Beehive ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-120",
          "no": 120,
          "title": "Down By The Spooky Bay Halloween Song for Kids ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-121",
          "no": 121,
          "title": "Over The Deep Blue Sea Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-122",
          "no": 122,
          "title": "The Bear Went Over The Mountain Nursery Rhyme ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-123",
          "no": 123,
          "title": "I Love The Mountains  ",
          "hasLyrics": false,
          "hasFlashcards": false,
          "flashJpgCount": 0
        }
      ]
    },
    {
      "id": "theme-11",
      "number": 11,
      "label": "11. TPR儿歌 词汇量150+",
      "name": "TPR儿歌",
      "level": "词汇量150+",
      "songCount": 27,
      "songs": [
        {
          "id": "song-124",
          "no": 124,
          "title": "Open Shut Them ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-125",
          "no": 125,
          "title": "Who Took The Candy Halloween Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-126",
          "no": 126,
          "title": "Wag Your Tail Animal Action Verb Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-127",
          "no": 127,
          "title": "Rock Scissors Paper #1 Finger Play Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-128",
          "no": 128,
          "title": "Rock Scissors Paper #2 Finger Play Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-129",
          "no": 129,
          "title": "Who Took The Cookie Nursery Rhyme ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-130",
          "no": 130,
          "title": "We All Fall Down Walk Around The Circle Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-131",
          "no": 131,
          "title": "Make A Circle Preschool Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-132",
          "no": 132,
          "title": "Walking Walking featuring Noodle & Pals ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-133",
          "no": 133,
          "title": "Hide And Seek featuring Noodle & Pals ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-134",
          "no": 134,
          "title": "Peekaboo Original Children's Song Peek-a-boo Song for Kids Let's play Peek A Boo!",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-135",
          "no": 135,
          "title": "Rock Scissors Paper #3 Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-136",
          "no": 136,
          "title": "Take Me Out To The Ball Game Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-137",
          "no": 137,
          "title": "Rock Scissors Paper #4 Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-138",
          "no": 138,
          "title": "Follow Me Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 5
        },
        {
          "id": "song-139",
          "no": 139,
          "title": "Open Shut Them #2 Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-140",
          "no": 140,
          "title": "Who Took The Cookie (Farm Animals Version) Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-141",
          "no": 141,
          "title": "Peekaboo Playground Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-142",
          "no": 142,
          "title": "Peekaboo Halloween Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-143",
          "no": 143,
          "title": "Pass The Beanbag featuring Noodle & Pals ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-144",
          "no": 144,
          "title": "Peekaboo Christmas Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-145",
          "no": 145,
          "title": "Open Shut Them featuring Noodle & Pals ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-146",
          "no": 146,
          "title": "The Jellyfish Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 5
        },
        {
          "id": "song-147",
          "no": 147,
          "title": "Peekaboo, I Love You Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-148",
          "no": 148,
          "title": "Where Is Baby Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-149",
          "no": 149,
          "title": "Open Shut Them #3 featuring Baby Shark ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-150",
          "no": 150,
          "title": "Open Shut Them #4 ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        }
      ]
    },
    {
      "id": "theme-12",
      "number": 12,
      "label": "12. 数学启蒙 词汇量150+",
      "name": "数学启蒙",
      "level": "词汇量150+",
      "songCount": 17,
      "songs": [
        {
          "id": "song-151",
          "no": 151,
          "title": "Ten In The Bed ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-152",
          "no": 152,
          "title": "Count & Move from ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-153",
          "no": 153,
          "title": "The Bananas Song Counting Bananas ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 18
        },
        {
          "id": "song-154",
          "no": 154,
          "title": "Count Down From 20 to 1 ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-155",
          "no": 155,
          "title": "Five Little Pumpkins Pumpkin Song ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-156",
          "no": 156,
          "title": "10 Little Elves Christmas Song For Kids ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-157",
          "no": 157,
          "title": "Seven Steps featuring Noodle & Pals ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-158",
          "no": 158,
          "title": "The Ice Cream Song Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-159",
          "no": 159,
          "title": "10 Little Dinosaurs Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 1
        },
        {
          "id": "song-160",
          "no": 160,
          "title": "Alice The Camel Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 1
        },
        {
          "id": "song-161",
          "no": 161,
          "title": "Five Little Monsters Jumping On The Bed Kids Halloween Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-162",
          "no": 162,
          "title": "12 Days Of Christmas Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-163",
          "no": 163,
          "title": "10 Little Fishies - Featuring Baby Shark! Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-164",
          "no": 164,
          "title": "10 Little Dinosaurs #2 Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 1
        },
        {
          "id": "song-165",
          "no": 165,
          "title": "Six In The Bed Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-166",
          "no": 166,
          "title": "10 Monsters In The Bed  Kids Halloween Song  ",
          "hasLyrics": false,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-167",
          "no": 167,
          "title": "Pop The Bubbles  Kids Songs  ",
          "hasLyrics": false,
          "hasFlashcards": false,
          "flashJpgCount": 0
        }
      ]
    },
    {
      "id": "theme-13",
      "number": 13,
      "label": "13. 节日儿歌（美国节日和习俗）词汇量240+",
      "name": "节日儿歌（美国节日和习俗）",
      "level": "词汇量240+",
      "songCount": 21,
      "songs": [
        {
          "id": "song-168",
          "no": 168,
          "title": "S-A-N-T-A ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-169",
          "no": 169,
          "title": "Jingle Bells ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 1
        },
        {
          "id": "song-170",
          "no": 170,
          "title": "Go Away! ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-171",
          "no": 171,
          "title": "Five Creepy Spiders Halloween Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-172",
          "no": 172,
          "title": "Knock Knock, Trick Or Treat Halloween Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-173",
          "no": 173,
          "title": "One For You, One For Me Halloween Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-174",
          "no": 174,
          "title": "Go Away, Spooky Goblin! Spooky Simple Song",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-175",
          "no": 175,
          "title": "We Wish You A Merry Christmas ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-176",
          "no": 176,
          "title": "Decorate The Christmas Tree (to the tune of Deck The Halls ) ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 1
        },
        {
          "id": "song-177",
          "no": 177,
          "title": "Santa's On His Way Christmas Song for Kids ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-178",
          "no": 178,
          "title": "Hello, My Friends Trick-Or-Treating Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-179",
          "no": 179,
          "title": "Knock Knock, Trick Or Treat - Part 2 ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-180",
          "no": 180,
          "title": "Jingle Jingle Little Bell (to the tune of Twinkle Twinkle Little Star) ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-181",
          "no": 181,
          "title": "Santa, Where Are You Kids Christmas Song ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-182",
          "no": 182,
          "title": "Up On The Housetop Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 1
        },
        {
          "id": "song-183",
          "no": 183,
          "title": "Santa Shark Baby Shark Christmas Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-184",
          "no": 184,
          "title": "Knock Knock, Trick Or Treat  featuring The Super Simple Puppets  ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-185",
          "no": 185,
          "title": "This Is The Way We Trick Or Treat  featuring The Super Simple Puppets",
          "hasLyrics": false,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-186",
          "no": 186,
          "title": "At The North Pole  Super Simple Songs  Christmas Song For Kids",
          "hasLyrics": false,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-187",
          "no": 187,
          "title": "Jingle Bells  Christmas Song For Kids  ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-188",
          "no": 188,
          "title": "Silent Night  Christmas Song For Kids  ",
          "hasLyrics": false,
          "hasFlashcards": false,
          "flashJpgCount": 0
        }
      ]
    },
    {
      "id": "theme-14",
      "number": 14,
      "label": "14. 认识动物 词汇量250+",
      "name": "认识动物",
      "level": "词汇量250+",
      "songCount": 17,
      "songs": [
        {
          "id": "song-189",
          "no": 189,
          "title": "Five Little Monkeys ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 4
        },
        {
          "id": "song-190",
          "no": 190,
          "title": "BINGO ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 3
        },
        {
          "id": "song-191",
          "no": 191,
          "title": "Walking In The Jungle ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-192",
          "no": 192,
          "title": "Let's Go To The Zoo Animal Song for Kids",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 5
        },
        {
          "id": "song-193",
          "no": 193,
          "title": "Mary Had A Little Lamb Animal Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-194",
          "no": 194,
          "title": "I Have A Pet Animal Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-195",
          "no": 195,
          "title": "Yes, I Can! Animal Song For Children ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-196",
          "no": 196,
          "title": "What Do You Hear Animal Song ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-197",
          "no": 197,
          "title": "Eeney Meeney Miney Moe Nursery Rhyme ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-198",
          "no": 198,
          "title": "Five Little Speckled Frogs Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-199",
          "no": 199,
          "title": "The Ants Go Marching Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-200",
          "no": 200,
          "title": "A Sailor Went To Sea Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 3
        },
        {
          "id": "song-201",
          "no": 201,
          "title": "Baby Shark Halloween Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 2
        },
        {
          "id": "song-202",
          "no": 202,
          "title": "Old MacDonald Had A Farm (2018) Nursery Rhymes ",
          "hasLyrics": true,
          "hasFlashcards": true,
          "flashJpgCount": 3
        },
        {
          "id": "song-203",
          "no": 203,
          "title": "There's A Hole In The Bottom Of The Sea Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-204",
          "no": 204,
          "title": "The Bees Go Buzzing Kids Songs ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        },
        {
          "id": "song-205",
          "no": 205,
          "title": "Walking In The Forest ",
          "hasLyrics": true,
          "hasFlashcards": false,
          "flashJpgCount": 0
        }
      ]
    }
  ]
} as const;

export const ALL_SONGS = RESOURCE_DATA.themes.flatMap((theme) =>
  theme.songs.map((song) => ({ ...song, themeId: theme.id, themeName: theme.name, themeLabel: theme.label }))
);
