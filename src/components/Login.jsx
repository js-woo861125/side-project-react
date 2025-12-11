import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../services/authService';
import '../styles/login.css'; 
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    try {
      const response = await api.post('/login', { email, password });
      const user = response.data;
      if (user?.role) {
        if (user.role === 'admin') navigate('/admin/dashboard');
        else if (user.role === 'teacher') navigate('/instructor/dashboard');
        else navigate('/student/dashboard');
      } else {
        setError('로그인 실패: 사용자 정보가 올바르지 않습니다.');
      }
    } catch (err) {
      setError(err.message || '서버 오류');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">

        <h2 className="login-title">로그인</h2>
        <p className="login-subtitle">
          기관 관리자 또는 학생 계정으로 접속하세요.
        </p>

        {/* 오류 메시지 */}
        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label className="input-label">이메일</label>
          <input
            type="email"
            value={email}
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="input-label">비밀번호</label>
          <input
            type="password"
            value={password}
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" type="submit">
            로그인
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;
