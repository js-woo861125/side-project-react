import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminMembers.module.css';
import api from '../services/api';

const AdminMembers = () => {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get('/admin/members');
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
        navigate('/admin/dashboard');
    };

    const handleAddMember = () => {
        alert('🚨 신규 회원 등록 페이지/모달 열기');
    };

    const handleMemberClick = (memberId) => {
        navigate(`/admin/members/${memberId}`);
    };

    if (loading) {
        return <div className={styles.container}>로딩 중...</div>;
    }

    if (error) {
        return <div className={styles.container}>{error}</div>;
    }

    const getLessonCountStyle = (count) => {
        if (count <= 3) return styles.lowCount;
        return styles.sufficientCount;
    };

    const filteredMembers = members.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.instructor && member.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
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
                                    <td>{member.instructor || '없음'}</td>
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