// Firebase 설정
// 아래 설정을 Firebase Console에서 가져온 실제 설정으로 교체하세요
const firebaseConfig = {
    apiKey: "AIzaSyCSrlthPYp_zXBmN2MwtYoz6RcwPwaej_U",
    authDomain: "openpartner-92131.firebaseapp.com",
    projectId: "openpartner-92131",
    storageBucket: "openpartner-92131.firebasestorage.app",
    messagingSenderId: "39023469429",
    appId: "1:39023469429:web:ba4677ef0d21b00206a93c",
    measurementId: "G-0NRB7GD107"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 데이터베이스 함수들
const firebaseDB = {
  // 데이터 업로드
  async uploadJobs(jobsData, fileName) {
    try {
      const batch = db.batch();
      const uploadId = Date.now();
      
      jobsData.forEach((job, index) => {
        const docRef = db.collection('jobs').doc();
        batch.set(docRef, {
          ...job,
          uploadId: uploadId,
          fileName: fileName,
          uploadDate: new Date(),
          uploadIndex: index
        });
      });
      
      await batch.commit();
      
      // 업로드 히스토리 저장
      await db.collection('uploadHistory').doc(uploadId.toString()).set({
        fileName: fileName,
        uploadDate: new Date(),
        dataCount: jobsData.length,
        sampleData: jobsData.slice(0, 3)
      });
      
      return { success: true, uploadId: uploadId };
    } catch (error) {
      console.error('Firebase 업로드 오류:', error);
      return { success: false, error: error.message };
    }
  },
  
  // 데이터 로드
  async loadJobs() {
    try {
      const snapshot = await db.collection('jobs').orderBy('uploadDate', 'desc').get();
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Firebase 로드 오류:', error);
      return [];
    }
  },
  
  // 업로드 히스토리 로드
  async loadUploadHistory() {
    try {
      const snapshot = await db.collection('uploadHistory').orderBy('uploadDate', 'desc').limit(5).get();
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('업로드 히스토리 로드 오류:', error);
      return [];
    }
  },
  
  // 특정 업로드 ID의 데이터만 로드
  async loadJobsByUploadId(uploadId) {
    try {
      const snapshot = await db.collection('jobs').where('uploadId', '==', uploadId).get();
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('특정 업로드 데이터 로드 오류:', error);
      return [];
    }
  }
}; 