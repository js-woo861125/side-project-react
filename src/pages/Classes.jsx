// src/pages/Classes.jsx

import React, { useState } from 'react';
// 💥 InstructorDashboard의 레이아웃 스타일 재사용
import styles from '../styles/InstructorDashboard.module.css'; 

// 🚨 임시 데이터
const initialClasses = [
    { id: 1, name: '중급 수학 (화목 7시)', instructor: '김철수', students: 15, status: '진행 중' },
    { id: 2, name: 'TOEIC 실전반 (토 10시)', instructor: '이영희', students: 22, status: '진행 중' },
    { id: 3, name: '파이썬 기초', instructor: '박민준', students: 8, status: '종료' },
];

const Classes = () => {
    const [classes, setClasses] = useState(initialClasses);
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleAddClass = () => {
        alert("🚨 클래스 추가 기능 구현 예정: 모달 창 띄우기");
    };

    const handleDelete = (id) => {
        if (window.confirm('정말 이 클래스를 삭제하시겠습니까?')) {
            setClasses(classes.filter(cls => cls.id !== id));
        }
    };

    const filteredClasses = classes.filter(cls =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        // 💥 styles.mainLayout 적용
        <div className={styles.mainLayout}>
            
            {/* 💥 styles.contentArea 적용 */}
            <main className={styles.contentArea}>
                
                {/* 제목 스타일 (유지) */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
                    📚 클래스 관리
                </h1>

                {/* 💥 styles.sectionCard 적용 */}
                <section className={styles.sectionCard}>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                        
                        {/* 검색 필드 (Tailwind 클래스 유지) */}
                        <input
                            type="text"
                            placeholder="클래스 이름 또는 강사명 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        
                        {/* 클래스 추가 버튼 (Tailwind 클래스 유지) */}
                        <button
                            onClick={handleAddClass}
                            className="w-full md:w-auto bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
                        >
                            + 새 클래스 추가
                        </button>
                    </div>

                    {/* 클래스 목록 테이블 (Tailwind 클래스 유지) */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">클래스명</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">강사</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학생 수</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">액션</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredClasses.length > 0 ? (
                                    filteredClasses.map((cls) => (
                                        <tr key={cls.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                                                {cls.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cls.instructor}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cls.students}명</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cls.status === '진행 중' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {cls.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                                <button className="text-indigo-600 hover:text-indigo-900">수정</button>
                                                <button onClick={() => handleDelete(cls.id)} className="text-red-600 hover:text-red-900">삭제</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                            검색 결과가 없거나 개설된 클래스가 없습니다.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
                
            </main>
        </div>
    );
};

export default Classes;