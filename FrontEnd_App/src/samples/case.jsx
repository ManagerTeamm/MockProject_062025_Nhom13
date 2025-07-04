
const sampleCases = [
  {
    id: 'CF001',
    time: '2025-06-24 10:30',
    address: '123 Main St',
    reason: 'Theft',
    suspect: {
      id: 'S001',
      fullName: 'Anh Nguyen Tu',
      birthdate: '1990-01-01',
      features: 'Scar on left cheek',
      photoUrl: 'https://www.ktsm.com/wp-content/uploads/sites/38/2019/03/Alarcon2C20Martin20Miguel2011-02-1994_1553529017433-1.jpg_79084189_ver1.0-1.jpg',
    },
    cadreList: [
      { id: 'C001', name: 'Officer Anh', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kXzkAkFrXnFMRGVMsTaKlvPY6Weu0GCMAw&s' },
      { id: 'C002', name: 'Detective Vy', photoUrl: 'https://www.macombdaily.com/wp-content/uploads/2012/08/b7903349274ffe1015c01e5c6e388108.jpg?w=535'},
      { id: 'C003', name: 'Agent Manh', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_iamNvRqsvyUMHjmhEcsPGusjHjpC4Gjz2K1u_We5Id0qwxKHerbimju_G3ySmgBg3mg&usqp=CAU'},
    ],
    incident: 'Suspect was seen near the scene',
    arrestRecord: 'Suspect arrested on 2025-06-24 at 11:00',
    miranda: {
      notificationTime: '2025-06-24 11:05',
      executor: 'Detective Vy',
      signature: 'Tu Nguyen',
    },
  },
];

export default sampleCases;