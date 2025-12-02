// src/components/layout/Sidebar.jsx (최종 CSS 모듈 적용)

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import styles from './Sidebar.module.css'; // 💥 CSS 모듈 import

// 메뉴 정의 (유지)
const instructorMenu = [
  { to: '/instructor/dashboard', icon: '🏠', label: '대시보드' },
  { to: '/instructor/classes', icon: '📚', label: '클래스 관리' },
  { to: '/instructor/students', icon: '🧑‍🎓', label: '학생 명단' },
  { to: '/instructor/schedule', icon: '📅', label: '일정 관리' },
  { to: '/instructor/settings', icon: '⚙️', label: '기관 설정' },
];

const studentMenu = [
  { to: '/student/dashboard', icon: '🏠', label: '클래스 현황' },
  { to: '/student/timetable', icon: '⏰', label: '시간표' },
  { to: '/student/grades', icon: '📝', label: '수업/레슨 내역' },
];

// NavItem 컴포넌트 수정: CSS 모듈 적용
const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    // 기본 스타일 + 활성/비활성 스타일 적용
    className={({ isActive }) => 
      `${styles.navItemBase} ${isActive ? styles.navItemActive : styles.navItemInactive}`
    }
  >
    <span className="mr-3">{icon}</span> {/* 아이콘 자리 */}
    <span>{label}</span>
  </NavLink>
);


const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logoutUser(); 
    navigate('/login');
  };

  const currentMenu = role === 'instructor' ? instructorMenu : studentMenu;

  // 사이드바 상태에 따른 클래스 결정
  const sidebarClasses = `${styles.sidebarContainer} ${isOpen ? styles.visible : styles.hidden}`;


  return (
    <>
    {/* 모바일 토글 버튼: CSS 모듈 적용 */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={styles.toggleButton}
      >
        {isOpen ? '❌' : '☰'}
      </button>

      {/* 오버레이: CSS 모듈 적용 */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className={styles.overlay}
        />
      )}

      {/* 사이드바 컨테이너: CSS 모듈 적용 */}
      <div 
        className={sidebarClasses}
      >
      
      {/* 로고/앱 이름: CSS 모듈 적용 */}
      <div className={styles.header}>
        ClassManager
      </div>

      {/* 메뉴 목록 (Tailwind 클래스 중 공간/스크롤 관련 클래스는 유지) */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {currentMenu.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      {/* 푸터 / 로그아웃 */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className={styles.logoutButton} // CSS 모듈 적용
        >
          <span className="mr-2">🚪</span> 로그아웃
        </button>
      </div>
    </div>
    </>
  );
};

export default Sidebar;