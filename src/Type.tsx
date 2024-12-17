export interface attraction {
    id: number;
    name: string;
    image: string;
    area: string;
    subarea: string;
    latitude: number;
    longitude: number;
    tags: string[]
}

export const bgImages = [
    {
      tag: "산책",
      img: "https://img.freepik.com/free-vector/flat-people-doing-leisure-outdoor-activities_23-2147863987.jpg?t=st=1734395264~exp=1734398864~hmac=e1bb8679f9e0b648d58f04ea86c4d07f67f67e0fdc1e991a6b4ab5d3dc8bcbd2&w=826",
      description: "오늘은 느긋하게 한번 걸어볼까요?",
    },
    {
      tag: "휴식",
      img: "https://img.freepik.com/free-vector/early-morning-concept-illustration_114360-7352.jpg?t=st=1734395290~exp=1734398890~hmac=493ce093d000153847e666ed8c5f8a84c0197a852dd03a4318c42ceb3b5bad1e&w=826",
      description: "오늘 하루 힘드셨죠? 한번 푹 쉬어봐요",
    },
    {
      tag: "자연",
      img: "https://img.freepik.com/free-vector/hand-drawn-spring-landscape_23-2148822586.jpg?t=st=1734395310~exp=1734398910~hmac=dda49e29bb7ee98833d80d67d055f9d962a6b8ef6cc883c1336e79c857224fee&w=1380",
      description: "자연에서 힐링캠프",
    },
    {
      tag: "휴양",
      img: "https://img.freepik.com/free-vector/illustration-people-doing-outdoor-activities_52683-67443.jpg?t=st=1734395346~exp=1734398946~hmac=b1e1a90f330004506668802b2b9287bee52f42a15ea5e897164fab64ee9772b0&w=1380",
      description: "피로를 싹 떨쳐내볼까요?",
    },
    {
      tag: "카페",
      img: "https://img.freepik.com/free-vector/cafe-terrace-with-welcome-message_23-2147503932.jpg?t=st=1734395370~exp=1734398970~hmac=c2b1f3b70d98986b057a46307a4a765b1f57207f68a48603402d62f1e68f1bce&w=826",
      description: "카페에서 향긋한 커피 한잔 어떠세요?",
    },
    {
      tag: "액티비티",
      img: "https://img.freepik.com/free-vector/happy-kids-jumping-rope-children-having-fun-playing-park-outdoors_74855-15443.jpg?t=st=1734395062~exp=1734398662~hmac=59dd11ddcbd3e2c9907bfff67aa6f3015138aa900d3cc78520e54eb87d9b30d0&w=1380",
      description: "오늘은 밖에서 신나게 뛰어봐요",
    },
    {
      tag: "역사",
      img: "https://img.freepik.com/free-vector/seoul-concept-illustration_114360-29522.jpg?t=st=1734395214~exp=1734398814~hmac=dfdb49f149c2544fcfa1d2609accf47c97395c005ed2935028c5dfcff8ec66b2&w=826",
      description: "오늘은 왠지 유적지에 가고 싶은데요?",
    },
    {
      tag: "전망",
      img: "https://img.freepik.com/free-photo/beautiful-nature-landscape-with-mountains-lake_23-2150706055.jpg?t=st=1734413481~exp=1734417081~hmac=ebc9e9d9ace9f31928ff784ea9413b46c09b640e4cb6473201665df17fb4ca09&w=1380",
      description: "경치 구경 한번 가볼까요?"
    },
    {
      tag: "음식",
      img: "https://img.freepik.com/free-vector/hand-drawn-family-eating-illustration_23-2149227206.jpg?t=st=1734395468~exp=1734399068~hmac=6d497743f0ddebf6f47f1cb8a9222dafecde0305512a43da7e5c8079d13905d1&w=1380",
      description: "맛있는 음식 먹으면 행복해지죠",
    },
    {
      tag: "예술",
      img: "https://img.freepik.com/free-photo/view-3d-hand-holding-pen_23-2150990271.jpg?t=st=1734413771~exp=1734417371~hmac=e57d1aaed7e9f2a2c11b6c276195214774350e1095f1e33b5edf2ae8b5b67ce5&w=1480",
      description: "예술 감각, 맘껏 뽐내보세요"
    }
  ];