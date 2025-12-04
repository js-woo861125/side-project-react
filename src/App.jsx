import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeroSection from './components/HeroSection'; 
import Login from './components/Login'; 
import InstructorDashboard from './pages/InstructorDashboard'; 
import { getToken } from './services/authService'; 
import StudentDashboard from './pages/StudentDashboard';
import Classes from './pages/Classes';
import Pricing from './pages/Pricing';
import LessonHistory from './pages/LessonHistory';
import Timetable from './pages/Timetable';
import ProgressReport from './pages/ProgressReport';
import StudentSettings from './pages/StudentSettings';
import InstructorSchedule from './pages/InstructorSchedule';
import InstructorMembers from './pages/InstructorMembers';
import InstructorProgress from './pages/InstructorProgress';
import InstructorSettings from './pages/InstructorSettings';
import AdminDashboard from './pages/AdminDashboard';
import AdminInstructors from './pages/AdminInstructors';
import AdminMembers from './pages/AdminMembers';
import AdminReport from './pages/AdminReport';
import AdminSettings from './pages/AdminSettings';
import InstructorMemberDetail from './pages/InstructorMemberDetail';



// 인증되지 않은 사용자 접근 방지 컴포넌트
const ProtectedRoute = ({ children }) => {
  const token = getToken(); 
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children; 
};

function App() {
  return (
    // 전역 스타일 및 모바일 잘림 방지 (App.jsx에서 관리)
    <div className="w-full min-h-screen overflow-x-hidden">
      <Router>
        <Routes>
          
          {/* 공개 라우트 */}
          <Route path="/" element={<HeroSection />} />          
          <Route path="/login" element={<Login />} />          
          <Route path="/pricing" element={<Pricing />} />

          {/* 강사 대시보드 _ 호된 라우트 - 로그인 필수 */}
          <Route path="/instructor/dashboard" 
            element={ <ProtectedRoute> <InstructorDashboard /> </ProtectedRoute> } />

          {/* 클래스 관리 */}
          <Route path="/instructor/classes" 
            element={ <ProtectedRoute> <Classes /> </ProtectedRoute> } />
        
          {/* 강사 전체 스케줄  */}
          <Route path="/instructor/schedule" 
            element={<InstructorSchedule />} />

          {/* 학생 대시보드 */}
          <Route path="/student/dashboard" 
            element={ <ProtectedRoute> <StudentDashboard /> </ProtectedRoute> } />

          {/* 수업/레슨 내역 */}
          <Route path="/student/lessons" element={ <ProtectedRoute>  <LessonHistory /> </ProtectedRoute> } />
          
          {/* 시간표 */}
          <Route path="/student/timetable" element={<Timetable />} />
          
          {/* 진행 상황*/}
          <Route path="/student/progress" element={<ProgressReport />} /> 
          
          {/* 정보 관리 라우트 컴포넌트 이름 변경 */}
          <Route path="/student/settings" element={<StudentSettings />} />

          {/* 강사 회원 관리*/}
          <Route path="/instructor/members" element={<InstructorMembers />} />
          
          {/* 회원 상세 페이지 (다음에 구현할 수 있도록 경로 예약) */}
          <Route path="/instructor/members/:id" element={<InstructorMemberDetail />} />

          {/* 강사 노트/평가 */}
          <Route path="/instructor/progress" element={<InstructorProgress />} />  

          {/* 강사 정보 관리 */}
          <Route path="/instructor/settings" element={<InstructorSettings />} />
          
          {/* 관리자 대시보드 */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* 관리자 직원관리 */}
          <Route path="/admin/instructors" element={<AdminInstructors />} />

          {/* 관리자 전체 회원 관리 */}
          <Route path="/admin/members" element={<AdminMembers />} />

          {/* 관리자 매출/정산 보고서 */}
          <Route path="/admin/report" element={<AdminReport />} /> 

          {/* 관리자 시스템 설정 */}
          <Route path="/admin/settings" element={<AdminSettings />} /> 
          
          {/* 404 페이지 */}
          <Route path="*" element={<h1>404: 페이지를 찾을 수 없습니다.</h1>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;