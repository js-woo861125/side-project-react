// src/pages/InstructorMembers.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InstructorMembers.module.css';

// 더미 데이터: 강사 담당 회원 목록
const mockMembers = [
    { id: 101, name: '이민지', lessonsLeft: 3, lastLesson: '2025.11.27', status: '활동중', phone: '010-1234-5678' },
    { id: 102, name: '김태형', lessonsLeft: 12, lastLesson: '2025.11.25', status: '활동중', phone: '010-9876-5432' },
    { id: 103, name: '박서준', lessonsLeft: 0, lastLesson: '2025.11.10', status: '휴면', phone: '010-5555-1111' },
    { id: 104, name: '최아라', lessonsLeft: 7, lastLesson: '2025.11.28', status: '활동중', phone: '010-2222-3333' },
];

const InstructorMembers = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/instructor/dashboard');
    };

    const handleMemberClick = (memberId) => {
        // 🚨 회원의 상세 정보 페이지로 이동 (진척도, 레슨 노트 등)
        navigate(`/instructor/members/${memberId}`);
    };

    const getLessonCountStyle = (count) => {
        if (count <= 3) return styles.lowCount;
        return styles.sufficientCount;
    };

    return (
        <div className={styles.container}>
            
            <div className={styles.header}>
                <h1 className={styles.title}>👨‍🎓 담당 회원 관리</h1>
                <button 
                    onClick={handleGoBack} 
                    className={styles.backButton}
                >
                    &larr; 대시보드
                </button>
            </div>

            <div className={styles.mainContent}>
                
                {/* 1. 필터 및 검색 바 */}
                <div className={styles.filterBar}>
                    <input 
                        type="text" 
                        placeholder="이름 또는 전화번호로 검색" 
                        className={`${styles.searchField} flex-grow`}
                    />
                    <select className={styles.selectField}>
                        <option value="active">활동중인 회원</option>
                        <option value="inactive">휴면/종료 회원</option>
                        <option value="low_lesson">잔여 횟수 3회 이하</option>
                    </select>
                </div>

                {/* 2. 회원 목록 테이블 */}
                <table className={styles.memberTable}>
                    <thead>
                        <tr className={styles.tableHeader}>
                            <th>이름</th>
                            <th className="hidden md:table-cell">연락처</th>
                            <th>상태</th>
                            <th>잔여 레슨</th>
                            <th className="hidden sm:table-cell">마지막 레슨일</th>
                            <th>액션</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockMembers.map((member) => (
                            <tr 
                                key={member.id} 
                                className={styles.tableRow}
                                onClick={() => handleMemberClick(member.id)} // 클릭 시 상세 페이지 이동
                            >
                                <td>{member.name}</td>
                                <td className="hidden md:table-cell">{member.phone}</td>
                                <td>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded ${member.status === '활동중' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {member.status}
                                    </span>
                                </td>
                                <td className={`${styles.remainingLessons} ${getLessonCountStyle(member.lessonsLeft)}`}>
                                    {member.lessonsLeft}회
                                </td>
                                <td className="hidden sm:table-cell">{member.lastLesson}</td>
                                <td>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); alert(`${member.name} 출결 기록`); }} 
                                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                    >
                                        출결 기록
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InstructorMembers;