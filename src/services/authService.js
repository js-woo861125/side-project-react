// src/services/authService.js

const API_BASE_URL = 'http://localhost:8000/api/v1'; // ⚠️ FastAPI 서버의 기본 URL

// ----------------------------------------------------------------------
// 1. 로그인 요청: FastAPI로 이메일/비밀번호 전송
// ----------------------------------------------------------------------
export const loginUser = async (email, password) => {
    // 💥💥 실제 API 호출 대신, 하드코딩된 테스트 계정으로 대체합니다. 💥💥

    if (email === 'test@test.com' && password === '1234') {
        // 강사 로그인 성공
        const role = 'instructor';
        const token = 'fake-instructor-token-12345';
        localStorage.setItem('userToken', token);
        localStorage.setItem('userRole', role);
        return { token, role };

    } else if (email === 'student@test.com' && password === '1234') {
        // 학생 로그인 성공
        const role = 'student';
        const token = 'fake-student-token-67890';
        localStorage.setItem('userToken', token);
        localStorage.setItem('userRole', role);
        return { token, role };

    } else if (email === 'admin@test.com' && password === '1234') {
        // 관리자 로그인 성공
        const role = 'admin';
        const token = 'fake-admin-token-11223';
        localStorage.setItem('userToken', token);
        localStorage.setItem('userRole', role);
        return { token, role };
    
    } else {
        // 로그인 실패
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
}
//     try {
//         const response = await fetch(`${API_BASE_URL}/auth/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             // FastAPI가 요구하는 JSON 형식으로 데이터 전송
//             body: JSON.stringify({ email, password }),
//         });

//         if (!response.ok) {
//             // HTTP 에러 상태 (401 Unauthorized 등) 처리
//             const errorData = await response.json();
//             throw new Error(errorData.detail || '로그인 실패: 서버 응답 오류');
//         }

//         const data = await response.json();
        
//         // 🚨 서버 응답 구조 확인 및 토큰 저장 (FastAPI 응답 예상)
//         // FastAPI는 JWT 토큰과 사용자 역할(role)을 응답으로 줄 것으로 가정
//         const token = data.access_token;
//         const role = data.role;
        
//         if (token) {
//             localStorage.setItem('userToken', token);
//             localStorage.setItem('userRole', role); // 역할(instructor/student) 저장
//         }

//         // 로그인 성공 시 역할과 토큰을 반환하여 Login.jsx에서 사용
//         return { token, role };

//     } catch (error) {
//         console.error('로그인 중 에러 발생:', error);
//         throw error;
//     }
// };

// // ----------------------------------------------------------------------
// // 2. 토큰 가져오기: ProtectedRoute에서 사용
// // ----------------------------------------------------------------------
export const getToken = () => {
    return localStorage.getItem('userToken');
};

// // ----------------------------------------------------------------------
// // 3. 로그아웃: 저장된 토큰 제거
// // ----------------------------------------------------------------------
export const logoutUser = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    // 필요한 경우 서버의 로그아웃 엔드포인트에 요청을 보낼 수 있습니다.
};