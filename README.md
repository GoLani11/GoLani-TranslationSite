# SPT 한글화 프로젝트 번역 사이트

React(Vite), Supabase, Netlify를 활용한 SPT 한글화 프로젝트 번역 작업 환경을 위한 웹 애플리케이션입니다.

## 기술 스택

- **프론트엔드**: React(Vite), TailwindCSS
- **백엔드**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **배포**: Netlify (정적 호스팅, 서버리스 함수, 도메인, CI/CD)
- **다국어 지원**: i18next

## 개발 환경 설정

1. 저장소 클론
   ```bash
   git clone https://github.com/your-username/GoLani-translationSite.git
   cd GoLani-translationSite
   ```

2. 의존성 설치
   ```bash
   npm install
   ```

3. 환경 변수 설정
   .env.example 파일을 .env로 복사하고 필요한 값을 설정합니다.
   ```bash
   cp .env.example .env
   ```

4. 개발 서버 실행
   ```bash
   npm run dev
   ```

5. 환경 변수 설정
   ```
   # Supabase 설정
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # 애플리케이션 설정
   VITE_APP_NAME=SPT 한글화 프로젝트
   VITE_DEFAULT_LANGUAGE=ko
   ```

## 주요 기능

- 번역 항목 관리 (CRUD)
- 실시간 번역 동기화
- 사용자 인증 및 권한 관리
- 번역 진행 상황 추적
- 다국어 지원

## 배포

Netlify를 통한 배포 방법:

1. Netlify 계정 로그인
2. "New site from Git" 선택
3. GitHub 저장소 연결
4. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 환경 변수 설정
6. 배포 버튼 클릭

## 기여 방법

1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경 사항 커밋 (`git commit -m 'Add some amazing feature'`)
4. 브랜치 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성
