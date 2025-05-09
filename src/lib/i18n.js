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
        required: '필수 항목입니다.',
        all: '전체'
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
        translator: '번역자',
        id: 'ID',
        category: '카테고리',
        originalText: '원문',
        translatedText: '번역문',
        notTranslatedYet: '아직 번역되지 않음',
        noTranslationsFound: '번역을 찾을 수 없습니다',
        tryDifferentFilters: '다른 필터를 시도해보세요',
        statuses: {
          pending: '대기 중',
          inProgress: '진행 중',
          reviewRequired: '검수 필요',
          completed: '완료',
          approved: '승인됨'
        },
        backToProjects: '프로젝트 목록으로 돌아가기',
        progressStatus: '진행 상황',
        completed: '완료됨',
        filters: '필터',
        mainCategory: '메인 카테고리',
        subCategory: '하위 카테고리',
        searchPlaceholder: '검색...',
        projects: '프로젝트',
        categories: '카테고리'
      },
      navigation: {
        home: '홈',
        translations: '번역',
        dashboard: '대시보드',
        profile: '프로필',
        settings: '설정',
        admin: '관리자',
        title: '페이지',
        projects: '프로젝트',
        searchPlaceholder: '검색...',
        projects: 'Projects',
        categories: 'Categories'
      },
      pagination: {
        showing: '전체',
        to: '-',
        of: '개 중',
        results: '번째 항목',
        previous: '이전',
        next: '다음',
        settings: 'Settings',
        admin: 'Admin',
        title: 'Pages',
        projects: 'Projects'
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
        required: 'This field is required.',
        all: 'All'
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
        translator: 'Translator',
        id: 'ID',
        category: 'Category',
        originalText: 'Original Text',
        translatedText: 'Translated Text',
        notTranslatedYet: 'Not translated yet',
        noTranslationsFound: 'No translations found',
        tryDifferentFilters: 'Try different filters',
        statuses: {
          pending: 'Pending',
          inProgress: 'In Progress',
          reviewRequired: 'Review Required',
          completed: 'Completed',
          approved: 'Approved'
        },
        backToProjects: 'Back to Projects',
        progressStatus: 'Progress Status',
        completed: 'Completed',
        filters: 'Filters',
        mainCategory: 'Main Category',
        subCategory: 'Sub Category',
        searchPlaceholder: 'Search...',
        projects: 'Projects',
        categories: 'Categories'
      },
      navigation: {
        home: 'Home',
        translations: 'Translations',
        dashboard: 'Dashboard',
        profile: 'Profile',
        settings: 'Settings',
        admin: 'Admin',
        title: 'Pages',
        projects: 'Projects',
        searchPlaceholder: 'Search...',
        projects: 'Projects',
        categories: 'Categories'
      },
      pagination: {
        showing: 'Showing',
        to: 'to',
        of: 'of',
        results: 'results',
        previous: 'Previous',
        next: 'Next',
        settings: 'Settings',
        admin: 'Admin',
        title: 'Pages',
        projects: 'Projects'
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