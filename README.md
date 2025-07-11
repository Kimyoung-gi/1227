# 소상공인의 오픈 동행

소상공인의 첫시작을 도와주는 오픈 정보 검색 서비스입니다.

## 🚀 GitHub Pages 배포

이 프로젝트는 GitHub Pages에서 정적 웹사이트로 호스팅됩니다.

### 배포 방법

1. **GitHub 저장소에 코드 업로드**
   ```bash
   git add .
   git commit -m "정적 웹사이트로 변환"
   git push origin main
   ```

2. **GitHub Pages 설정**
   - GitHub 저장소 페이지로 이동
   - Settings → Pages
   - Source를 "Deploy from a branch"로 설정
   - Branch를 "main"으로 설정
   - Save 클릭

3. **배포 확인**
   - 몇 분 후 `https://[username].github.io/[repository-name]`에서 접속 가능

## 📁 파일 구조

```
├── index.html              # 메인 페이지
├── admin_login.html        # 관리자 로그인 페이지
├── admin_dashboard.html    # 관리자 대시보드
├── static/
│   └── script.js          # JavaScript 기능
└── README.md              # 프로젝트 설명
```

## 🔧 기능

### 메인 페이지
- 지역별 소상공인 오픈 정보 검색
- 실시간 검색 결과 표시
- 반응형 디자인

### 관리자 기능
- **비밀번호**: 0070
- CSV 파일 업로드
- 드래그 앤 드롭 지원
- 파일 형식 검증

## 📊 CSV 파일 형식

업로드할 CSV 파일은 다음 컬럼을 포함해야 합니다:

```csv
회사명,직무,일정,등록일/수정일,주소
ABC회사,매장직,오픈 예정,25/07/11,서울 강남구
XYZ기업,영업직,오픈 예정,25/07/12,경기 성남시
```

## 🎨 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript
- **UI Framework**: Bootstrap 5
- **Icons**: Font Awesome
- **Hosting**: GitHub Pages

## 🔒 보안

- 관리자 비밀번호는 클라이언트 사이드에서 검증됩니다
- 파일 업로드는 클라이언트 사이드에서 처리됩니다
- 실제 운영 환경에서는 서버 사이드 검증을 권장합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 