// src/components/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService'; // ⚠️ FastAPI와 통신할 함수 (구현 예정)

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    setError(null);

    // 1. 입력 유효성 검사 (간단하게)
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    try {
      // 2. FastAPI 서버로 로그인 정보 전송 및 토큰 받기
      // 이 함수는 실제로는 fetch를 통해 FastAPI의 /api/v1/auth/login 엔드포인트와 통신해야 합니다.
      const user = await loginUser(email, password); 
      
      // 3. 로그인 성공 시 대시보드로 이동
      if (user && user.role) {
        // 역할(role)에 따라 다른 대시보드로 이동 (예: 강사 또는 학생)
       if (user.role === 'admin') {
            // 관리자 대시보드로 이동
            navigate('/admin/dashboard', { replace: true });
        } else if (user.role === 'instructor') {
            // 강사 대시보드로 이동
            navigate('/instructor/dashboard', { replace: true });
        } else if (user.role === 'student') {
            // 학생 대시보드로 이동
            navigate('/student/dashboard', { replace: true });
        }
      } else {
        setError('로그인에 실패했습니다. 사용자 정보가 올바르지 않습니다.');
      }

    } catch (err) {
      // API 통신 실패 (401 Unauthorized 등) 처리
      setError(err.message || '서버 연결 오류 또는 인증 실패');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        
        {/* 헤더 */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          로그인
        </h2>
        <p className="text-center text-gray-500 mb-8">
          기관 관리자 또는 학생 계정으로 접속하세요.
        </p>

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* 이메일 입력 */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일 주소
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* 로그인 버튼 */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
            >
              로그인
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login;