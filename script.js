// 기본 정적 데이터
const defaultJobsData = [
    {
        company: "ABC회사",
        title: "매장직",
        schedule: "오픈 예정",
        reg_date: "25/07/11",
        address: "서울 강남구"
    },
    {
        company: "XYZ기업",
        title: "영업직",
        schedule: "오픈 예정",
        reg_date: "25/07/12",
        address: "경기 성남시"
    },
    {
        company: "샘플회사",
        title: "관리직",
        schedule: "오픈 예정",
        reg_date: "25/07/13",
        address: "서울 서초구"
    }
];

// LocalStorage에서 데이터 로드 또는 기본 데이터 사용
function getJobsData() {
    const savedData = localStorage.getItem('uploadedJobsData');
    if (savedData) {
        try {
            return JSON.parse(savedData);
        } catch (e) {
            console.error('저장된 데이터 파싱 오류:', e);
            return defaultJobsData;
        }
    }
    return defaultJobsData;
}

// 관리자 비밀번호
const ADMIN_PASSWORD = "0070";

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 메인 페이지인지 확인
    if (document.getElementById('searchBtn')) {
        initializeMainPage();
    }
    
    // 관리자 로그인 페이지인지 확인
    if (document.getElementById('adminLoginForm')) {
        initializeAdminLogin();
    }
    
    // 관리자 대시보드 페이지인지 확인
    if (document.getElementById('adminDashboard')) {
        initializeAdminDashboard();
    }
});

// 메인 페이지 초기화
function initializeMainPage() {
    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('location');
    const searchResults = document.getElementById('searchResults');
    const loadingStatus = document.getElementById('loadingStatus');
    const resultCount = document.getElementById('resultCount');
    
    // 로딩 상태 숨기기
    loadingStatus.style.display = 'none';
    
    // 검색 버튼 클릭 이벤트
    searchBtn.addEventListener('click', function() {
        const location = locationInput.value.trim();
        
        if (!location) {
            alert('지역명을 입력해주세요.');
            return;
        }
        
        // 로딩 상태 표시
        loadingStatus.style.display = 'block';
        searchResults.innerHTML = '';
        
        // 검색 실행 (시뮬레이션)
        setTimeout(() => {
            performSearch(location);
            loadingStatus.style.display = 'none';
        }, 1000);
    });
    
    // 엔터키 검색
    locationInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// 검색 실행
function performSearch(location) {
    const searchResults = document.getElementById('searchResults');
    const resultCount = document.getElementById('resultCount');
    
    // 현재 데이터 가져오기
    const currentJobsData = getJobsData();
    
    // 지역별 필터링
    const filteredJobs = currentJobsData.filter(job => 
        job.address.includes(location)
    );
    
    // 결과 개수 업데이트
    resultCount.textContent = `총 ${filteredJobs.length}개의 오픈 정보를 찾았습니다`;
    
    // 검색 결과 표시
    if (filteredJobs.length === 0) {
        searchResults.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">검색 결과가 없습니다</h5>
                <p class="text-muted">다른 지역명으로 검색해보세요.</p>
            </div>
        `;
    } else {
        let resultsHTML = '';
        filteredJobs.forEach(job => {
            resultsHTML += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card job-card h-100">
                        <div class="card-body">
                            <h5 class="card-title company-name">${job.company}</h5>
                            <p class="card-text">
                                <strong>직무:</strong> ${job.title}<br>
                                <strong>일정:</strong> ${job.schedule}<br>
                                <strong>등록일:</strong> ${job.reg_date}
                            </p>
                            <div class="address-info">
                                <i class="fas fa-map-marker-alt me-1"></i>${job.address}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        searchResults.innerHTML = `<div class="row">${resultsHTML}</div>`;
    }
}

// 관리자 로그인 페이지 초기화
function initializeAdminLogin() {
    const loginForm = document.getElementById('adminLoginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        
        if (password === ADMIN_PASSWORD) {
            // 로그인 성공 - 관리자 대시보드로 이동
            window.location.href = 'admin_dashboard.html';
        } else {
            // 로그인 실패
            alert('비밀번호가 올바르지 않습니다.');
        }
    });
}

// 관리자 대시보드 초기화
function initializeAdminDashboard() {
    const fileInput = document.getElementById('csvFile');
    const fileInfo = document.getElementById('fileInfo');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadArea = document.getElementById('uploadArea');
    
    // 파일 선택 시 파일명 표시
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            fileInfo.innerHTML = `
                <div class="mt-3">
                    <i class="fas fa-file-csv fa-3x text-success mb-3"></i>
                    <h5>선택된 파일: ${file.name}</h5>
                    <p class="text-muted">파일 크기: ${(file.size / 1024).toFixed(2)} KB</p>
                </div>
            `;
            fileInfo.style.display = 'block';
            uploadBtn.style.display = 'inline-block';
        } else {
            fileInfo.style.display = 'none';
            uploadBtn.style.display = 'none';
        }
    });
    
    // 드래그 앤 드롭 기능
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
                fileInput.files = files;
                fileInput.dispatchEvent(new Event('change'));
            } else {
                alert('CSV 파일만 업로드 가능합니다.');
            }
        }
    });
    
    // 파일 업로드 처리 (클라이언트 사이드)
    const uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const file = fileInput.files[0];
        if (!file) {
            alert('파일을 선택해주세요.');
            return;
        }
        
        if (!file.name.endsWith('.csv')) {
            alert('CSV 파일만 업로드 가능합니다.');
            return;
        }
        
        // 파일 읽기 및 처리
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const csv = e.target.result;
                const lines = csv.split('\n');
                const headers = lines[0].split(',');
                
                // 필수 컬럼 확인
                const requiredColumns = ['회사명', '직무', '일정', '등록일/수정일', '주소'];
                const missingColumns = requiredColumns.filter(col => 
                    !headers.some(header => header.trim() === col)
                );
                
                if (missingColumns.length > 0) {
                    alert(`필수 컬럼이 누락되었습니다: ${missingColumns.join(', ')}`);
                    return;
                }
                
                // 데이터 개수 계산
                const dataCount = lines.length - 1; // 헤더 제외
                
                alert(`파일 업로드 성공! ${dataCount}개의 채용정보가 등록되었습니다.`);
                
                // 파일 정보 초기화
                fileInput.value = '';
                fileInfo.style.display = 'none';
                uploadBtn.style.display = 'none';
                
            } catch (error) {
                alert('파일 처리 중 오류가 발생했습니다.');
                console.error(error);
            }
        };
        
        reader.readAsText(file, 'UTF-8');
    });
} 