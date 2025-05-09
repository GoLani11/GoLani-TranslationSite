import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 언어 리소스
const resources = {
  ko: {
    translation: {
      common: {
        loading: '로딩 중...',
        error: '오류가 발생했습니다.',
        save: '저장',
        cancel: '취소',
        edit: '수정',
        delete: '삭제',
        confirm: '확인',
        back: '뒤로',
        next: '다음',
        search: '검색',
        noResults: '결과가 없습니다.',
        required: '필수 항목입니다.'
      },
      auth: {
        login: '로그인',
        logout: '로그아웃',
        register: '회원가입',
        email: '이메일',
        password: '비밀번호',
        passwordConfirm: '비밀번호 확인',
        forgotPassword: '비밀번호를 잊으셨나요?',
        loginSuccess: '로그인 성공',
        loginError: '로그인 실패',
        logoutSuccess: '로그아웃 성공',
        registerSuccess: '회원가입 성공',
        registerError: '회원가입 실패'
      },
      translation: {
        title: '번역',
        original: '원문',
        translated: '번역',
        saveSuccess: '번역이 저장되었습니다.',
        saveError: '번역 저장 실패',
        addNew: '새 번역 추가',
        edit: '번역 수정',
        status: '상태',
        createdAt: '생성일',
        updatedAt: '수정일',
        progress: '진행 상황',
        filter: '필터',
        sort: '정렬',
        translatedBy: '번역자',
        reviewedBy: '검수자',
        statuses: {
          pending: '대기 중',
          inProgress: '진행 중',
          reviewRequired: '검수 필요',
          completed: '완료',
          approved: '승인됨'
        }
      },
      navigation: {
        home: '홈',
        translations: '번역',
        dashboard: '대시보드',
        profile: '프로필',
        settings: '설정',
        admin: '관리자'
      }
    }
  },
  en: {
    translation: {
      common: {
        loading: 'Loading...',
        error: 'An error has occurred.',
        save: 'Save',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        confirm: 'Confirm',
        back: 'Back',
        next: 'Next',
        search: 'Search',
        noResults: 'No results found.',
        required: 'This field is required.'
      },
      auth: {
        login: 'Login',
        logout: 'Logout',
        register: 'Register',
        email: 'Email',
        password: 'Password',
        passwordConfirm: 'Confirm Password',
        forgotPassword: 'Forgot Password?',
        loginSuccess: 'Login successful',
        loginError: 'Login failed',
        logoutSuccess: 'Logout successful',
        registerSuccess: 'Registration successful',
        registerError: 'Registration failed'
      },
      translation: {
        title: 'Translation',
        original: 'Original',
        translated: 'Translated',
        saveSuccess: 'Translation saved.',
        saveError: 'Failed to save translation',
        addNew: 'Add New Translation',
        edit: 'Edit Translation',
        status: 'Status',
        createdAt: 'Created At',
        updatedAt: 'Updated At',
        progress: 'Progress',
        filter: 'Filter',
        sort: 'Sort',
        translatedBy: 'Translated By',
        reviewedBy: 'Reviewed By',
        statuses: {
          pending: 'Pending',
          inProgress: 'In Progress',
          reviewRequired: 'Review Required',
          completed: 'Completed',
          approved: 'Approved'
        }
      },
      navigation: {
        home: 'Home',
        translations: 'Translations',
        dashboard: 'Dashboard',
        profile: 'Profile',
        settings: 'Settings',
        admin: 'Admin'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: import.meta.env.VITE_DEFAULT_LANGUAGE || 'ko',
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false // React에서는 이미 XSS 보호가 적용됨
    }
  });

export default i18n; 