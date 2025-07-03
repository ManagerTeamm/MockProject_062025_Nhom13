const inmateAdmissions = [
  {
    fileId: 'ADM001',
    caseId: 'CF001',
    intakeTime: '2025-06-24 14:20',
    reason: 'Armed robbery',
    health: 'Stable',
    fingerprint: 'https://via.placeholder.com/60x60?text=FP',
    prisoner: {
      name: 'Anh Nguyen Tu',
      photo: 'https://www.ktsm.com/wp-content/uploads/sites/38/2019/03/Alarcon2C20Martin20Miguel2011-02-1994_1553529017433-1.jpg_79084189_ver1.0-1.jpg',
    },
    relatives: [
      { phone: '0967123435' }
    ],
  },
  {
    fileId: 'ADM002',
    caseId: 'CF002',
    intakeTime: '2025-06-25 09:10',
    reason: 'Fraud',
    health: 'Diabetic',
    fingerprint: 'https://via.placeholder.com/60x60?text=FP',
    prisoner: {
      name: 'Loan Hoang Thi',
      photo: 'https://media.istockphoto.com/id/935524698/photo/morning-selfie.jpg?s=612x612&w=0&k=20&c=AegVsE9113fC2kwjk2SyxwoBxYswKJXOJCNIsFT6TWU=',
    },
    relatives: [
      { phone: '0967123435' },
    ],
  },
];

export default inmateAdmissions;
