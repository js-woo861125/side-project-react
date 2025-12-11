import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/InstructorMemberDetail.module.css';
import api from '../services/api';


const InstructorMemberDetail = () => {
    const { id } = useParams(); // URL에서 회원 ID 가져오기
    const navigate = useNavigate();
    
    const [member, setMember] = useState(null);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await api.get(`/instructor/members/${id}`);
                setMember(response.data);
                setNotes(response.data.specialNotes || '');
                setLoading(false);
            } catch (err) {
                console.log(err);
                
                setError('회원 정보를 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchMemberData();
    }, [id]);

    const handleSaveNotes = async () => {
        try {
            await api.put(`/instructor/members/${id}/notes`, { notes });
            alert(`✅ ${member.name} 회원 메모가 저장되었습니다.`);
        } catch (err) {
            console.log(err);
            
            alert('🚨 메모 저장에 실패했습니다.');
        }
    };
    
    const handleGoBack = () => {
        navigate('/instructor/members');
    };

    if (loading) {
        return <div className={styles.container}>로딩 중...</div>;
    }

    if (error) {
        return <div className={styles.container}>{error}</div>;
    }

    if (!member) {
        return <div className={styles.container}>회원 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div className={styles.container}>
            
            <header className={styles.header}>
                <h1 className={styles.title}>
                    👤 {member.name} 회원 상세 프로필
                </h1>
                <button 
                    onClick={handleGoBack} 
                    className={styles.backButton}
                >
                    &larr; 목록
                </button>
            </header>

            <div className={styles.mainLayout}>
                
                {/* 좌측: 기본 정보 및 통계 */}
                <div className={styles.card}>
                    <h2 className="text-lg font-semibold mb-4 text-emerald-700">기본 현황</h2>
                    <div className={styles.profileItem}>
                        <p className={styles.profileLabel}>담당 강사</p>
                        <p className={styles.profileValue}>김철수</p> {/* 🚨 실제는 Context에서 가져옴 */}
                    </div>
                    <div className={styles.profileItem}>
                        <p className={styles.profileLabel}>연락처</p>
                        <p className={styles.profileValue}>{member.phone}</p>
                    </div>
                    <div className={styles.profileItem}>
                        <p className={styles.profileLabel}>등록일</p>
                        <p className={styles.profileValue}>{member.startDate}</p>
                    </div>
                    <div className={styles.profileItem}>
                        <p className={styles.profileLabel}>총 구매 횟수</p>
                        <p className={styles.profileValue}>{member.lessonsTotal}회</p>
                    </div>
                    <div className={styles.profileItem} style={{ borderBottom: 'none' }}>
                        <p className={styles.profileLabel}>
                            잔여 횟수
                            <span className="text-xs ml-2 text-red-500 font-normal">
                                {member.lessonsLeft <= 3 ? '(재계약 임박)' : ''}
                            </span>
                        </p>
                        <p className={`${styles.profileValue} text-3xl text-red-600`}>
                            {member.lessonsLeft}회
                        </p>
                    </div>
                </div>

                {/* 우측: 레슨 이력 및 메모 */}
                <div>
                    {/* 레슨 이력 섹션 */}
                    <div className={styles.card}>
                        <h2 className="text-lg font-semibold mb-4 text-emerald-700">최근 레슨 이력</h2>
                        <table className={styles.historyTable}>
                            <thead>
                                <tr className={styles.tableHeader}>
                                    <th style={{width: '20%'}}>날짜</th>
                                    <th style={{width: '10%'}}>종류</th>
                                    <th style={{width: '10%'}}>시간</th>
                                    <th style={{width: '50%'}}>진행 내용 및 특이사항</th>
                                    <th style={{width: '10%'}}>출결</th>
                                </tr>
                            </thead>
                            <tbody>
                                {member.history && member.history.map((lesson, index) => (
                                    <tr key={index} className={styles.tableRow}>
                                        <td>{lesson.date}</td>
                                        <td>{lesson.type}</td>
                                        <td>{lesson.duration}</td>
                                        <td className="text-gray-600">{lesson.progress}</td>
                                        <td>{lesson.attendance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="text-sm text-center pt-4 text-emerald-600 cursor-pointer hover:underline">
                            전체 레슨 이력 보기 →
                        </p>
                    </div>
                    
                    {/* 강사 메모 섹션 */}
                    <div className={`${styles.card} mt-4`}>
                        <h2 className="text-lg font-semibold mb-4 text-emerald-700">강사 기록/특이사항 메모</h2>
                        <textarea
                            className={styles.notesArea}
                            placeholder="회원의 목표, 부상 이력, 선호 사항 등 장기적인 관리를 위한 메모를 기록하세요."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <button onClick={handleSaveNotes} className={styles.saveButton}>
                            메모 저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorMemberDetail;