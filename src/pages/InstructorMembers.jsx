import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/InstructorMembers.module.css';
import api from '../services/api';

const InstructorMembers = () => {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('active');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get('/instructor/members');
                setMembers(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                
                setError('회원 목록을 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const handleGoBack = () => {
        navigate('/instructor/dashboard');
    };

    const handleMemberClick = (memberId) => {
        navigate(`/instructor/members/${memberId}`);
    };

    const getLessonCountStyle = (count) => {
        if (count <= 3) return styles.lowCount;
        return styles.sufficientCount;
    };

    if (loading) {
        return <div className={styles.container}>로딩 중...</div>;
    }

    if (error) {
        return <div className={styles.container}>{error}</div>;
    }

    const filteredMembers = members
        .filter(member => {
            if (filter === 'active') return member.status === '활동중';
            if (filter === 'inactive') return member.status !== '활동중';
            if (filter === 'low_lesson') return member.lessonsLeft <= 3;
            return true;
        })
        .filter(member => 
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.phone.includes(searchTerm)
        );

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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select className={styles.selectField} value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">전체 회원</option>
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
                        {filteredMembers.map((member) => (
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