-- 사용자 테이블 (auth.users 확장)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'translator',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 번역 테이블
CREATE TABLE IF NOT EXISTS public.translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_text TEXT NOT NULL,
  translated_text TEXT,
  context TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  file_path TEXT,
  translator_id UUID REFERENCES public.users(id),
  reviewer_id UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 활동 로그 테이블
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 번역 테이블에 전체 텍스트 검색을 위한 인덱스
CREATE INDEX IF NOT EXISTS translations_text_idx 
ON public.translations USING GIN (
  to_tsvector('korean', original_text) || 
  to_tsvector('korean', translated_text)
);

-- RLS 정책: 사용자 테이블
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 모든 사용자는 자신의 정보를 볼 수 있음
CREATE POLICY "Users can view their own data" 
ON public.users FOR SELECT 
USING (auth.uid() = id);

-- 사용자는 자신의 정보만 수정할 수 있음
CREATE POLICY "Users can update their own data" 
ON public.users FOR UPDATE 
USING (auth.uid() = id);

-- 관리자는 모든 사용자 정보를 볼 수 있음
CREATE POLICY "Admins can view all users" 
ON public.users FOR SELECT 
USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);

-- RLS 정책: 번역 테이블
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

-- 모든 인증된 사용자는 번역을 볼 수 있음
CREATE POLICY "Authenticated users can view translations" 
ON public.translations FOR SELECT 
USING (auth.role() = 'authenticated');

-- 번역자는 자신에게 할당된 번역만 수정할 수 있음
CREATE POLICY "Translators can update their assigned translations" 
ON public.translations FOR UPDATE 
USING (
  translator_id = auth.uid() 
  AND status != 'approved'
);

-- 검수자는 검수 상태인 번역을 수정할 수 있음
CREATE POLICY "Reviewers can update translations for review" 
ON public.translations FOR UPDATE 
USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('reviewer', 'admin')
  AND status = 'reviewRequired'
);

-- 관리자는 모든 번역을 수정할 수 있음
CREATE POLICY "Admins can update all translations" 
ON public.translations FOR UPDATE 
USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);

-- Realtime 활성화
ALTER PUBLICATION supabase_realtime ADD TABLE public.translations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activities;

-- 트리거: 번역 업데이트 시 updated_at 갱신
CREATE OR REPLACE FUNCTION update_modified_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_translations_timestamp
BEFORE UPDATE ON public.translations
FOR EACH ROW
EXECUTE FUNCTION update_modified_timestamp(); 