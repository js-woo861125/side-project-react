// src/pages/AdminInstructors.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminInstructors.module.css';

// 더미 강사 데이터
const mockInstructors = [
    { id: 1, name: '김철수', specialty: '필라테스', phone: '010-1111-2222', lessonsMonth: 45, status: 'Active', hireDate: '2023.01.15' },
    { id: 2, name: '이지은', specialty: 'PT/재활', phone: '010-3333-4444', lessonsMonth: 32, status: 'Active', hireDate: '2024.05.20' },
    { id: 3, name: '박서준', specialty: '요가', phone: '010-5555-6666', lessonsMonth: 0, status: 'Inactive', hireDate: '2024.08.01' },
    { id: 4, name: '최현우', specialty: 'PT', phone: '010-7777-8888', lessonsMonth: 58, status: 'Active', hireDate: '2022.11.01' },
];

const AdminInstructors = () => {
    const navigate = useNavigate();
    const [instructors, setInstructors] = useState(mockInstructors);
    const [searchTerm, setSearchTerm] = useState('');

    const handleGoBack = () => {
        navigate('/admin/dashboard');
    };

    const handleAddInstructor = () => {
        alert('🚨 강사 추가 모달 열기 (신규 계정 생성 폼)');
        // 실제로는 모달이나 전용 페이지로 이동하여 계정 생성 폼을 띄웁니다.
    };

    const handleEditInstructor = (id) => {
        alert(`🚨 ID ${id} 강사 정보 수정 페이지/모달 열기`);
        // 실제로는 강사 정보 수정 페이지로 이동
    };

    const handleDeleteInstructor = (id) => {
        if (window.confirm(`ID ${id} 강사를 정말로 삭제(혹은 비활성화)하시겠습니까?`)) {
            // 🚨 실제 API 호출 및 상태 업데이트 로직
            setInstructors(instructors.filter(inst => inst.id !== id));
            alert('강사 삭제 완료.');
        }
    };

    const filteredInstructors = instructors.filter(instructor => 
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            
            <div className={styles.header}>
                <h1 className={styles.title}>👨‍🏫 강사/직원 관리</h1>
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
                        placeholder="강사 이름, 전문 분야로 검색" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchField}
                    />
                    <button 
                        className={styles.addButton}
                        onClick={handleAddInstructor}
                    >
                        +강사
                    </button>
                </div>

                {/* 2. 강사 목록 테이블 */}
                <div className="overflow-x-auto">
                    <table className={styles.instructorTable}>
                        <thead>
                            <tr className={styles.tableHeader}>
                                <th>ID</th>
                                <th>이름</th>
                                <th className="hidden sm:table-cell">전문 분야</th>
                                <th className="hidden md:table-cell">연락처</th>
                                <th>금월 레슨 수</th>
                                <th>상태</th>
                                <th>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInstructors.map((instructor) => (
                                <tr key={instructor.id} className={styles.tableRow}>
                                    <td>{instructor.id}</td>
                                    <td>{instructor.name}</td>
                                    <td className="hidden sm:table-cell">{instructor.specialty}</td>
                                    <td className="hidden md:table-cell">{instructor.phone}</td>
                                    <td>{instructor.lessonsMonth}회</td>
                                    <td>
                                        <span className={`${styles.statusTag} ${instructor.status === 'Active' ? styles.active : styles.inactive}`}>
                                            {instructor.status === 'Active' ? '활성' : '비활성'}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => handleEditInstructor(instructor.id)} 
                                            className={styles.actionButton}
                                        >
                                            수정
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteInstructor(instructor.id)} 
                                            className={`${styles.actionButton} text-red-600 hover:text-red-800`}
                                        >
                                            삭제
                                        </button>
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

export default AdminInstructors;