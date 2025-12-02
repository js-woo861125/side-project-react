// src/pages/AdminMembers.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminMembers.module.css';

// 더미 전체 회원 데이터
const mockMembers = [
    { id: 101, name: '이민지', instructor: '김철수', lessonsTotal: 20, lessonsLeft: 3, status: 'Active', purchaseDate: '2025.10.01' },
    { id: 102, name: '김태형', instructor: '이지은', lessonsTotal: 10, lessonsLeft: 12, status: 'Active', purchaseDate: '2025.11.20' },
    { id: 103, name: '박서준', instructor: '없음', lessonsTotal: 10, lessonsLeft: 0, status: 'Inactive', purchaseDate: '2025.08.01' },
    { id: 104, name: '최아라', instructor: '김철수', lessonsTotal: 30, lessonsLeft: 7, status: 'Active', purchaseDate: '2025.09.15' },
    { id: 105, name: '홍길동', instructor: '이지은', lessonsTotal: 5, lessonsLeft: 1, status: 'Active', purchaseDate: '2025.11.28' },
];

const AdminMembers = () => {
    const navigate = useNavigate();
    const [members, setMembers] = useState(mockMembers);
    const [searchTerm, setSearchTerm] = useState('');

    const handleGoBack = () => {
        navigate('/admin/dashboard');
    };

    const handleAddMember = () => {
        alert('🚨 신규 회원 등록 페이지/모달 열기');
    };

    const handleMemberClick = (memberId) => {
        // 🚨 회원의 상세 관리 페이지로 이동 (레슨 패키지 수정, 출결 관리 등)
        alert(`🚨 ID ${memberId} 회원 상세 정보 관리 페이지로 이동`);
        // navigate(`/admin/members/${memberId}`);
    };

    const getLessonCountStyle = (count) => {
        if (count <= 3) return styles.lowCount;
        return styles.sufficientCount;
    };

    const filteredMembers = members.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            
            <div className={styles.header}>
                <h1 className={styles.title}>👤 전체 회원 관리</h1>
                <button 
                    onClick={handleGoBack} 
                    className={styles.backButton}
                >
                    &larr; 대시보드
                </button>
            </div>

            <div className={styles.mainContent}>
                
                {/* 1. 액션 바 (검색 및 추가 버튼) */}
                <div className={styles.actionBar}>
                    <input 
                        type="text" 
                        placeholder="이름, 담당 강사로 검색" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchField}
                    />
                    <button 
                        className={styles.addButton}
                        onClick={handleAddMember}
                    >
                        + 신규 회원 등록
                    </button>
                </div>

                {/* 2. 회원 목록 테이블 */}
                <div className="overflow-x-auto">
                    <table className={styles.memberTable}>
                        <thead>
                            <tr className={styles.tableHeader}>
                                <th>ID</th>
                                <th>이름</th>
                                <th>담당 강사</th>
                                <th className="hidden sm:table-cell">총 구매 횟수</th>
                                <th>잔여 횟수</th>
                                <th className="hidden md:table-cell">최초 등록일</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.map((member) => (
                                <tr 
                                    key={member.id} 
                                    className={styles.tableRow}
                                    onClick={() => handleMemberClick(member.id)}
                                >
                                    <td>{member.id}</td>
                                    <td className="font-semibold">{member.name}</td>
                                    <td>{member.instructor}</td>
                                    <td className="hidden sm:table-cell">{member.lessonsTotal}회</td>
                                    <td className={`${styles.lessonsLeft} ${getLessonCountStyle(member.lessonsLeft)}`}>
                                        {member.lessonsLeft}회
                                    </td>
                                    <td className="hidden md:table-cell">{member.purchaseDate}</td>
                                    <td>
                                        <span className={`${styles.statusTag} ${member.status === 'Active' ? styles.active : styles.inactive}`}>
                                            {member.status === 'Active' ? '활동중' : '휴면/만료'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminMembers;