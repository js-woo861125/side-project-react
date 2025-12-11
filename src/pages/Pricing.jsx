// 요금안내 페이지
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Pricing.module.css';

// 종량제 가격 데이터 (최종)
const pricingData = {
    basePrice: 0, // 기본 월 구독료 0원
    
    // 무료 포함 내역
    freeInstructors: 2, // 가입 시 무료 강사 수
    freeStudents: 20, // 가입 시 무료 학생 수
    
    // 종량제 비용 (무료 초과 시)
    instructorUnitCost: 30000, // 강사 3명 단위당 월 30,000원
    instructorUnitSize: 3, // 강사 단위 크기 (3명)
    
    studentUnitCost: 50000, // 학생 20명 단위당 월 50,000원
    studentUnitSize: 20, // 학생 단위 크기 (20명)
};

const Pricing = () => {
    const { 
        basePrice, freeInstructors, freeStudents, 
        instructorUnitCost, instructorUnitSize, 
        studentUnitCost, studentUnitSize 
    } = pricingData;

    // 🔎 요금 계산 예시: 강사 5명, 학생 60명 사용 가정
    const totalInstructorCount = 5; 
    const totalStudentCount = 60; 
    
    // 1. 강사 비용 계산
    const billableInstructors = Math.max(0, totalInstructorCount - freeInstructors);
    const instructorUnits = Math.ceil(billableInstructors / instructorUnitSize); 
    const instructorCost = instructorUnits * instructorUnitCost; 
    
    // 2. 학생 비용 계산
    const billableStudents = Math.max(0, totalStudentCount - freeStudents);
    const studentUnits = Math.ceil(billableStudents / studentUnitSize); 
    const studentCost = studentUnits * studentUnitCost; 
    
    const exampleTotalCost = instructorCost + studentCost; 

    return (
        <div className={styles.pricingContainer}>
            <header className={styles.header}>
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                    레슨/클래스 운영자 맞춤형 요금 안내
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    강사님과 회원/학생 수에 따라 비용이 투명하게 발생하며, 기본 제공 인원은 무료입니다.
                </p>
            </header>

            <div className={styles.cardWrapper}>
                <div className={styles.pricingCard}>
                    
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-2 text-blue-600">클래스 매니저 종량제 서비스</h3>
                        <p className="mb-4 text-gray-500">
                            **기본 월 구독료 0원.**
                        </p>
                    </div>

                    {/* 기본 구독료 표시 */}
                    <div className="text-center my-8">
                        <p className="text-2xl font-extrabold text-gray-900">기본 월 구독료</p>
                        <p className={styles.basePriceNumber}>
                            {basePrice.toLocaleString()}원
                            <span className={styles.basePriceUnit}>/월</span>
                        </p>
                    </div>

                    {/* 무료 제공 및 비용 영역 */}
                    <div className="border-t border-gray-200 pt-6 mt-6">
                        
                        <h4 className="text-xl font-bold mb-4 text-green-600">✅ 가입 시 기본 제공 (무료)</h4>
                        <div className="space-y-4">
                            <div className={`flex justify-between items-center ${styles.freeSection}`}> 
                                <p className="font-semibold text-green-800">강사 무료 한도</p>
                                <p className="text-xl font-bold text-green-600">최대 {freeInstructors}명</p>
                            </div>
                            <div className={`flex justify-between items-center ${styles.freeSection}`}> 
                                <p className="font-semibold text-green-800">학생 무료 한도</p>
                                <p className="text-xl font-bold text-green-600">최대 {freeStudents}명</p>
                            </div>
                        </div>

                        <h4 className="text-xl font-bold mb-4 mt-6 text-red-600">💸 초과 인원 단위 종량제 요금</h4>
                        <div className="space-y-4">
                            <div className={`flex justify-between items-center ${styles.billingSection}`}> 
                                <p className="font-semibold text-blue-800">강사 추가 비용 ({instructorUnitSize}명 단위당)</p>
                                <p className="text-xl font-bold text-red-600">{instructorUnitCost.toLocaleString()}원/월</p>
                            </div>
                            <div className={`flex justify-between items-center ${styles.billingSection}`}> 
                                <p className="font-semibold text-blue-800">학생 추가 비용 ({studentUnitSize}명 단위당)</p>
                                <p className="text-xl font-bold text-red-600">{studentUnitCost.toLocaleString()}원/월</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6 mt-6">
                        <h4 className="text-xl font-bold mb-4 text-gray-700">🔎 요금 계산 예시</h4>
                        <p className="text-sm text-gray-500 mb-2">
                            **예시: 총 강사 {totalInstructorCount}명, 총 학생 {totalStudentCount}명 사용 시**
                        </p>

                        <ul className="text-md font-medium space-y-2">
                            <li>
                                1. 초과 강사: {totalInstructorCount}명 - {freeInstructors}명 = {billableInstructors}명 
                                
                            </li>
                            <li>
                                2. 초과 학생: {totalStudentCount}명 - {freeStudents}명 = {billableStudents}명 
                                
                            </li>
                            <li className="text-lg font-extrabold border-t border-gray-300 pt-2 mt-2">
                                3. 총 월 비용: {instructorCost.toLocaleString()}원 + {studentCost.toLocaleString()}원 = **{exampleTotalCost.toLocaleString()}원**
                            </li>
                        </ul>
                    </div>
                    
                    <div className="mt-8 text-center">
                        <p className="text-lg font-semibold text-gray-700">
                            결제를 진행하고 서비스를 시작하려면
                        </p>
                        <Link 
                            to="/login"
                            className="inline-block mt-2 px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg"
                        >
                            서비스 이용 시작하기
                        </Link>
                        <p className="mt-2 text-sm text-gray-500">
                            (로그인/가입 후 결제 정보 입력 시 즉시 서비스 이용이 가능합니다.)
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Pricing;